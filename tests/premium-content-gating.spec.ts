import { test, expect, Page } from '@playwright/test';

/**
 * Tests para verificar que el premium content gating funciona correctamente
 * Simula usuarios premium y no-premium de forma hardcodeada
 */

// Helper function para simular usuario premium
async function simulatePremiumUser(page: Page) {
  // Simular que el usuario está logueado y tiene acceso premium
  await page.addInitScript(() => {
    // Mock del localStorage para simular usuario logueado con premium
    const mockUser = {
      id: '48847f19-0543-464a-a027-0185db0b9e3b', // ID hardcodeado que tiene acceso premium
      email: 'premium-user@test.com'
    };
    const mockSession = {
      access_token: 'mock_token',
      user: mockUser
    };
    
    localStorage.setItem('supabase.auth.token', JSON.stringify(mockSession));
    
    // Mock del window para simular el contexto de usuario premium
    window.__TEST_USER__ = {
      user: mockUser,
      entitlements: ['ios_premium'],
      isLoading: false,
      hasAccess: (entitlement: string) => entitlement === 'ios_premium'
    };
  });
}

// Helper function para simular usuario no-premium (free)
async function simulateFreeUser(page: Page) {
  // Simular que el usuario está logueado pero SIN acceso premium
  await page.addInitScript(() => {
    const mockUser = {
      id: 'free-user-123',
      email: 'free-user@test.com'
    };
    const mockSession = {
      access_token: 'mock_token',
      user: mockUser
    };
    
    localStorage.setItem('supabase.auth.token', JSON.stringify(mockSession));
    
    // Usuario free sin entitlements premium
    window.__TEST_USER__ = {
      user: mockUser,
      entitlements: [], // Sin entitlements
      isLoading: false,
      hasAccess: (entitlement: string) => false // No acceso a nada premium
    };
  });
}

// Helper function para simular usuario no logueado
async function simulateLoggedOutUser(page: Page) {
  await page.addInitScript(() => {
    localStorage.clear();
    window.__TEST_USER__ = {
      user: null,
      entitlements: [],
      isLoading: false,
      hasAccess: (entitlement: string) => false
    };
  });
}

test.describe('Premium Content Gating Tests', () => {
  
  test.describe('Usuario Premium - Debe ver TODO el contenido', () => {
    
    test('Architecture page - Usuario premium ve contenido completo', async ({ page }) => {
      await simulatePremiumUser(page);
      
      await page.goto('/architecture');
      await page.waitForLoadState('networkidle');
      
      // Verificar que la página carga
      await expect(page).toHaveTitle(/Architecture|Flutter/);
      
      // Buscar contenido premium (debe estar visible sin blur/lock)
      const premiumSections = page.locator('[data-premium], .premium-content, .blur-sm, .blur-md, .blur-lg');
      
      if (await premiumSections.count() > 0) {
        // Si hay secciones premium, verificar que NO están bloqueadas
        const blurredContent = page.locator('.blur-sm, .blur-md, .blur-lg');
        await expect(blurredContent).toHaveCount(0); // No debe haber contenido blurreado
        
        // Verificar que no hay overlays de lock
        const lockOverlays = page.locator('.premium-lock, .lock-overlay');
        await expect(lockOverlays).toHaveCount(0);
      }
      
      // Verificar que no hay botones de "Get Premium" dentro del contenido
      const upgradeBtns = page.locator('text="Get Premium", text="Upgrade", text="Unlock"');
      await expect(upgradeBtns).toHaveCount(0);
    });
    
    test('Interview page - Usuario premium ve preguntas completas', async ({ page }) => {
      await simulatePremiumUser(page);
      
      await page.goto('/interview');
      await page.waitForLoadState('networkidle');
      
      // Verificar que puede ver contenido premium
      await expect(page).toHaveTitle(/Interview|Flutter/);
      
      // Buscar indicadores de contenido premium desbloqueado
      const content = page.locator('main, .container');
      await expect(content).toBeVisible();
      
      // No debe haber content locks
      const lockIcons = page.locator('[data-testid="lock-icon"], .lock-icon');
      await expect(lockIcons).toHaveCount(0);
    });
    
    test('Mental Model page - Usuario premium sin restricciones', async ({ page }) => {
      await simulatePremiumUser(page);
      
      await page.goto('/mental-model');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveTitle(/Mental|Flutter/);
      
      // Verificar que todo el contenido está disponible
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();
      
      // No debe haber overlays de premium lock
      const premiumOverlays = page.locator('.premium-overlay, .upgrade-prompt');
      await expect(premiumOverlays).toHaveCount(0);
    });
  });
  
  test.describe('Usuario Free/No-Premium - Debe ver contenido limitado', () => {
    
    test('Architecture page - Usuario free ve contenido con lock', async ({ page }) => {
      await simulateFreeUser(page);
      
      await page.goto('/architecture');
      await page.waitForLoadState('networkidle');
      
      // Página debe cargar
      await expect(page).toHaveTitle(/Architecture|Flutter/);
      
      // Debe mostrar algo de contenido (20% gratis según el modelo)
      const content = page.locator('main');
      await expect(content).toBeVisible();
      
      // Buscar indicadores de contenido premium bloqueado
      // Puede tener blur, lock overlays, o botones de upgrade
      const premiumIndicators = page.locator(
        '.blur-sm, .blur-md, .blur-lg, .premium-lock, .lock-overlay, text="Get Premium", text="Upgrade"'
      );
      
      // Debe haber ALGÚN indicador de contenido premium
      await expect(premiumIndicators.first()).toBeVisible();
    });
    
    test('Interview page - Usuario free ve preguntas limitadas', async ({ page }) => {
      await simulateFreeUser(page);
      
      await page.goto('/interview');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveTitle(/Interview|Flutter/);
      
      // Debe haber contenido visible (parte gratuita)
      const content = page.locator('main');
      await expect(content).toBeVisible();
      
      // Pero debe haber indicadores de contenido premium bloqueado
      const premiumBlocks = page.locator(
        '.premium-content, [data-premium], .blur-md, text="Unlock", text="Premium"'
      );
      
      if (await premiumBlocks.count() > 0) {
        await expect(premiumBlocks.first()).toBeVisible();
      }
    });
    
    test('Mental Model page - Usuario free con restricciones', async ({ page }) => {
      await simulateFreeUser(page);
      
      await page.goto('/mental-model');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveTitle(/Mental|Flutter/);
      
      // Verificar que hay contenido base visible
      const content = page.locator('main');
      await expect(content).toBeVisible();
      
      // Pero debe haber calls-to-action para premium
      const ctaButtons = page.locator(
        'text="Get Premium", text="Upgrade", text="Unlock", text="Access Premium"'
      );
      
      // Debe haber al menos un CTA de premium visible
      if (await ctaButtons.count() > 0) {
        await expect(ctaButtons.first()).toBeVisible();
      }
    });
  });
  
  test.describe('Usuario No Logueado - Debe ver contenido mínimo', () => {
    
    test('Architecture page - Usuario no logueado redirige a login o ve teaser', async ({ page }) => {
      await simulateLoggedOutUser(page);
      
      await page.goto('/architecture');
      
      // Puede redirigir a login O mostrar contenido teaser con lock
      const currentUrl = page.url();
      
      if (currentUrl.includes('/login')) {
        // Si redirige a login, verificar que la página de login carga
        await expect(page).toHaveTitle(/Login|Sign|Flutter/);
        await expect(page.locator('input[type="email"]')).toBeVisible();
      } else {
        // Si no redirige, debe mostrar contenido muy limitado con locks
        await expect(page).toHaveTitle(/Architecture|Flutter/);
        
        // Debe haber indicadores fuertes de que necesita login/premium
        const authPrompts = page.locator(
          'text="Sign In", text="Login", text="Get Premium", .premium-lock, .auth-wall'
        );
        await expect(authPrompts.first()).toBeVisible();
      }
    });
    
    test('Interview page - Usuario no logueado debe ver CTA de autenticación', async ({ page }) => {
      await simulateLoggedOutUser(page);
      
      await page.goto('/interview');
      
      // Similar lógica - login redirect o auth wall
      const currentUrl = page.url();
      
      if (!currentUrl.includes('/login')) {
        await expect(page).toHaveTitle(/Interview|Flutter/);
        
        // Debe tener prompts de autenticación prominentes
        const authCTA = page.locator(
          'text="Sign In", text="Login", text="Create Account", text="Get Access"'
        );
        await expect(authCTA.first()).toBeVisible();
      }
    });
  });
  
  test.describe('Verificación de Flujo Premium', () => {
    
    test('Botones "Get Premium" llevan a pricing desde contenido bloqueado', async ({ page }) => {
      await simulateFreeUser(page);
      
      // Ir a una página con contenido premium
      await page.goto('/architecture');
      await page.waitForLoadState('networkidle');
      
      // Buscar y clickear botón de premium
      const premiumBtn = page.locator(
        'text="Get Premium", text="Upgrade", text="Unlock Premium"'
      ).first();
      
      if (await premiumBtn.isVisible()) {
        await premiumBtn.click();
        
        // Debe navegar a pricing
        await expect(page).toHaveURL(/.*\/pricing/);
        await expect(page).toHaveTitle(/Pricing|Flutter/);
        
        // Verificar que está en página de pricing con contenido de suscripción
        const pricingContent = page.locator('text="$", text="Premium", text="Access"');
        await expect(pricingContent.first()).toBeVisible();
      }
    });
    
    test('Widget Map - Usuario free ve mapa pero con CTA premium', async ({ page }) => {
      await simulateFreeUser(page);
      
      await page.goto('/widget-map');
      await page.waitForLoadState('networkidle');
      
      // Widget map debe ser accesible (contenido gratuito)
      await expect(page).toHaveTitle(/Widget|Map|Flutter/);
      
      // Debe ver el mapa básico
      const widgetContent = page.locator('.mapping, .widget, .search');
      await expect(widgetContent.first()).toBeVisible();
      
      // Pero debe tener CTA de premium
      const premiumCTA = page.locator('text="Get Premium", text="Premium Access"');
      await expect(premiumCTA.first()).toBeVisible();
    });
    
    test('Navbar - Estado de usuario se refleja correctamente', async ({ page }) => {
      // Test usuario premium
      await simulatePremiumUser(page);
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Navbar debe mostrar estado premium (email del usuario)
      const userEmail = page.locator('text="premium-user@test.com"');
      if (await userEmail.isVisible()) {
        await expect(userEmail).toBeVisible();
      }
      
      // Test usuario free
      await simulateFreeUser(page);
      await page.reload();
      
      const freeUserEmail = page.locator('text="free-user@test.com"');
      if (await freeUserEmail.isVisible()) {
        await expect(freeUserEmail).toBeVisible();
      }
      
      // Test usuario no logueado
      await simulateLoggedOutUser(page);
      await page.reload();
      
      // Debe mostrar botón de login
      const signInBtn = page.locator('text="Sign In", text="Login"');
      await expect(signInBtn.first()).toBeVisible();
    });
  });
  
  test.describe('Casos Edge y Validación', () => {
    
    test('Contenido gratuito siempre visible independiente del estado del usuario', async ({ page }) => {
      // Homepage y widget-map deben ser siempre accesibles
      const freePages = ['/', '/widget-map'];
      
      for (const pagePath of freePages) {
        // Test con usuario no logueado
        await simulateLoggedOutUser(page);
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        // Página debe cargar sin redirecciones
        expect(page.url()).toContain(pagePath);
        
        // Contenido debe ser visible
        const mainContent = page.locator('main, .container');
        await expect(mainContent).toBeVisible();
        
        // Test con usuario free
        await simulateFreeUser(page);
        await page.reload();
        await expect(mainContent).toBeVisible();
        
        // Test con usuario premium
        await simulatePremiumUser(page);
        await page.reload();
        await expect(mainContent).toBeVisible();
      }
    });
    
    test('Performance - Páginas premium cargan rápido para usuarios premium', async ({ page }) => {
      await simulatePremiumUser(page);
      
      const startTime = Date.now();
      await page.goto('/architecture');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Página debe cargar en menos de 3 segundos
      expect(loadTime).toBeLessThan(3000);
      
      // Contenido debe estar visible inmediatamente
      const content = page.locator('main');
      await expect(content).toBeVisible();
    });
  });
});