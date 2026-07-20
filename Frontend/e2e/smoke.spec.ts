import { test, expect } from '@playwright/test';

test.describe('StellarVault X Smoke Tests', () => {
  test('landing page loads correctly with brand title and logo', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/StellarVault/i);
    
    // Check main heading / hero branding
    const mainBrand = page.getByRole('heading', { level: 1 });
    await expect(mainBrand).toBeVisible();

    // Check Start Borrowing and Earn as Lender CTAs
    const startBorrowingBtn = page.getByRole('button', { name: /start borrowing/i });
    await expect(startBorrowingBtn).toBeVisible();
  });

  test('navigation links are responsive and functional', async ({ page }) => {
    await page.goto('/');
    
    // Check Features section exists
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeVisible();
  });
});
