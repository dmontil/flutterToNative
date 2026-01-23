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

  console.log('🔧 Fixing entitlements for contact@monti.dev (the correct email)');
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

  const correctEmail = 'contacto@monti.dev'; // This is the email the user actually logs in with
  const incorrectEmail = 'contact@monti.dev'; // This was the previous email

  // First, let's check what users exist for both emails
  console.log('🔍 Checking for both email variants...');
  
  const { data: allUsers, error: allUsersError } = await supabase
    .from('profiles')
    .select('id, email, entitlements')
    .or(`email.eq.${correctEmail},email.eq.${incorrectEmail}`);

  if (allUsersError) {
    console.error('❌ Error connecting to database:', allUsersError.message);
    return;
  }

  console.log('📊 Found users:');
  if (allUsers && allUsers.length > 0) {
    allUsers.forEach(user => {
      console.log(`  - ${user.email} (entitlements: ${JSON.stringify(user.entitlements) || 'none'})`);
    });
  } else {
    console.log('  - No users found for either email');
  }

  // Check if we need to get the user ID from auth.users table
  console.log('\n🔍 Checking auth.users table for actual user...');
  
  try {
    const { data: authUsers, error: authError } = await supabase
      .from('auth.users')
      .select('id, email')
      .eq('email', correctEmail);
      
    if (authError) {
      console.log('⚠️ Could not query auth.users (expected with anon key):', authError.message);
    } else if (authUsers && authUsers.length > 0) {
      console.log('✅ Found user in auth.users:', authUsers[0]);
    }
  } catch (e) {
    console.log('⚠️ Could not query auth.users (expected with anon key)');
  }

  console.log(`\n🔧 Setting up profile for ${correctEmail}...`);
  
  // Check if correct email profile exists
  const { data: correctUser, error: correctSelectError } = await supabase
    .from('profiles')
    .select('id, email, entitlements')
    .eq('email', correctEmail)
    .maybeSingle();

  if (correctSelectError) {
    console.error('❌ Error fetching user:', correctSelectError.message);
    return;
  }

  if (!correctUser) {
    console.log(`❌ User not found with email: ${correctEmail}`);
    
    // Try to get the user ID from the incorrect email profile
    const { data: incorrectUser } = await supabase
      .from('profiles')
      .select('id, email, entitlements')
      .eq('email', incorrectEmail)
      .maybeSingle();
    
    if (incorrectUser) {
      console.log(`🔧 Found profile with incorrect email: ${incorrectEmail}`);
      console.log('🔧 Updating email to the correct one...');
      
      // Update the existing profile with the correct email
      const { data: updatedUser, error: updateError } = await supabase
        .from('profiles')
        .update({ 
          email: correctEmail,
          entitlements: ['ios_premium']
        })
        .eq('email', incorrectEmail)
        .select('id, email, entitlements')
        .single();

      if (updateError) {
        console.error('❌ Error updating profile email:', updateError.message);
        return;
      }

      console.log('✅ Successfully updated profile email and ensured ios_premium entitlement');
      console.log('📊 Updated user data:', updatedUser);
    } else {
      console.log('🔧 Creating new profile with ios_premium entitlement...');
      
      // We'll need to use the user ID from logs or create a temporary one
      // In production, this should be the actual user ID from auth.users
      const userIdFromLogs = '48847f19-0543-464a-a027-0185db0b9e3b'; // From the new logs
      
      const { data: newUser, error: createError } = await supabase
        .from('profiles')
        .upsert({
          id: userIdFromLogs,
          email: correctEmail,
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
    }
  } else {
    console.log('📊 Current user data:', correctUser);
    
    // Update to ensure ios_premium entitlement
    const hasIosPremium = correctUser.entitlements && correctUser.entitlements.includes('ios_premium');
    
    if (hasIosPremium) {
      console.log('✅ User already has ios_premium entitlement');
    } else {
      console.log('🔧 Granting ios_premium entitlement to user...');
      
      const { data: updatedUser, error: updateError } = await supabase
        .from('profiles')
        .update({ entitlements: ['ios_premium'] })
        .eq('email', correctEmail)
        .select('id, email, entitlements')
        .single();

      if (updateError) {
        console.error('❌ Error updating user entitlements:', updateError.message);
        return;
      }

      console.log('✅ Successfully updated user entitlements');
      console.log('📊 Updated user data:', updatedUser);
    }
  }

  // Final verification
  console.log('\n🔍 Final verification...');
  
  const { data: finalUser, error: finalError } = await supabase
    .from('profiles')
    .select('id, email, entitlements')
    .eq('email', correctEmail)
    .maybeSingle();

  if (finalError) {
    console.error('❌ Error in final verification:', finalError.message);
    return;
  }

  if (finalUser) {
    console.log('✅ Final user state:');
    console.log('  - ID:', finalUser.id);
    console.log('  - Email:', finalUser.email);
    console.log('  - Entitlements:', JSON.stringify(finalUser.entitlements) || 'none');
    console.log('  - Has ios_premium:', finalUser.entitlements?.includes('ios_premium') ? 'YES' : 'NO');
  } else {
    console.log('❌ User still not found after operations');
  }
}

main().catch(console.error);