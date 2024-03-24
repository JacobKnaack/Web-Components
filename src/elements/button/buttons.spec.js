import { test, expect } from '@playwright/test';

test.describe('Button Elements', () => {
  test('Should have readable text', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');
    await expect(await page.getByText(/default button/i)).toBeVisible();
  });
  test('Should be clickable', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');
    await page.getByRole('button', { name: /default button/i }).click();
    await expect(await page.getByText(/default button/i)).toBeVisible();
  });
});