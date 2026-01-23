-- Fix user profile and premium access for contacto@monti.dev
-- Execute these SQL commands in order in your Supabase SQL Editor

-- Step 1: Check if the user profile exists
SELECT id, email, entitlements 
FROM public.profiles 
WHERE email = 'contacto@monti.dev';

-- Step 2: If the profile doesn't exist, create it with premium access
-- (Only runs if the profile doesn't exist)
INSERT INTO public.profiles (id, email, entitlements) 
SELECT 
    (SELECT id FROM auth.users WHERE email = 'contacto@monti.dev'), 
    'contacto@monti.dev', 
    '{ios_premium}'
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE email = 'contacto@monti.dev'
);

-- Step 3: If the profile exists but doesn't have premium access, update it
-- (Updates entitlements to include ios_premium)
UPDATE public.profiles 
SET entitlements = '{ios_premium}' 
WHERE email = 'contacto@monti.dev';

-- Step 4: Update the trigger function to include entitlements for future users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, entitlements)
  VALUES (new.id, new.email, '{}');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Verify the user has premium access
SELECT id, email, entitlements 
FROM public.profiles 
WHERE email = 'contacto@monti.dev';

-- Additional verification: Check if user exists in auth.users table
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'contacto@monti.dev';

-- Optional: View all users with their entitlements for debugging
-- SELECT id, email, entitlements FROM public.profiles ORDER BY email;