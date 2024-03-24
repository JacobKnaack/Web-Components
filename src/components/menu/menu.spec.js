import { test, expect } from '@playwright/test';

test.describe('Menu Component', () => {
  test('Can add menu items', async ({ page }) => {
    await page.goto(`http://localhost:8080/menu.html`);
    await expect(await page.getByText(/Menu Test/)).toBeVisible();
  
    await expect(await page.getByText(/Item 1/)).toBeVisible();
    await expect(await page.getByText(/Item 2/)).toBeVisible();
    await expect(await page.getByText(/Item 3/)).toBeVisible();
    await expect(await page.getByText(/Item 4/)).toBeVisible();
  });
  test('Can add horizontal menu', async ({ page }) => {
    await page.goto(`http://localhost:8080/menu.html`);
  
    await expect(await page.getByText(/Item 5/)).toBeVisible();
    await expect(await page.getByText(/Item 6/)).toBeVisible();
  });
});
