# URGENT: Custom SMTP Setup for Production

## Problem
- Supabase default: 2 emails/hour = UNACCEPTABLE for production
- Users can't register/login
- Will lose customers

## Solution: Custom SMTP Setup

### Option 1: SendGrid (Recommended)
1. Sign up: https://sendgrid.com
2. Get API key
3. In Supabase Dashboard:
   - Project Settings > Auth > Email Templates 
   - Enable "Custom SMTP"
   - Add SendGrid settings:
     - Host: smtp.sendgrid.net
     - Port: 587
     - Username: apikey
     - Password: [your SendGrid API key]

### Option 2: AWS SES
1. AWS Console > SES
2. Verify domain/email
3. Get SMTP credentials
4. Configure in Supabase

### Benefits
- SendGrid: 100 emails/day FREE, then $14.95/month for 40k emails
- AWS SES: $0.10 per 1,000 emails
- Much higher rate limits
- Better deliverability

## Next Steps
1. Choose provider
2. Get credentials  
3. Configure in Supabase Dashboard
4. Test with production domain

**PRIORITY: Set this up BEFORE launch!**