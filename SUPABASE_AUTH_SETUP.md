# Supabase Authentication Setup Guide

## Enable Email Authentication

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/nmucsxqjmrxtaggxujqk/auth/providers

2. **Enable Email Provider**:
   - Click on "Email" in the providers list
   - Toggle "Enable Email provider" to ON ✅
   - **Email OTP Expiration**: 3600 seconds (default)
   - Click "Save"

   **Nota**: Magic Links están incluidos automáticamente cuando el Email provider está habilitado.
   No hay toggle separado para Magic Link en la versión actual de Supabase.

3. **Configure Email Templates** (Optional but recommended):
   - Go to Auth → Email Templates
   - Customize the Magic Link email template
   - Add your branding

## Magic Link Flow

Users will receive an email with a link that logs them in automatically - no password needed!

### Benefits:
- ✅ No password to remember
- ✅ More secure (no password to steal)
- ✅ Better UX for technical audience
- ✅ Reduces friction in signup

## Email Settings (Production)

For production, you'll need to configure SMTP:
1. Go to Project Settings → Auth
2. Scroll to "SMTP Settings"
3. Add your email provider (SendGrid, Postmark, etc.)

For now, Supabase's built-in email works for testing.

## Current Status

- ✅ Project: `flutter-to-ios-playbook`
- ✅ Region: `eu-central-1`
- ✅ Status: `ACTIVE_HEALTHY`
- ⏳ Email Provider: Needs to be enabled in dashboard
- ⏳ Magic Link: Needs to be enabled in dashboard

**Action Required**: Go to the dashboard link above and enable Email + Magic Link.
