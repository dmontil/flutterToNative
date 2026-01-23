#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function main() {
  // Create Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase configuration. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
    process.exit(1);
  }

  console.log('🔧 Supabase Configuration:');
  console.log('  - URL:', supabaseUrl);
  console.log('  - Anon Key:', supabaseAnonKey ? 'Set (' + supabaseAnonKey.substring(0, 20) + '...)' : 'Missing');
  console.log('  - Service Role Key:', supabaseServiceKey ? 'Set (' + supabaseServiceKey.substring(0, 20) + '...)' : 'Missing');
  
  if (!supabaseServiceKey) {
    console.log('\n⚠️  WARNING: SUPABASE_SERVICE_ROLE_KEY is not set.');
    console.log('   This script needs admin privileges to bypass RLS policies.');
    console.log('   Using anon key which is limited by Row Level Security.');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

  const userEmail = 'contacto@monti.dev';

  // First, let's check if we can connect and see what users exist
  console.log('🔍 Checking database connection and existing users...');
  
  const { data: allUsers, error: allUsersError } = await supabase
    .from('profiles')
    .select('id, email, entitlements')
    .limit(10);

  if (allUsersError) {
    console.error('❌ Error connecting to database:', allUsersError.message);
    return;
  }

  console.log('📊 Found', allUsers?.length || 0, 'users in profiles table:');
  if (allUsers && allUsers.length > 0) {
    allUsers.forEach(user => {
      console.log(`  - ${user.email} (entitlements: ${user.entitlements || 'none'})`);
    });
  } else {
    console.log('  - No users found in profiles table');
  }

  console.log('\n🔍 Step 1: Checking current entitlements for', userEmail);
  
  // Step 1: Check current entitlements
  const { data: currentUser, error: selectError } = await supabase
    .from('profiles')
    .select('id, email, entitlements')
    .eq('email', userEmail)
    .maybeSingle();

  if (selectError) {
    console.error('❌ Error fetching user:', selectError.message);
    return;
  }

  if (!currentUser) {
    console.log('❌ User not found with email:', userEmail);
    console.log('🔧 Creating new profile with ios_premium entitlement...');
    
    // Generate a UUID for the user (in a real scenario, this would come from auth.users)
    const { randomUUID } = require('crypto');
    const userId = randomUUID();
    
    const { data: newUser, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: userEmail,
        entitlements: ['ios_premium']
      })
      .select('id, email, entitlements')
      .single();

    if (createError) {
      console.error('❌ Error creating user profile:', createError.message);
      return;
    }

    console.log('✅ Successfully created new user profile with ios_premium entitlement');
    console.log('📊 New user data:', newUser);
    
    // Skip to final verification
    console.log('\n🔍 Final verification...');
    console.log('✅ Final user state:');
    console.log('  - ID:', newUser.id);
    console.log('  - Email:', newUser.email);
    console.log('  - Entitlements:', newUser.entitlements || 'none');
    console.log('  - Has ios_premium:', newUser.entitlements?.includes('ios_premium') ? 'YES' : 'NO');
    return;
  }

  console.log('📊 Current user data:', currentUser);
  console.log('📊 Current entitlements:', currentUser.entitlements || 'none');

  // Step 2: Check if user already has ios_premium entitlement
  const hasIosPremium = currentUser.entitlements && currentUser.entitlements.includes('ios_premium');
  
  if (hasIosPremium) {
    console.log('✅ User already has ios_premium entitlement');
  } else {
    console.log('🔧 Step 2: Granting ios_premium entitlement to user...');
    
    // Update entitlements to include ios_premium
    const { data: updatedUser, error: updateError } = await supabase
      .from('profiles')
      .update({ entitlements: ['ios_premium'] })
      .eq('email', userEmail)
      .select('id, email, entitlements')
      .maybeSingle();

    if (updateError) {
      console.error('❌ Error updating user entitlements:', updateError.message);
      return;
    }

    console.log('✅ Successfully updated user entitlements');
    console.log('📊 Updated user data:', updatedUser);
  }

  // Step 3: Verify the final state
  console.log('\n🔍 Step 3: Final verification...');
  
  const { data: finalUser, error: finalError } = await supabase
    .from('profiles')
    .select('id, email, entitlements')
    .eq('email', userEmail)
    .maybeSingle();

  if (finalError) {
    console.error('❌ Error in final verification:', finalError.message);
    return;
  }

  console.log('✅ Final user state:');
  console.log('  - ID:', finalUser.id);
  console.log('  - Email:', finalUser.email);
  console.log('  - Entitlements:', finalUser.entitlements || 'none');
  console.log('  - Has ios_premium:', finalUser.entitlements?.includes('ios_premium') ? 'YES' : 'NO');
}

main().catch(console.error);