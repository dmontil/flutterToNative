import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TEST_MODE_ENABLED =
  process.env.PREMIUM_TEST_MODE === "true" &&
  process.env.NODE_ENV !== "production" &&
  process.env.VERCEL_ENV !== "production";

function getEntitlementForProduct(productId: string | null) {
  if (productId === "android_playbook") return "android_premium";
  return "ios_premium";
}

export async function POST(req: Request) {
  if (!TEST_MODE_ENABLED) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey);
  const { data, error } = await supabaseAuth.auth.getUser(token);
  if (error || !data?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { productId } = await req.json().catch(() => ({ productId: null }));
  const entitlement = getEntitlementForProduct(productId);

  const supabaseAdmin = createClient(supabaseUrl, serviceKey);
  const { data: existingProfile, error: fetchError } = await supabaseAdmin
    .from("profiles")
    .select("entitlements")
    .eq("id", data.user.id)
    .single();

  if (fetchError) {
    return new NextResponse("Failed to fetch profile", { status: 500 });
  }

  const currentEntitlements = existingProfile?.entitlements || [];
  const newEntitlements = currentEntitlements.includes(entitlement)
    ? currentEntitlements
    : [...currentEntitlements, entitlement];

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ entitlements: newEntitlements })
    .eq("id", data.user.id);

  if (updateError) {
    return new NextResponse("Failed to update profile", { status: 500 });
  }

  return NextResponse.json({ ok: true, entitlements: newEntitlements });
}
