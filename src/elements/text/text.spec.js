import { test, expect } from '@playwright/test';

test.describe('Text Element', () => {
  test('Should display text values', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');

    await expect(await page.getByText('Some really pretty text.')).toBeVisible();
  })
});