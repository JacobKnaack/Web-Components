import { test, expect } from '@playwright/test';

test('Should render a simple list', async ({ page }) => {
  await page.goto('http://localhost:8080/list.html');
  await expect(await page.getByText(/List Test/i)).toBeVisible();

  await expect(await page.getByText(/list item 1/i)).toBeVisible();
  await expect(await page.getByText(/list item 2/i)).toBeVisible();
  await expect(await page.getByText(/list item 3/i)).toBeVisible();
});
test('Should render a grid list', async ({ page }) => {
  await page.goto('http://localhost:8080/list.html');
  await expect(await page.getByText(/Item 1 title/i)).toBeVisible();
  await expect(await page.getByText(/item 1 text/i)).toBeVisible();
  await expect(await page.getByText(/Item 2 title/i)).toBeVisible();
  await expect(await page.getByText(/item 2 text/i)).toBeVisible();
  await expect(await page.getByText(/Item 3 title/i)).toBeVisible();
  await expect(await page.getByText(/item 4 text/i)).toBeVisible();
  await expect(await page.getByText(/Item 5 title/i)).toBeVisible();
  await expect(await page.getByText(/item 5 text/i)).toBeVisible();
  await expect(await page.getByText(/Item 6 title/i)).toBeVisible();
  await expect(await page.getByText(/item 6 text/i)).toBeVisible();
});