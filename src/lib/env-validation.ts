/**
 * Environment variable validation
 * Ensures all required environment variables are present
 */

export function validateEnvironmentVariables() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ] as const;

  const serverOnlyEnvVars = [
    'SUPABASE_SERVICE_ROLE_KEY'
  ] as const;

  // Check client-side variables (always available)
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  // Check server-side variables (only in server environment)
  if (typeof window === 'undefined') {
    for (const envVar of serverOnlyEnvVars) {
      if (!process.env[envVar]) {
        console.warn(`Missing server environment variable: ${envVar}`);
        console.warn(`This may cause server-side functionality to fail`);
      }
    }
  }
}

// Validate on module load in development
if (process.env.NODE_ENV === 'development') {
  try {
    validateEnvironmentVariables();
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
  }
}