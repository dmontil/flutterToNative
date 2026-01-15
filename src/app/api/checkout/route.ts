import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
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

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Flutter to iOS Playbook (Complete)",
                        description: "Lifetime access to all chapters, interview questions, and source code.",
                    },
                    unit_amount: 4900, // $49.00
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/interview?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
            metadata: {
                userId: user.id,
            },
            customer_email: user.email,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
