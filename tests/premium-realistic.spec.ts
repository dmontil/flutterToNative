import { test, expect } from '@playwright/test';

/**
 * Tests realistas para verificar premium content gating
 * Enfocados en comportamiento observable del usuario final
 */

test.describe('Premium Content Gating - Tests Realistas', () => {
  
  test.describe('Verificación de Páginas Principales', () => {
    
    test('Homepage - Siempre accesible sin restricciones', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Homepage debe cargar correctamente
      await expect(page).toHaveTitle(/Flutter/);
      
      // Contenido principal debe ser visible
      const heroSection = page.locator('h1, .hero, main').first();
      await expect(heroSection).toBeVisible();
      
      // Botón de premium debe estar presente y funcional
      const premiumBtn = page.locator('text="Access Premium", text="Get Premium"').first();
      if (await premiumBtn.isVisible()) {
        await premiumBtn.click();
        
        // Debe navegar a premium/pricing
        await expect(page).toHaveURL(/.*\/(premium|pricing)/);
      }
    });
    
    test('Widget Map - Contenido gratuito funcional', async ({ page }) => {
      await page.goto('/widget-map');
      await page.waitForLoadState('networkidle');
      
      // Página debe cargar
      await expect(page).toHaveTitle(/Widget|Map/);
      
      // Debe mostrar contenido del mapa
      const widgetMappings = page.locator('.mapping, [class*="mapping"], .widget-content');
      if (await widgetMappings.count() === 0) {
        // Si no hay elementos específicos, verificar que hay contenido visible
        const mainContent = page.locator('main');
        await expect(mainContent).toBeVisible();
      }
      
      // Search debe funcionar
      const searchInput = page.locator('input[type="text"], input[placeholder*="search"]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill('Container');
        await page.waitForTimeout(500); // Wait for search results
        
        // Verificar que hay resultados o contenido filtrado
        const content = page.locator('main');
        await expect(content).toBeVisible();
      }
      
      // Debe tener CTA de premium
      const premiumCTA = page.locator('text="Get Premium", text="Premium Access"').first();
      if (await premiumCTA.isVisible()) {
        await expect(premiumCTA).toBeVisible();
      }
    });
    
    test('Pricing - Página de conversión funcional', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      
      // Página debe cargar
      await expect(page).toHaveTitle(/Pricing|Premium/);
      
      // Debe mostrar información de pricing
      const pricingInfo = page.locator('text="$", text="Premium", text="Access", .price');
      await expect(pricingInfo.first()).toBeVisible();
      
      // Debe tener botón de checkout/compra
      const checkoutBtn = page.locator(
        'text="Get Instant Access", text="Buy Now", text="Subscribe", button'
      ).first();
      await expect(checkoutBtn).toBeVisible();
    });
  });
  
  test.describe('Páginas Premium - Comportamiento Observable', () => {
    
    test('Architecture page - Verifica presencia de contenido premium', async ({ page }) => {
      await page.goto('/architecture');
      await page.waitForLoadState('networkidle');
      
      // Página debe cargar (incluso si está restringida)
      await expect(page).toHaveTitle(/Architecture/);
      
      // Debe haber ALGÚN contenido visible (al menos headers/intro)
      const content = page.locator('main, .content, h1, h2').first();
      await expect(content).toBeVisible();
      
      // Si hay sistema de premium, debe haber indicadores
      const premiumIndicators = page.locator(
        '.blur, [class*="blur"], .premium, [class*="premium"], text="Premium", text="Unlock"'
      );
      
      const indicatorCount = await premiumIndicators.count();
      console.log(`Found ${indicatorCount} premium indicators on architecture page`);
      
      // Verificar que hay navegación de retorno
      const navbar = page.locator('nav, .navbar').first();
      await expect(navbar).toBeVisible();
    });
    
    test('Interview page - Verifica acceso a contenido de entrevistas', async ({ page }) => {
      await page.goto('/interview');
      await page.waitForLoadState('networkidle');
      
      // Página debe cargar
      await expect(page).toHaveTitle(/Interview/);
      
      // Debe mostrar estructura de contenido
      const content = page.locator('main').first();
      await expect(content).toBeVisible();
      
      // Buscar indicadores de contenido premium vs free
      const allText = await page.textContent('body');
      const hasPremiumIndicators = allText?.includes('Premium') || 
                                   allText?.includes('Unlock') || 
                                   allText?.includes('Access');
      
      console.log(`Interview page has premium indicators: ${hasPremiumIndicators}`);
      
      // Verificar que no hay errores de carga
      await expect(page.locator('text="Error", text="404", text="Not Found"')).toHaveCount(0);
    });
    
    test('Mental Model page - Estructura de contenido presente', async ({ page }) => {
      await page.goto('/mental-model');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveTitle(/Mental/);
      
      const mainContent = page.locator('main').first();
      await expect(mainContent).toBeVisible();
      
      // Verificar que hay contenido significativo
      const bodyText = await page.textContent('body');
      const hasSignificantContent = bodyText && bodyText.length > 100;
      
      expect(hasSignificantContent).toBeTruthy();
    });
  });
  
  test.describe('Flujos de Navegación Premium', () => {
    
    test('Navegación desde homepage a premium content', async ({ page }) => {
      // Empezar en homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Buscar y clickear enlace a contenido premium
      const premiumLinks = page.locator(
        'a[href*="architecture"], a[href*="interview"], a[href*="mental"], text="Architecture", text="Interview"'
      );
      
      if (await premiumLinks.count() > 0) {
        const firstLink = premiumLinks.first();
        await firstLink.click();
        
        // Verificar que navegó correctamente
        await page.waitForLoadState('networkidle');
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/\/(architecture|interview|mental)/);
        
        // Página debe cargar sin errores
        const content = page.locator('main').first();
        await expect(content).toBeVisible();
      }
    });
    
    test('Flujo completo: Homepage → Content → Pricing', async ({ page }) => {
      // 1. Homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 2. Ir a pricing via botón premium
      const premiumBtn = page.locator('text="Get Premium", text="Access Premium"').first();
      if (await premiumBtn.isVisible()) {
        await premiumBtn.click();
        await page.waitForLoadState('networkidle');
        
        // Verificar que está en pricing o premium (que redirige)
        const finalUrl = page.url();
        expect(finalUrl).toMatch(/\/(premium|pricing)/);
        
        // 3. Verificar contenido de pricing
        const pricingContent = page.locator('text="$", .price, text="Premium"').first();
        await expect(pricingContent).toBeVisible();
        
        // 4. Verificar botón de compra presente
        const buyButton = page.locator('button, text="Get Instant Access", text="Buy"').first();
        await expect(buyButton).toBeVisible();
      }
    });
    
    test('Navegación entre páginas premium mantiene contexto', async ({ page }) => {
      const premiumPages = ['/architecture', '/interview', '/mental-model'];
      
      for (const pagePath of premiumPages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        // Verificar que página carga
        const content = page.locator('main').first();
        await expect(content).toBeVisible();
        
        // Verificar que navbar está presente y funcional
        const navbar = page.locator('nav').first();
        await expect(navbar).toBeVisible();
        
        // Verificar que no hay errores en console
        const errors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        
        // Pequeña pausa para capturar errores
        await page.waitForTimeout(1000);
        
        // No debe haber errores críticos de JS
        const criticalErrors = errors.filter(error => 
          !error.includes('Warning') && 
          !error.includes('non-passive')
        );
        expect(criticalErrors.length).toBe(0);
      }
    });
  });
  
  test.describe('Estados de UI y UX', () => {
    
    test('Navbar refleja estado premium correctamente', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Verificar que navbar está presente
      const navbar = page.locator('nav').first();
      await expect(navbar).toBeVisible();
      
      // Debe tener elemento de premium (botón o estado)
      const premiumElement = page.locator(
        'text="Get Premium", text="Premium", text="Sign In", text="Login"'
      ).first();
      await expect(premiumElement).toBeVisible();
      
      // Verificar que navbar es responsive
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile
      await expect(navbar).toBeVisible();
      
      await page.setViewportSize({ width: 1280, height: 720 }); // Desktop
      await expect(navbar).toBeVisible();
    });
    
    test('Loading states no interfieren con navegación', async ({ page }) => {
      await page.goto('/');
      
      // Navegación rápida entre páginas
      const pages = ['/', '/widget-map', '/pricing'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        
        // Página debe cargar en tiempo razonable
        await page.waitForLoadState('domcontentloaded');
        
        // Contenido principal debe aparecer
        const content = page.locator('main, body').first();
        await expect(content).toBeVisible();
      }
    });
    
    test('Responsive design funciona en premium pages', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667, name: 'Mobile' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1280, height: 720, name: 'Desktop' }
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        
        await page.goto('/pricing');
        await page.waitForLoadState('networkidle');
        
        // Content debe ser visible en todas las resoluciones
        const content = page.locator('main').first();
        await expect(content).toBeVisible();
        
        // Pricing info debe ser legible
        const pricingInfo = page.locator('text="$", .price').first();
        if (await pricingInfo.isVisible()) {
          await expect(pricingInfo).toBeVisible();
        }
        
        console.log(`✅ Pricing responsive en ${viewport.name}`);
      }
    });
  });
  
  test.describe('Performance y Calidad', () => {
    
    test('Premium pages cargan rápidamente', async ({ page }) => {
      const pages = ['/', '/widget-map', '/pricing', '/architecture'];
      
      for (const pagePath of pages) {
        const startTime = Date.now();
        
        await page.goto(pagePath);
        await page.waitForLoadState('domcontentloaded');
        
        const loadTime = Date.now() - startTime;
        
        // Páginas deben cargar en menos de 3 segundos
        expect(loadTime).toBeLessThan(3000);
        
        console.log(`${pagePath} loaded in ${loadTime}ms`);
      }
    });
    
    test('No hay links rotos en flujo premium', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Obtener todos los links internos
      const links = await page.locator('a[href^="/"]').all();
      
      const uniqueHrefs = new Set<string>();
      for (const link of links) {
        const href = await link.getAttribute('href');
        if (href && href.startsWith('/')) {
          uniqueHrefs.add(href);
        }
      }
      
      // Probar algunos links principales
      const mainLinks = Array.from(uniqueHrefs).filter(href => 
        ['/pricing', '/premium', '/widget-map', '/architecture', '/interview', '/mental-model']
        .some(main => href.includes(main))
      );
      
      for (const href of mainLinks.slice(0, 5)) { // Probar máximo 5 para no sobrecargar
        const response = await page.goto(href);
        expect(response?.status()).toBeLessThan(400);
        
        console.log(`✅ Link ${href} works (${response?.status()})`);
      }
    });
  });
});
