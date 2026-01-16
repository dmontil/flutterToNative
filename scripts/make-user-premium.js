const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nmucsxqjmrxtaggxujqk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdWNzeHFqbXJ4dGFnZ3h1anFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODQ4MDk3NiwiZXhwIjoyMDg0MDU2OTc2fQ.W5xhQyBlJ4FbMGUGoqwD9Dxz0U74saRnBi0kKc4g-08';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function makeUserPremium(email) {
  console.log(`🔍 Buscando usuario: ${email}...\n`);

  // 1. Buscar el usuario por email en auth.users
  const { data: { users }, error: searchError } = await supabase.auth.admin.listUsers();

  if (searchError) {
    console.error('❌ Error buscando usuarios:', searchError.message);
    process.exit(1);
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    console.error(`❌ Usuario no encontrado: ${email}`);
    console.log('\n📋 Usuarios disponibles:');
    users.forEach(u => console.log(`   - ${u.email} (${u.id})`));
    process.exit(1);
  }

  console.log(`✅ Usuario encontrado: ${user.email}`);
  console.log(`   ID: ${user.id}\n`);

  // 2. Verificar si el perfil existe
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error('❌ Error consultando perfil:', profileError.message);
    process.exit(1);
  }

  if (!profile) {
    console.log('⚠️  Perfil no existe, creando...\n');

    const { error: createError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        entitlements: ['ios_premium']
      });

    if (createError) {
      console.error('❌ Error creando perfil:', createError.message);
      process.exit(1);
    }

    console.log('✅ Perfil creado con entitlements: ["ios_premium"]\n');
  } else {
    console.log('📊 Perfil existente:');
    console.log(`   Email: ${profile.email}`);
    console.log(`   Entitlements actuales: ${JSON.stringify(profile.entitlements || [])}\n`);

    // 3. Añadir ios_premium si no lo tiene
    const currentEntitlements = profile.entitlements || [];
    const newEntitlements = currentEntitlements.includes('ios_premium')
      ? currentEntitlements
      : [...currentEntitlements, 'ios_premium'];

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ entitlements: newEntitlements })
      .eq('id', user.id);

    if (updateError) {
      console.error('❌ Error actualizando perfil:', updateError.message);
      process.exit(1);
    }

    if (currentEntitlements.includes('ios_premium')) {
      console.log('ℹ️  El usuario ya tenía acceso premium');
    } else {
      console.log('✅ Entitlements actualizados a:', JSON.stringify(newEntitlements));
    }
  }

  // 4. Verificar el resultado final
  const { data: finalProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  console.log('\n' + '='.repeat(60));
  console.log('🎉 ¡USUARIO ACTUALIZADO A PREMIUM!');
  console.log('='.repeat(60));
  console.log(`\nEmail: ${finalProfile.email}`);
  console.log(`Entitlements: ${JSON.stringify(finalProfile.entitlements)}`);
  console.log(`\nEl usuario ${email} ahora tiene acceso premium completo.`);
  console.log('Puede cerrar sesión y volver a entrar para ver el cambio.\n');
}

// Obtener email del argumento o usar el del ejemplo
const email = process.argv[2] || 'contact@monti.dev';

makeUserPremium(email).catch(err => {
  console.error('❌ Error fatal:', err.message);
  process.exit(1);
});
