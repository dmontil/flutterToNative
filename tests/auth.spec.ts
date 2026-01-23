import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page correctly', async ({ page }) => {
    await page.goto('/login');
    
    // Check page title and heading
    await expect(page).toHaveTitle(/FlutterToNative\.pro/);
    await expect(page.getByRole('heading', { name: 'Welcome to FlutterToNative.pro' })).toBeVisible();
    
    // Check email input
    await expect(page.getByLabel('Email address')).toBeVisible();
    
    // Check magic link button
    await expect(page.getByRole('button', { name: 'Send Magic Link' })).toBeVisible();
    
    // Check helper text
    await expect(page.getByText('No password needed - we\'ll email you a magic link')).toBeVisible();
  });

  test('should show validation for empty email', async ({ page }) => {
    await page.goto('/login');
    
    // Click send without entering email
    await page.getByRole('button', { name: 'Send Magic Link' }).click();
    
    // Should show validation (HTML5 validation)
    const emailInput = page.getByLabel('Email address');
    const validationMessage = await emailInput.evaluateHandle(el => (el as HTMLInputElement).validationMessage);
    expect(await validationMessage.jsonValue()).toBeTruthy();
  });

  test('should show loading state when sending magic link', async ({ page }) => {
    await page.goto('/login');
    
    // Enter test email
    await page.getByLabel('Email address').fill('test@example.com');
    
    // Click send magic link
    await page.getByRole('button', { name: 'Send Magic Link' }).click();
    
    // Should show loading state
    await expect(page.getByRole('button', { name: 'Sending Magic Link...' })).toBeVisible();
  });

  test('should handle auth callback error gracefully', async ({ page }) => {
    // Simulate visiting callback with no auth data
    await page.goto('/auth/callback');
    
    // Should show error page
    await expect(page.getByRole('heading', { name: 'Authentication Error' })).toBeVisible();
    await expect(page.getByText('There was a problem completing your sign in')).toBeVisible();
    
    // Should have try again button
    await expect(page.getByRole('button', { name: 'Try Again' })).toBeVisible();
  });

  test('should redirect to login from error page', async ({ page }) => {
    await page.goto('/auth/callback');
    
    // Click try again
    await page.getByRole('button', { name: 'Try Again' }).click();
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
  });

  test('should be mobile responsive on login page', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/login');
    
    // Check elements are visible on mobile
    await expect(page.getByRole('heading', { name: 'Welcome to FlutterToNative.pro' })).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Magic Link' })).toBeVisible();
  });
});