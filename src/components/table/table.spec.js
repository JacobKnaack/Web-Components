import { test, expect } from '@playwright/test';

test.describe('Table Component', () => {
  test('Has a visible table with a caption', async ({ page }) => {
    await page.goto(`http://localhost:8080/table.html`);
    await expect( await page.getByText(/test caption/i)).toBeVisible();
  });
  
  test('Can add rows and columns', async ({ page }) => {
    await page.goto(`http://localhost:8080/table.html`);
    await expect(await page.getByText(/test1/i)).toBeVisible();
    await expect(await page.getByText(/row 1 value 1/i)).toBeVisible();
  });
});
