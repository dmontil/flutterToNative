-- Fix premium access for the correct email: contact@monti.dev
-- The user logs in as contact@monti.dev but the database has entitlements for contacto@monti.dev

-- Step 1: Check current auth users
SELECT id, email, created_at 
FROM auth.users 
WHERE email LIKE '%monti.dev%'
ORDER BY email;

-- Step 2: Check current profiles
SELECT id, email, entitlements 
FROM public.profiles 
WHERE email LIKE '%monti.dev%'
ORDER BY email;

-- Step 3: Create or update profile for contact@monti.dev (the correct email)
INSERT INTO public.profiles (id, email, entitlements) 
SELECT 
    (SELECT id FROM auth.users WHERE email = 'contact@monti.dev'), 
    'contact@monti.dev', 
    '{ios_premium}'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    entitlements = EXCLUDED.entitlements;

-- Step 4: Verify the correct user now has premium access
SELECT id, email, entitlements 
FROM public.profiles 
WHERE email = 'contact@monti.dev';

-- Step 5: Optional cleanup - remove the old incorrect profile if it exists
-- DELETE FROM public.profiles WHERE email = 'contacto@monti.dev';