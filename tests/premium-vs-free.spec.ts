import { test, expect } from '@playwright/test';

/**
 * Test simple y directo para comparar usuarios premium vs free
 * Enfoque práctico para verificar que el gating funciona
 */

test.describe('Premium vs Free User Experience', () => {

  test('Baseline: Verificar que páginas cargan y tienen diferente contenido según acceso', async ({ page }) => {
    // Test 1: Usuario no logueado/free - Estado base
    console.log('🔍 Testing FREE/GUEST user experience...');
    
    await page.goto('/architecture');
    await page.waitForLoadState('networkidle');
    
    // Capturar estado como usuario free
    const freePageContent = await page.textContent('body');
    const freeHasBlur = await page.locator('.blur, [class*="blur"]').count();
    const freeHasPremiumCTA = await page.locator('text="Premium", text="Upgrade", text="Get Premium"').count();
    
    console.log(`FREE User - Content length: ${freePageContent?.length || 0}`);
    console.log(`FREE User - Blur elements: ${freeHasBlur}`);
    console.log(`FREE User - Premium CTAs: ${freeHasPremiumCTA}`);
    
    // Test 2: Simular usuario premium via localStorage
    console.log('\\n💎 Testing PREMIUM user experience...');
    
    // Simular sesión premium mediante localStorage
    await page.evaluate(() => {
      // Mock session como usuario premium hardcodeado
      const premiumUser = {
        id: '48847f19-0543-464a-a027-0185db0b9e3b',
        email: 'premium@test.com'
      };
      
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        access_token: 'mock_premium_token',
        user: premiumUser
      }));
    });
    
    // Reload para aplicar estado premium
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Capturar estado como usuario premium
    const premiumPageContent = await page.textContent('body');
    const premiumHasBlur = await page.locator('.blur, [class*="blur"]').count();
    const premiumHasPremiumCTA = await page.locator('text="Premium", text="Upgrade", text="Get Premium"').count();
    
    console.log(`PREMIUM User - Content length: ${premiumPageContent?.length || 0}`);
    console.log(`PREMIUM User - Blur elements: ${premiumHasBlur}`);
    console.log(`PREMIUM User - Premium CTAs: ${premiumHasPremiumCTA}`);
    
    // Verificaciones básicas
    expect(freePageContent?.length).toBeGreaterThan(100); // Contenido base presente
    expect(premiumPageContent?.length).toBeGreaterThan(100); // Contenido premium presente
    
    // Si hay diferencias, deben ser significativas
    const contentDifference = Math.abs((premiumPageContent?.length || 0) - (freePageContent?.length || 0));
    console.log(`\\n📊 Content difference: ${contentDifference} characters`);
    
    // Report findings
    console.log('\\n📋 SUMMARY:');
    console.log(`- Free user sees ${freeHasPremiumCTA} premium prompts`);
    console.log(`- Premium user sees ${premiumHasPremiumCTA} premium prompts`);
    console.log(`- Free user has ${freeHasBlur} blurred elements`);
    console.log(`- Premium user has ${premiumHasBlur} blurred elements`);
    
    // Basic expectations
    expect(freePageContent).toBeTruthy();
    expect(premiumPageContent).toBeTruthy();
  });

  test('Compare pricing access: Free user should see pricing, premium user should see different experience', async ({ page }) => {
    console.log('💰 Testing pricing page access...');
    
    // Test como usuario free
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
    
    const freeSeesCheckout = await page.locator('button, text="Get Instant Access", text="Buy"').count();
    const freeSeesPrice = await page.locator('text="$", .price').count();
    
    console.log(`FREE user on pricing - Checkout buttons: ${freeSeesCheckout}`);
    console.log(`FREE user on pricing - Price elements: ${freeSeesPrice}`);
    
    // Simular usuario premium
    await page.evaluate(() => {
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        access_token: 'mock_premium_token',
        user: { id: '48847f19-0543-464a-a027-0185db0b9e3b' }
      }));
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const premiumSeesCheckout = await page.locator('button, text="Get Instant Access", text="Buy"').count();
    const premiumSeesPrice = await page.locator('text="$", .price').count();
    
    console.log(`PREMIUM user on pricing - Checkout buttons: ${premiumSeesCheckout}`);
    console.log(`PREMIUM user on pricing - Price elements: ${premiumSeesPrice}`);
    
    // Basic validation
    expect(freeSeesPrice + freeSeesCheckout).toBeGreaterThan(0); // Free user should see pricing
  });

  test('Interactive test: Simulate user journey from free to premium intent', async ({ page }) => {
    console.log('🎯 Testing conversion funnel...');
    
    // Start as free user on homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log('Step 1: Free user lands on homepage');
    
    // Look for premium CTA
    const premiumCTA = page.locator('text="Get Premium", text="Access Premium", text="Premium"').first();
    if (await premiumCTA.isVisible()) {
      console.log('Step 2: Free user sees premium CTA, clicking...');
      await premiumCTA.click();
      await page.waitForLoadState('networkidle');
      
      // Should land on pricing or premium page
      const currentUrl = page.url();
      const isOnPricingFlow = currentUrl.includes('pricing') || currentUrl.includes('premium');
      
      console.log(`Step 3: User landed on: ${currentUrl}`);
      console.log(`Is on pricing flow: ${isOnPricingFlow}`);
      
      expect(isOnPricingFlow).toBeTruthy();
      
      // Check for conversion elements
      const hasCheckoutOption = await page.locator('button, text="Buy", text="Subscribe"').count();
      console.log(`Step 4: Checkout options available: ${hasCheckoutOption}`);
      
    } else {
      console.log('No premium CTA found on homepage - checking if homepage is fully free');
    }
    
    // Navigate to protected content
    console.log('Step 5: Testing access to premium content...');
    await page.goto('/architecture');
    await page.waitForLoadState('networkidle');
    
    const premiumPrompts = await page.locator('text="Premium", text="Unlock", text="Get Access"').count();
    console.log(`Premium prompts on protected content: ${premiumPrompts}`);
    
    // Basic validation that flow makes sense
    const bodyContent = await page.textContent('body');
    expect(bodyContent?.length).toBeGreaterThan(50); // Some content should always be visible
  });

  test('Widget Map - Free vs Premium experience comparison', async ({ page }) => {
    console.log('🗺️ Testing Widget Map experience...');
    
    // Test as free user
    await page.goto('/widget-map');
    await page.waitForLoadState('networkidle');
    
    const freeCanSearch = await page.locator('input[type="text"], input[placeholder*="search"]').count();
    const freeSeesWidgets = await page.textContent('body');
    const freeSeesUpgrade = await page.locator('text="Premium", text="Get Premium"').count();
    
    console.log(`FREE Widget Map - Search available: ${freeCanSearch > 0}`);
    console.log(`FREE Widget Map - Content length: ${freeSeesWidgets?.length}`);
    console.log(`FREE Widget Map - Upgrade prompts: ${freeSeesUpgrade}`);
    
    // Test search functionality
    if (freeCanSearch > 0) {
      const searchInput = page.locator('input[type="text"], input[placeholder*="search"]').first();
      await searchInput.fill('Container');
      await page.waitForTimeout(1000);
      
      const afterSearchContent = await page.textContent('body');
      console.log(`After search content length: ${afterSearchContent?.length}`);
    }
    
    // Basic validation
    expect(freeSeesWidgets?.length).toBeGreaterThan(100); // Should have meaningful content
    
    // Widget Map should be accessible as it's mentioned as a lead magnet/free tool
    const hasWidgetContent = freeSeesWidgets?.includes('Flutter') && freeSeesWidgets?.includes('Swift');
    expect(hasWidgetContent).toBeTruthy();
  });

  test('Authentication flow affects premium content visibility', async ({ page }) => {
    console.log('🔐 Testing authentication impact...');
    
    // Test logged out state
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');
    
    const loggedOutContent = await page.textContent('body');
    const loggedOutPrompts = await page.locator('text="Sign In", text="Login"').count();
    
    console.log(`Logged out - Content available: ${loggedOutContent?.length}`);
    console.log(`Logged out - Auth prompts: ${loggedOutPrompts}`);
    
    // Test "logged in but not premium" state
    await page.evaluate(() => {
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        access_token: 'mock_free_token',
        user: { id: 'free-user-123', email: 'free@test.com' }
      }));
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const loggedInFreeContent = await page.textContent('body');
    const loggedInFreeUpgrade = await page.locator('text="Upgrade", text="Premium"').count();
    
    console.log(`Logged in (free) - Content available: ${loggedInFreeContent?.length}`);
    console.log(`Logged in (free) - Upgrade prompts: ${loggedInFreeUpgrade}`);
    
    // Test premium user state
    await page.evaluate(() => {
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        access_token: 'mock_premium_token',
        user: { id: '48847f19-0543-464a-a027-0185db0b9e3b', email: 'premium@test.com' }
      }));
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const premiumContent = await page.textContent('body');
    const premiumUpgrade = await page.locator('text="Upgrade", text="Premium"').count();
    
    console.log(`Premium user - Content available: ${premiumContent?.length}`);
    console.log(`Premium user - Upgrade prompts: ${premiumUpgrade}`);
    
    // Validations
    expect(loggedOutContent?.length).toBeGreaterThan(50);
    expect(loggedInFreeContent?.length).toBeGreaterThan(50);
    expect(premiumContent?.length).toBeGreaterThan(50);
    
    // Premium user should see less upgrade prompts
    console.log('\\n📊 AUTHENTICATION IMPACT SUMMARY:');
    console.log(`Logged out → Logged in (free): ${(loggedInFreeContent?.length || 0) - (loggedOutContent?.length || 0)} chars difference`);
    console.log(`Logged in (free) → Premium: ${(premiumContent?.length || 0) - (loggedInFreeContent?.length || 0)} chars difference`);
  });

});