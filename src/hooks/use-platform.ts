"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

export type Platform = "ios" | "android" | "selector";

/**
 * Hook mejorado para detectar la plataforma actual
 * Considera tanto el dominio como la ruta para mayor precisión
 */
export function usePlatform() {
  const pathname = usePathname();
  
  const platform = useMemo<Platform>(() => {
    if (typeof window === "undefined") return "ios"; // Default para SSR
    
    const hostname = window.location.hostname;
    const isLocal = hostname.includes("localhost") || hostname.includes("127.0.0.1");
    
    // En producción, detectar por dominio
    if (!isLocal) {
      if (hostname.includes("ios.")) return "ios";
      if (hostname.includes("android.")) return "android";
    }
    
    // En local o como fallback, detectar por ruta
    if (pathname?.startsWith("/android")) return "android";
    if (pathname?.startsWith("/ios")) return "ios";
    if (pathname === "/" || pathname === "") return "selector";
    
    // Default: si no está en /android y es una ruta de contenido, es iOS
    return "ios";
  }, [pathname]);
  
  const isAndroid = platform === "android";
  const isIos = platform === "ios";
  const isSelector = platform === "selector";
  
  return {
    platform,
    isAndroid,
    isIos,
    isSelector,
    pathname,
  };
}