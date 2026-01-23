-- Migration: Add entitlements column and grant premium access
-- Execute these commands in order in your Supabase SQL Editor

-- Step 1: Add the entitlements column to the profiles table
ALTER TABLE public.profiles ADD COLUMN entitlements text[];

-- Step 2: Set default empty entitlements for existing users
UPDATE public.profiles SET entitlements = '{}' WHERE entitlements IS NULL;

-- Step 3: Grant premium access to contacto@monti.dev
UPDATE public.profiles 
SET entitlements = '{ios_premium}' 
WHERE email = 'contacto@monti.dev';

-- Step 4: Verify the update by querying the user's record
SELECT id, email, is_pro, entitlements 
FROM public.profiles 
WHERE email = 'contacto@monti.dev';

-- Optional: View all users with their entitlements
-- SELECT id, email, is_pro, entitlements FROM public.profiles ORDER BY email;