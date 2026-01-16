"use client";

import { ReactNode } from "react";
import { PremiumLock } from "@/components/ui/premium-lock";
import { usePremium } from "@/hooks/use-premium";

interface PremiumContentProps {
  children: ReactNode;
  /**
   * Si es true, el contenido siempre se muestra sin lock
   * Útil para override temporal o contenido free
   */
  isFree?: boolean;
  /**
   * Cantidad de blur cuando está locked
   */
  blurAmount?: "sm" | "md" | "lg";
}

/**
 * Componente reutilizable para envolver contenido premium
 * Automáticamente verifica el acceso del usuario y muestra lock si es necesario
 *
 * @example
 * <PremiumContent>
 *   <CodeComparison ... />
 * </PremiumContent>
 *
 * @example
 * // Contenido siempre gratuito
 * <PremiumContent isFree>
 *   <IntroSection />
 * </PremiumContent>
 */
export function PremiumContent({
  children,
  isFree = false,
  blurAmount = "md",
}: PremiumContentProps) {
  const { isPro } = usePremium();

  // Si es contenido gratuito, mostrarlo siempre
  if (isFree) {
    return <>{children}</>;
  }

  // Mostrar con lock si el usuario no es pro
  return (
    <PremiumLock isUnlocked={isPro} blurAmount={blurAmount}>
      {children}
    </PremiumLock>
  );
}
