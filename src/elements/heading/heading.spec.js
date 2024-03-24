import { test, expect } from '@playwright/test';

test.describe('Heading component', () => {
  test('Should display heading text', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');
    await expect(await page.getByText(/default heading text/i)).toBeVisible();
    await expect(await page.getByText(/level 1/i)).toBeVisible();
    await expect(await page.getByText(/level 2/i)).toBeVisible();
    await expect(await page.getByText(/level 3/i)).toBeVisible();
    await expect(await page.getByText(/level 4/i)).toBeVisible();
    await expect(await page.getByText(/level 5/i)).toBeVisible();
    await expect(await page.getByText(/level 6/i)).toBeVisible();
  });
});
