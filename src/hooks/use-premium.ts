import { useUser } from "@/components/auth/user-provider";

/**
 * Hook reutilizable para verificar acceso premium
 * Centraliza la lógica de verificación de entitlements
 */
export function usePremium() {
  const { user, hasAccess } = useUser();

  const isPro = hasAccess('ios_premium');
  const isLoggedIn = !!user;

  return {
    isPro,
    isLoggedIn,
    user,
    hasAccess,
  };
}
