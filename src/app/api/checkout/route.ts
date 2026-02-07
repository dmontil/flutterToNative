import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getPriceId, ProductId, Currency } from "@/lib/products";

// Helper function to get Stripe instance
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY not configured");
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function normalizeOrigin(value?: string | null): string | null {
    if (!value) return null;
    try {
        const trimmed = value.trim();
        const url = new URL(trimmed);
        return url.origin;
    } catch {
        return null;
    }
}

export async function POST(req: Request) {
    try {
        console.log('[Checkout API] Starting checkout request');
        
        const stripe = getStripe();
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");

        console.log('[Checkout API] Auth header present:', !!authHeader);

        if (!token) {
            console.log('[Checkout API] No token provided');
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.log('[Checkout API] User auth failed:', error?.message);
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log('[Checkout API] User authenticated:', user.email);

        const requestBody = await req.json().catch(() => ({ 
            productId: "ios_playbook" as ProductId,
            currency: "USD" as Currency,
        }));

        const { productId, currency = "USD" } = requestBody;
        console.log('[Checkout API] Request body:', { productId, currency });

        // Validate productId
        if (!["ios_playbook", "android_playbook", "bundle_playbook"].includes(productId)) {
            console.log('[Checkout API] Invalid product ID:', productId);
            return new NextResponse("Invalid product ID", { status: 400 });
        }
        // Validate currency
        if (!["USD", "EUR"].includes(currency)) {
            console.log('[Checkout API] Invalid currency:', currency);
            return new NextResponse("Invalid currency", { status: 400 });
        }

        // Debug environment variables
        console.log('[Checkout API] Environment check:', {
            hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
            hasIosUsd: !!process.env.STRIPE_PRICE_ID_IOS_USD,
            hasIosEur: !!process.env.STRIPE_PRICE_ID_IOS_EUR,
            hasAndroidUsd: !!process.env.STRIPE_PRICE_ID_ANDROID_USD,
            hasAndroidEur: !!process.env.STRIPE_PRICE_ID_ANDROID_EUR,
            hasBundleUsd: !!process.env.STRIPE_PRICE_ID_BUNDLE_USD,
            hasBundleEur: !!process.env.STRIPE_PRICE_ID_BUNDLE_EUR,
        });

        // Get the appropriate price ID for the product and currency
        const stripePriceId = getPriceId(productId as ProductId, currency as Currency);
        console.log('[Checkout API] Price ID for', productId, currency, ':', stripePriceId);

        if (!stripePriceId) {
            console.error(`[Checkout API] Price ID not found for product: ${productId}, currency: ${currency}`);
            console.error('[Checkout API] Available env vars:', Object.keys(process.env).filter(k => k.includes('STRIPE')));
            return new NextResponse("Price configuration error", { status: 500 });
        }

        // Use validated origin for redirects to avoid open-redirect issues
        const originHeader = normalizeOrigin(req.headers.get("origin"));
        const refererHeader = normalizeOrigin(req.headers.get("referer"));
        const envSite = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
        const envIos = normalizeOrigin(process.env.NEXT_PUBLIC_IOS_SITE_URL);
        const envAndroid = normalizeOrigin(process.env.NEXT_PUBLIC_ANDROID_SITE_URL);
        const envE2E = normalizeOrigin(process.env.E2E_BASE_URL);

        const allowedOrigins = new Set([envSite, envIos, envAndroid, envE2E].filter(Boolean));
        const baseUrl =
            (originHeader && allowedOrigins.has(originHeader) ? originHeader : null) ||
            (refererHeader && allowedOrigins.has(refererHeader) ? refererHeader : null) ||
            envSite ||
            envE2E ||
            "http://localhost:3002";

        console.log('[Checkout API] Using baseUrl:', baseUrl);
        console.log('[Checkout API] Creating Stripe session with price:', stripePriceId);

        const sessionParams = {
            line_items: [{
                price: stripePriceId,
                quantity: 1,
            }],
            mode: "payment" as const,
            success_url: `${baseUrl}/pricing?success=true`,
            cancel_url: `${baseUrl}/pricing?canceled=true`,
            metadata: {
                userId: user.id,
                productId: productId,
                currency: currency,
                domain: baseUrl,
            },
            customer_email: user.email,
        };

        console.log('[Checkout API] Session params:', JSON.stringify(sessionParams, null, 2));

        let session;
        try {
            console.log('[Checkout API] Calling stripe.checkout.sessions.create...');
            session = await stripe.checkout.sessions.create(sessionParams);
            console.log('[Checkout API] Stripe session created successfully:', session.id, 'URL:', session.url);
        } catch (stripeError: any) {
            console.error('[Checkout API] Stripe session creation failed:', stripeError);
            console.error('[Checkout API] Stripe error details:', {
                type: stripeError.type,
                code: stripeError.code,
                message: stripeError.message,
                param: stripeError.param,
                statusCode: stripeError.statusCode
            });
            return new NextResponse(JSON.stringify({ error: 'Stripe session creation failed', details: stripeError.message }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("[STRIPE_ERROR]", error);
        const message = error?.message || "Internal Error";
        if (process.env.NODE_ENV !== "production") {
            return new NextResponse(message, { status: 500 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}
