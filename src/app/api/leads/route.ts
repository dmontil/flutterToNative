import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usar service role key si necesitamos saltar RLS para escritura de sistema, 
// o anon key si confiamos en el RLS que ya configuramos.
// Por seguridad en Edge Functions o API routes, mejor usar variables de entorno.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, source, consent_given, target_product } = body;

        // 1. Basic Validation
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        if (!consent_given) {
            return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
        }

        // 2. Save to Supabase (Local SSoT)
        const { error: dbError } = await supabase
            .from('lead_captures')
            .upsert(
                [{
                    email,
                    source,
                    consent_given,
                    target_product: target_product || 'ios_playbook',
                    created_at: new Date().toISOString()
                }],
                { onConflict: 'email' }
            );

        if (dbError) throw dbError;

        if (process.env.LOOPS_API_KEY) {
            await fetch('https://loops.so/api/v1/contacts/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    source,
                    userGroup: 'FlutterToNative Leads',
                    targetProduct: target_product || 'ios_playbook'
                })
            });
        }

        return NextResponse.json({ success: true, message: 'Lead captured successfully' });

    } catch (error: any) {
        console.error('Lead API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
