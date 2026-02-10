import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getPriceId, ProductId, Currency } from "@/lib/products";

// Helper function to get Stripe instance
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY not configured");
    }
    // Clean the key by trimming any whitespace/newlines
    const cleanKey = process.env.STRIPE_SECRET_KEY.trim();
    return new Stripe(cleanKey);
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
        const stripe = getStripe();
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.replace("Bearer ", "");

        if (!token) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const requestBody = await req.json().catch(() => ({ 
            productId: "ios_playbook" as ProductId,
            currency: "USD" as Currency,
        }));

        const { productId, currency = "USD" } = requestBody;

        if (!["ios_playbook", "android_playbook", "bundle_playbook"].includes(productId)) {
            return new NextResponse("Invalid product ID", { status: 400 });
        }
        if (!["USD", "EUR"].includes(currency)) {
            return new NextResponse("Invalid currency", { status: 400 });
        }

        const stripePriceId = getPriceId(productId as ProductId, currency as Currency);

        if (!stripePriceId) {
            console.error(`[Checkout] Price ID not found for ${productId}/${currency}`);
            return new NextResponse("Price configuration error", { status: 500 });
        }

        // Use validated origin for redirects to avoid open-redirect issues
        const originHeader = normalizeOrigin(req.headers.get("origin"));
        const refererHeader = normalizeOrigin(req.headers.get("referer"));
        const envSite = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
        const envIos = normalizeOrigin(process.env.NEXT_PUBLIC_IOS_SITE_URL);
        const envAndroid = normalizeOrigin(process.env.NEXT_PUBLIC_ANDROID_SITE_URL);
        const allowedOrigins = new Set([envSite, envIos, envAndroid].filter(Boolean));
        const baseUrl =
            (originHeader && allowedOrigins.has(originHeader) ? originHeader : null) ||
            (refererHeader && allowedOrigins.has(refererHeader) ? refererHeader : null) ||
            envSite;

        if (!baseUrl) {
            return new NextResponse("Site URL not configured", { status: 500 });
        }

        // Determine success URL based on product
        let successUrl;
        if (productId === 'android_playbook') {
            successUrl = `${baseUrl}/android/components-ui?success=true`;
        } else if (productId === 'bundle_playbook') {
            successUrl = `${baseUrl}/components-ui?success=true`;
        } else {
            // ios_playbook
            successUrl = `${baseUrl}/components-ui?success=true`;
        }

        const sessionParams = {
            line_items: [{
                price: stripePriceId,
                quantity: 1,
            }],
            mode: "payment" as const,
            success_url: successUrl,
            cancel_url: `${baseUrl}/pricing?canceled=true`,
            metadata: {
                userId: user.id,
                productId: productId,
                currency: currency,
                domain: baseUrl,
            },
            customer_email: user.email,
        };

        let session;
        try {
            session = await stripe.checkout.sessions.create(sessionParams);
        } catch (stripeError: any) {
            console.error('[Checkout] Stripe error:', stripeError.code, stripeError.message);
            return new NextResponse(JSON.stringify({ error: 'Payment session creation failed' }), { 
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
