import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

export async function POST(req: Request) {
  if (isProd) {
    return new NextResponse("Not found", { status: 404 });
  }

  const secret = req.headers.get("x-e2e-secret");
  if (!process.env.E2E_TEST_SECRET || secret !== process.env.E2E_TEST_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { email, redirectTo } = await req.json().catch(() => ({}));
  if (!email || typeof email !== "string") {
    return new NextResponse("Email is required", { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new NextResponse("Supabase not configured", { status: 500 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002"}/auth/callback`,
    },
  });

  if (error || !data?.properties?.action_link) {
    console.error("[E2E_LOGIN] generateLink error", error);
    return new NextResponse("Failed to generate magic link", { status: 500 });
  }

  return NextResponse.json({
    actionLink: data.properties.action_link,
  });
}
