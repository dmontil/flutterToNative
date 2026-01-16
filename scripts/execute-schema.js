const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Read the schema SQL file
const schemaPath = path.join(__dirname, '../supabase/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

async function executeSchema() {
  console.log('🚀 Executing schema SQL...\n');

  // Split into individual statements
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    console.log(`\n📝 Executing statement ${i + 1}/${statements.length}:`);
    console.log(statement.substring(0, 100) + '...\n');

    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: statement
      });

      if (error) {
        console.error(`❌ Error: ${error.message}`);
        // Continue with next statement
      } else {
        console.log('✅ Success');
      }
    } catch (err) {
      console.error(`❌ Exception: ${err.message}`);
    }
  }

  console.log('\n🎉 Schema execution completed!');
  console.log('\n📊 Verifying tables...');

  // Verify tables were created
  const { data: tables, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(0);

  if (!error) {
    console.log('✅ profiles table exists');
  }

  process.exit(0);
}

executeSchema().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
