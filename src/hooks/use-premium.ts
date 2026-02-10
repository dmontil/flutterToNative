import { useUser } from "@/components/auth/user-provider";
import { usePathname } from "next/navigation";

/**
 * Hook reutilizable para verificar acceso premium
 * Centraliza la lógica de verificación de entitlements
 */
export function usePremium() {
  const { user, hasAccess } = useUser();
  const pathname = usePathname();
  
  // Determine which platform we're on
  const isAndroidPath = pathname?.startsWith('/android');
  
  // Check appropriate entitlements
  const hasIosPremium = hasAccess('ios_premium');
  const hasAndroidPremium = hasAccess('android_premium');  
  const hasBundlePremium = hasAccess('bundle_premium');
  
  // Bundle premium gives access to everything
  // Platform-specific premium gives access to that platform only
  let isPro = false;
  
  if (hasBundlePremium) {
    // Bundle gives access to everything
    isPro = true;
  } else if (isAndroidPath) {
    // On Android path, need Android premium
    isPro = hasAndroidPremium;
  } else {
    // On iOS path (default), need iOS premium  
    isPro = hasIosPremium;
  }
  
  const isLoggedIn = !!user;

  return {
    isPro,
    isLoggedIn,
    user,
    hasAccess,
    hasIosPremium,
    hasAndroidPremium,
    hasBundlePremium,
    isAndroidPath,
  };
}
