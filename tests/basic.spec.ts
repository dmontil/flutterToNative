import { test, expect } from '@playwright/test';

test.describe('Basic Site Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('https://www.fluttertonative.pro');
    
    // Check page loads and responds
    await expect(page).toHaveTitle(/FlutterToNative\.pro/);
    
    // Check main content is visible
    await expect(page.getByRole('heading', { name: /From Senior Flutter/ })).toBeVisible();
    
    // Check status is 200
    const response = await page.goto('https://www.fluttertonative.pro');
    expect(response?.status()).toBe(200);
  });

  test('should load login page successfully', async ({ page }) => {
    const response = await page.goto('https://www.fluttertonative.pro/login');
    
    // Check response status
    expect(response?.status()).toBe(200);
    
    // Check login page loads
    await expect(page.getByText('Welcome to FlutterToNative.pro')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Magic Link' })).toBeVisible();
  });

  test('should handle auth callback error', async ({ page }) => {
    const response = await page.goto('https://www.fluttertonative.pro/auth/callback');
    
    // Check response status
    expect(response?.status()).toBe(200);
    
    // Should show error page since no auth data
    await expect(page.getByText('Authentication Error')).toBeVisible();
  });

  test('should have working authentication flow elements', async ({ page }) => {
    // Test login form functionality
    await page.goto('https://www.fluttertonative.pro/login');
    
    // Fill email and try to submit
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Send Magic Link")');
    
    // Should show loading state or confirmation
    await expect(page.locator('button:has-text("Sending Magic Link")')).toBeVisible({ timeout: 10000 });
  });
});