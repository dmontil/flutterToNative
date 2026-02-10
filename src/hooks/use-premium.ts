"use client";

import { useUser } from "@/components/auth/user-provider";
import { usePlatform } from "@/hooks/use-platform";

/**
 * Hook reutilizable para verificar acceso premium
 * Centraliza la lógica de verificación de entitlements
 */
export function usePremium() {
  const { user, hasAccess } = useUser();
  const { platform, isAndroid, isIos } = usePlatform();
  
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
  } else if (isAndroid) {
    // On Android, need Android premium
    isPro = hasAndroidPremium;
  } else if (isIos) {
    // On iOS, need iOS premium  
    isPro = hasIosPremium;
  }
  
  const isLoggedIn = !!user;
  
  // Check if user should see upgrade prompt
  const shouldShowUpgrade = isLoggedIn && !isPro;
  
  // Check if user can upgrade (has one platform but not the other)
  const canUpgradeToBundle = hasIosPremium || hasAndroidPremium;
  
  return {
    isPro,
    isLoggedIn,
    user,
    hasAccess,
    hasIosPremium,
    hasAndroidPremium,
    hasBundlePremium,
    platform,
    isAndroid,
    isIos,
    shouldShowUpgrade,
    canUpgradeToBundle,
  };
}
