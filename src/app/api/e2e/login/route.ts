import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * E2E test helper — genera una sesión real de Supabase sin necesitar email.
 * Solo funciona cuando E2E_TEST_SECRET está configurado.
 * Nunca debe ser accesible en producción sin el secret.
 */
export async function POST(req: Request) {
  const secret = req.headers.get("x-e2e-secret");

  if (!process.env.E2E_TEST_SECRET || secret !== process.env.E2E_TEST_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { email, entitlements } = await req.json().catch(() => ({
    email: null,
    entitlements: [],
  }));

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Genera el OTP sin enviar email
  const { data: linkData, error: linkError } =
    await adminClient.auth.admin.generateLink({
      type: "magiclink",
      email,
    });

  if (linkError || !linkData?.properties?.hashed_token) {
    console.error("[E2E] generateLink error:", linkError?.message);
    return NextResponse.json(
      { error: linkError?.message || "Failed to generate link" },
      { status: 500 }
    );
  }

  // Intercambia el OTP por una sesión real
  const anonClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: verifyData, error: verifyError } =
    await anonClient.auth.verifyOtp({
      token_hash: linkData.properties.hashed_token,
      type: "magiclink",
    });

  if (verifyError || !verifyData.session) {
    console.error("[E2E] verifyOtp error:", verifyError?.message);
    return NextResponse.json(
      { error: verifyError?.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }

  const session = verifyData.session;

  // Si se piden entitlements, los persiste en el perfil
  if (Array.isArray(entitlements) && entitlements.length > 0) {
    await adminClient.from("profiles").upsert({
      id: session.user.id,
      entitlements,
      updated_at: new Date().toISOString(),
    });
  }

  // La clave de localStorage que usa el custom storage de supabase-client.ts
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const projectRef = supabaseUrl.match(/https?:\/\/([^.]+)\./)?.[1] ?? "local";
  const storageKey = `sb-${projectRef}-auth-token`;

  return NextResponse.json({ session, storageKey });
}
