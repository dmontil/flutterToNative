import { test, expect } from '@playwright/test';

test.describe('Basic Site Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    const response = await page.goto('/');
    
    // Check status is 200
    expect(response?.status()).toBe(200);
    
    // Check page loads and responds
    await expect(page).toHaveTitle(/Flutter to iOS/);
    
    // Check main content is visible
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('should load login page successfully', async ({ page }) => {
    const response = await page.goto('/login');
    
    // Check response status
    expect(response?.status()).toBe(200);
    
    // Check login page loads
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('should handle auth callback error', async ({ page }) => {
    const response = await page.goto('/auth/callback');
    
    // Check response status
    expect(response?.status()).toBe(200);
    
    // Wait for any potential redirects
    await page.waitForLoadState('networkidle');
    
    // Should show error page or redirect since no auth data
    // Allow for either error page, redirect to login, or redirect to home
    const currentUrl = page.url();
    const hasErrorText = await page.getByText('Authentication Error').isVisible().catch(() => false);
    const isOnLoginPage = currentUrl.includes('/login');
    const isOnHomePage = currentUrl === 'http://localhost:3002/';
    
    expect(hasErrorText || isOnLoginPage || isOnHomePage).toBeTruthy();
  });

  test('should have no console errors on main pages', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Test main pages
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Filter out acceptable warnings and framework-related errors
    const significantErrors = consoleErrors.filter(error => 
      !error.includes('Warning:') && 
      !error.includes('inferred your workspace root') &&
      !error.includes('UserProvider')
    );
    
    expect(significantErrors).toHaveLength(0);
  });
});