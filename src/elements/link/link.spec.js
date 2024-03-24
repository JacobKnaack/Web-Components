import { test, expect } from '@playwright/test';

test.describe('Link Element', () => {
  test('Should display link text', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');

    await expect(await page.getByText(/link text/i)).toBeVisible();
  });
  test('Should be clickable', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');
    await page.getByRole('link', {name: /link text/i}).click();

    await expect(await page.getByText(/js\s*dom\s*web\s*components/i)).toBeVisible();
  });
});