import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/FlutterToNative\.pro/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /From Senior Flutter to Senior iOS Native/ })).toBeVisible();
    
    // Check navbar
    await expect(page.getByRole('link', { name: 'FlutterToNative.pro' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Concepts' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'UI Lab' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Architecture' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Interview Prep' })).toBeVisible();
    
    // Check CTA button
    await expect(page.getByRole('link', { name: 'Join Beta & Waitlist' })).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile navigation
    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
    
    // Check main content is visible
    await expect(page.getByRole('heading', { name: /From Senior Flutter to Senior iOS Native/ })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Click Sign In link
    await page.getByRole('link', { name: 'Sign In' }).click();
    
    // Should be on login page
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Welcome to FlutterToNative.pro' })).toBeVisible();
  });
});