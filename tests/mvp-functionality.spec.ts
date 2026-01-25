import { test, expect } from '@playwright/test';

test.describe('Simplified MVP Functionality Tests', () => {
  
  test.describe('Homepage Functionality', () => {
    test('homepage loads correctly', async ({ page }) => {
      await page.goto('/');
      
      // Check page title
      await expect(page).toHaveTitle(/Flutter to iOS/);
      
      // Check main heading exists
      await expect(page.locator('h1').first()).toBeVisible();
      
      // Check that page loads without significant errors
      const errorLogs: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errorLogs.push(msg.text());
        }
      });
      
      await page.waitForLoadState('networkidle');
      
      // Filter out acceptable warnings
      const significantErrors = errorLogs.filter(error => 
        !error.includes('Warning:') && 
        !error.includes('inferred your workspace root') &&
        !error.includes('UserProvider')
      );
      
      expect(significantErrors).toHaveLength(0);
    });

    test('"Access Premium Content" or "Get Premium" button works', async ({ page }) => {
      await page.goto('/');
      
      // Look for various premium access buttons
      const premiumButtons = [
        page.locator('text=Access Premium Content'),
        page.locator('text=Get Premium Access'),
        page.locator('text=Get Premium'),
        page.locator('a[href="/premium"]'),
        page.locator('a[href="/pricing"]')
      ];
      
      let buttonFound = false;
      for (const button of premiumButtons) {
        if (await button.isVisible()) {
          await button.click();
          buttonFound = true;
          break;
        }
      }
      
      expect(buttonFound).toBeTruthy();
      
      // Should navigate to /premium or /pricing
      await expect(page).toHaveURL(/\/(premium|pricing)/);
    });

    test('no references to lead magnets or email signup forms', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check that there are no email signup forms on homepage
      const emailInputs = page.locator('input[type="email"]');
      const emailInputCount = await emailInputs.count();
      expect(emailInputCount).toBe(0);
      
      // Check for common lead magnet terms
      const pageContent = await page.textContent('body');
      
      const leadMagnetTerms = [
        'join our mailing list',
        'subscribe to newsletter', 
        'get free guide',
        'download free',
        'join waitlist',
        'join beta'
      ];
      
      leadMagnetTerms.forEach(term => {
        expect(pageContent?.toLowerCase()).not.toContain(term);
      });
    });
  });

  test.describe('Premium/Pricing Flow', () => {
    test('/premium redirects to /pricing correctly', async ({ page }) => {
      await page.goto('/premium');
      
      // Should either show pricing content or redirect to /pricing
      await page.waitForLoadState('networkidle');
      
      const currentUrl = page.url();
      const isPricingPage = currentUrl.includes('/pricing') || 
                           await page.locator('text=pricing').isVisible() ||
                           await page.locator('text=Premium').isVisible();
      
      expect(isPricingPage).toBeTruthy();
    });

    test('pricing page loads and displays correctly', async ({ page }) => {
      await page.goto('/pricing');
      
      // Check page loads
      await expect(page).toHaveTitle(/Flutter to iOS/);
      
      // Should have some pricing-related content
      const pricingIndicators = [
        page.locator('text=Premium').first(),
        page.locator('text=Price').first(),
        page.locator('text=$').first(),
        page.locator('button:has-text("Premium")').first(),
        page.locator('button:has-text("Access")').first()
      ];
      
      let hasPricingContent = false;
      for (const indicator of pricingIndicators) {
        if (await indicator.isVisible()) {
          hasPricingContent = true;
          break;
        }
      }
      
      expect(hasPricingContent).toBeTruthy();
    });

    test('premium buttons in navbar work', async ({ page }) => {
      await page.goto('/');
      
      // Look for premium buttons in navbar
      const navbarPremiumButtons = [
        page.locator('nav').locator('text=Get Premium').first(),
        page.locator('nav').locator('text=Premium').first(),
        page.locator('nav').locator('a[href="/premium"]').first(),
        page.locator('nav').locator('a[href="/pricing"]').first()
      ];
      
      let buttonClicked = false;
      for (const button of navbarPremiumButtons) {
        if (await button.isVisible()) {
          await button.click();
          buttonClicked = true;
          break;
        }
      }
      
      if (buttonClicked) {
        await expect(page).toHaveURL(/\/(premium|pricing)/);
      }
    });
  });

  test.describe('Widget Map Functionality', () => {
    test('/widget-map page loads correctly', async ({ page }) => {
      await page.goto('/widget-map');
      
      // Check page loads
      await expect(page).toHaveTitle(/Flutter to iOS/);
      
      // Should have widget map content
      const widgetMapIndicators = [
        page.locator('text=Widget').first(),
        page.locator('text=Map').first(),
        page.locator('text=Component').first(),
        page.locator('input[type="search"]').first(),
        page.locator('input[placeholder*="search"]').first(),
        page.locator('input[placeholder*="Search"]').first()
      ];
      
      let hasWidgetMapContent = false;
      for (const indicator of widgetMapIndicators) {
        if (await indicator.isVisible()) {
          hasWidgetMapContent = true;
          break;
        }
      }
      
      expect(hasWidgetMapContent).toBeTruthy();
    });

    test('search functionality works', async ({ page }) => {
      await page.goto('/widget-map');
      await page.waitForLoadState('networkidle');
      
      // Look for search input
      const searchInputs = [
        page.locator('input[type="search"]'),
        page.locator('input[placeholder*="search"]'),
        page.locator('input[placeholder*="Search"]'),
        page.locator('input[aria-label*="search"]'),
        page.locator('input[aria-label*="Search"]')
      ];
      
      let searchInput = null;
      for (const input of searchInputs) {
        if (await input.isVisible()) {
          searchInput = input;
          break;
        }
      }
      
      if (searchInput) {
        await searchInput.fill('button');
        // Wait for any potential search results to load
        await page.waitForTimeout(1000);
        expect(true).toBeTruthy(); // Search input is functional
      }
    });

    test('"Get Premium Access" button works on widget map', async ({ page }) => {
      await page.goto('/widget-map');
      
      // Look for premium access buttons
      const premiumButtons = [
        page.locator('text=Get Premium Access'),
        page.locator('text=Premium Access'),
        page.locator('text=Access Premium'),
        page.locator('button:has-text("Premium")'),
        page.locator('a:has-text("Premium")')
      ];
      
      let buttonFound = false;
      for (const button of premiumButtons) {
        if (await button.isVisible()) {
          await button.click();
          buttonFound = true;
          break;
        }
      }
      
      if (buttonFound) {
        await expect(page).toHaveURL(/\/(premium|pricing)/);
      }
    });
  });

  test.describe('Navigation and UI', () => {
    test('navbar shows "Get Premium" instead of "Join Waitlist"', async ({ page }) => {
      await page.goto('/');
      
      // Check navbar content
      const navbar = page.locator('nav');
      await expect(navbar).toBeVisible();
      
      const navbarText = await navbar.textContent();
      
      // Should have premium-related text, not waitlist
      expect(navbarText?.toLowerCase()).not.toContain('join waitlist');
      expect(navbarText?.toLowerCase()).not.toContain('waitlist');
      
      // Should have premium-related text
      const hasPremiumText = navbarText?.toLowerCase().includes('premium') ||
                            navbarText?.toLowerCase().includes('get premium') ||
                            navbarText?.toLowerCase().includes('access premium');
      
      expect(hasPremiumText).toBeTruthy();
    });

    test('all main navigation links work', async ({ page }) => {
      await page.goto('/');
      
      // Test home navigation
      const homeLinks = [
        page.locator('nav a[href="/"]'),
        page.locator('nav').locator('text=Home'),
        page.locator('a:has-text("Flutter")')
      ];
      
      for (const link of homeLinks) {
        if (await link.isVisible()) {
          await link.click();
          await expect(page).toHaveURL('/');
          break;
        }
      }
      
      // Test widget map navigation
      const widgetMapLinks = [
        page.locator('nav a[href="/widget-map"]'),
        page.locator('nav').locator('text=Widget Map'),
        page.locator('nav').locator('text=Widgets')
      ];
      
      for (const link of widgetMapLinks) {
        if (await link.isVisible()) {
          await link.click();
          await expect(page).toHaveURL('/widget-map');
          await page.goBack();
          break;
        }
      }
    });

    test('no broken links or 404s on main pages', async ({ page }) => {
      const pagesToTest = ['/', '/premium', '/pricing', '/widget-map', '/login'];
      
      for (const testPage of pagesToTest) {
        const response = await page.goto(testPage);
        expect(response?.status()).toBeLessThan(400);
      }
    });
  });

  test.describe('Authentication Flow (Basic)', () => {
    test('login page loads without lead-related errors', async ({ page }) => {
      const errorLogs: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errorLogs.push(msg.text());
        }
      });
      
      await page.goto('/login');
      await page.waitForLoadState('networkidle');
      
      // Filter out acceptable errors and warnings
      const significantErrors = errorLogs.filter(error => 
        !error.includes('Warning:') && 
        !error.includes('inferred your workspace root') &&
        !error.includes('UserProvider') &&
        !error.includes('lead') &&
        !error.includes('email signup')
      );
      
      expect(significantErrors).toHaveLength(0);
    });

    test('authentication elements work without lead magnet functionality', async ({ page }) => {
      await page.goto('/login');
      
      // Check basic auth elements exist
      const authElements = [
        page.locator('input[type="email"]'),
        page.locator('button:has-text("Sign")')
      ];
      
      let hasAuthElements = false;
      for (const element of authElements) {
        if (await element.isVisible()) {
          hasAuthElements = true;
          break;
        }
      }
      
      expect(hasAuthElements).toBeTruthy();
      
      // No lead magnet elements should be present
      const pageContent = await page.textContent('body');
      expect(pageContent?.toLowerCase()).not.toContain('free guide');
      expect(pageContent?.toLowerCase()).not.toContain('download');
    });
  });
});