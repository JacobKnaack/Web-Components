import { test, expect } from '@playwright/test';

test.describe('Surface Element', () => {
  test('Should display child element text', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');

    await expect(await page.getByText('Default Surface Type')).toBeVisible();
    await expect(await page.getByText('Glass Surface Type')).toBeVisible();
    await expect(await page.getByText('Paper Surface Type')).toBeVisible();
  });
});