# Security Configuration

This document outlines the security configuration for the Flutter-to-iOS Playbook application.

## Environment Variables

### Required Variables

The application requires the following environment variables:

#### Client-side (Public)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

#### Server-side (Sensitive)
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (admin access)

### Local Development Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual Supabase credentials in `.env.local`

3. Never commit `.env.local` to version control

### Production Deployment (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable:
   - Environment: Production
   - Mark `SUPABASE_SERVICE_ROLE_KEY` as **Sensitive**

### Environment Validation

The application automatically validates environment variables on startup:
- ✅ Warns about missing variables in development
- ❌ Throws errors for critical missing variables
- 📝 Logs validation status to console

## Security Best Practices

### Secrets Management
- ✅ Use Vercel's encrypted environment variables for production
- ✅ Mark service role keys as sensitive
- ✅ Never commit secrets to git
- ✅ Use different keys for development and production

### Access Control
- ✅ Service role key only used server-side
- ✅ Anonymous key for client-side operations
- ✅ Row Level Security (RLS) enabled in Supabase
- ✅ JWT token validation for authenticated requests

### Data Protection
- ✅ HTTPS enforced via Vercel
- ✅ Security headers configured in `vercel.json`
- ✅ Webhook signature verification for Stripe
- ✅ Environment variable validation

## Troubleshooting

### Common Issues

1. **"Missing required environment variable" error**
   - Check that all variables are set in Vercel
   - Verify variable names match exactly
   - Redeploy after adding variables

2. **Authentication not working**
   - Verify Supabase URL and keys are correct
   - Check that RLS policies are properly configured
   - Ensure service role key is marked as sensitive

3. **Payment webhooks failing**
   - Verify Stripe webhook secret is set
   - Check webhook signature validation
   - Review Vercel function logs

### Support

If you encounter security issues:
1. Check the environment validation logs
2. Verify all variables are set correctly in Vercel
3. Review the security headers in `vercel.json`
4. Test with a clean deployment