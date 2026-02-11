import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization helpers
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase credentials are not configured');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
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
    console.error('[WEBHOOK] Signature verification failed:', err);
    console.error('[WEBHOOK] Signature received:', signature);
    console.error('[WEBHOOK] Secret length:', webhookSecret.length);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail = session.customer_email || session.customer_details?.email;
      const metadata = session.metadata;
      const customerId = session.customer as string;

      if (!customerEmail) {
        console.error('[WEBHOOK] Missing customer email in session:', session.id);
        return NextResponse.json(
          { error: 'Missing customer email' },
          { status: 400 }
        );
      }

      // Determine which entitlements to grant based on metadata
      const productId = metadata?.productId || 'ios_playbook';
      let entitlementsToAdd: string[] = [];

      if (productId === 'android_playbook') {
        entitlementsToAdd = ['android_premium'];
      } else if (productId === 'bundle_playbook') {
        entitlementsToAdd = ['ios_premium', 'android_premium', 'bundle_premium'];
      } else {
        // Default to ios_playbook
        entitlementsToAdd = ['ios_premium'];
      }

      const { data: authUser, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('[WEBHOOK] Error fetching auth users');
        return NextResponse.json(
          { error: 'Failed to lookup user' },
          { status: 500 }
        );
      }

      const user = authUser.users.find(u => u.email === customerEmail);
      if (!user) {
        console.error('[WEBHOOK] No auth user found for session:', session.id);
        return NextResponse.json(
          { error: 'User not found' },
          { status: 400 }
        );
      }

      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('entitlements')
        .eq('id', user.id)
        .single();

      let currentEntitlements: string[] = [];

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              entitlements: [],
              stripe_customer_id: customerId,
            })
            .select('entitlements')
            .single();

          if (createError) {
            console.error('[WEBHOOK] Error creating profile');
            return NextResponse.json(
              { error: 'Failed to create user profile' },
              { status: 500 }
            );
          }
          currentEntitlements = newProfile?.entitlements || [];
        } else {
          console.error('[WEBHOOK] Database error fetching profile');
          return NextResponse.json(
            { error: 'Database error fetching user profile' },
            { status: 500 }
          );
        }
      } else {
        currentEntitlements = existingProfile?.entitlements || [];
      }

      // Add the new entitlements if they don't exist
      const newEntitlements = currentEntitlements.filter(
        (ent: string) => !entitlementsToAdd.includes(ent)
      );
      newEntitlements.push(...entitlementsToAdd);

      // Update the profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          entitlements: newEntitlements,
          stripe_customer_id: customerId,
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('[WEBHOOK] Error updating profile');
        return NextResponse.json(
          { error: 'Failed to update user profile' },
          { status: 500 }
        );
      }

      console.log(`[WEBHOOK] Granted ${entitlementsToAdd.join(', ')} to user ${user.id}`);
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
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
