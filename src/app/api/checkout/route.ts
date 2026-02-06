import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getPriceId, ProductId, Currency } from "@/lib/products";

// Helper function to get Stripe instance
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-06-20",
    });
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

        const { productId, currency = "USD" } = await req.json().catch(() => ({ 
            productId: "ios_playbook" as ProductId,
            currency: "USD" as Currency,
        }));

        // Validate productId
        if (!["ios_playbook", "android_playbook", "bundle_playbook"].includes(productId)) {
            return new NextResponse("Invalid product ID", { status: 400 });
        }
        // Validate currency
        if (!["USD", "EUR"].includes(currency)) {
            return new NextResponse("Invalid currency", { status: 400 });
        }

        // Get the appropriate price ID for the product and currency
        const stripePriceId = getPriceId(productId as ProductId, currency as Currency);

        if (!stripePriceId) {
            console.error(`Price ID not found for product: ${productId}, currency: ${currency}`);
            return new NextResponse("Price configuration error", { status: 500 });
        }

        // Use validated origin for redirects to avoid open-redirect issues
        const origin = req.headers.get("origin");
        const allowedOrigins = new Set(
            [
                process.env.NEXT_PUBLIC_SITE_URL,
                process.env.NEXT_PUBLIC_IOS_SITE_URL,
                process.env.NEXT_PUBLIC_ANDROID_SITE_URL,
            ].filter(Boolean)
        );
        const baseUrl = origin && allowedOrigins.has(origin)
            ? origin
            : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fluttertonative.pro";

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: stripePriceId,
                quantity: 1,
            }],
            mode: "payment",
            success_url: `${baseUrl}/pricing?success=true`,
            cancel_url: `${baseUrl}/pricing?canceled=true`,
            metadata: {
                userId: user.id,
                productId: productId,
                currency: currency,
                domain: baseUrl, // Store the domain for later reference
            },
            customer_email: user.email,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
