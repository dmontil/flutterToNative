import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization helpers
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-12-15.clover',
  });
}

function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase credentials are not configured');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabase = getSupabase();

  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get the customer email and metadata
      const customerEmail = session.customer_email || session.customer_details?.email;
      const metadata = session.metadata;
      const customerId = session.customer as string;

      if (!customerEmail || !metadata?.userId) {
        console.error('Missing email or userId in session:', session.id);
        return NextResponse.json(
          { error: 'Missing required data' },
          { status: 400 }
        );
      }

      // Determine which entitlement to grant based on the price_id
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;

      let entitlement = 'ios_premium'; // Default

      if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANDROID) {
        entitlement = 'android_premium';
      }

      // Update user profile with entitlement
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('entitlements')
        .eq('id', metadata.userId)
        .single();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        return NextResponse.json(
          { error: 'Failed to fetch user profile' },
          { status: 500 }
        );
      }

      // Add the new entitlement if it doesn't exist
      const currentEntitlements = existingProfile?.entitlements || [];
      const newEntitlements = currentEntitlements.includes(entitlement)
        ? currentEntitlements
        : [...currentEntitlements, entitlement];

      // Update the profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          entitlements: newEntitlements,
          stripe_customer_id: customerId,
        })
        .eq('id', metadata.userId);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return NextResponse.json(
          { error: 'Failed to update user profile' },
          { status: 500 }
        );
      }

      console.log(`✅ Granted ${entitlement} to user ${metadata.userId}`);
      break;
    }

    case 'customer.subscription.deleted': {
      // Handle subscription cancellation if you add subscriptions later
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Find user by stripe_customer_id
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('id, entitlements')
        .eq('stripe_customer_id', customerId)
        .single();

      if (fetchError || !profile) {
        console.error('Error finding profile for customer:', customerId);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Remove all entitlements (or specific ones based on metadata)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ entitlements: [] })
        .eq('id', profile.id);

      if (updateError) {
        console.error('Error removing entitlements:', updateError);
      } else {
        console.log(`❌ Removed entitlements from user ${profile.id}`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
