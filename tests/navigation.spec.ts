import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/');
    
    // Test Concepts page
    await page.getByRole('link', { name: 'Concepts' }).click();
    await expect(page).toHaveURL('/mental-model');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Go back to home and test UI Lab
    await page.getByRole('link', { name: 'FlutterToNative.pro' }).click();
    await page.getByRole('link', { name: 'UI Lab' }).click();
    await expect(page).toHaveURL('/components-ui');
    
    // Test Architecture
    await page.getByRole('link', { name: 'FlutterToNative.pro' }).click();
    await page.getByRole('link', { name: 'Architecture' }).click();
    await expect(page).toHaveURL('/architecture');
    
    // Test Interview Prep
    await page.getByRole('link', { name: 'FlutterToNative.pro' }).click();
    await page.getByRole('link', { name: 'Interview Prep' }).click();
    await expect(page).toHaveURL('/interview');
  });

  test('should work on mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Open mobile menu
    await page.getByRole('button', { name: 'Menu' }).click();
    
    // Check mobile menu items are visible
    await expect(page.getByRole('link', { name: 'Concepts' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'UI Lab' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Architecture' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Interview Prep' })).toBeVisible();
    
    // Test navigation
    await page.getByRole('link', { name: 'Concepts' }).click();
    await expect(page).toHaveURL('/mental-model');
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.getByText('© 2026 Native Education. Built for Engineers.').scrollIntoViewIfNeeded();
    
    // Check footer content (be more specific to avoid strict mode violation)
    await expect(page.getByRole('contentinfo').getByText('FlutterToNative.pro')).toBeVisible();
    await expect(page.getByText('© 2026 Native Education. Built for Engineers.')).toBeVisible();
  });
});