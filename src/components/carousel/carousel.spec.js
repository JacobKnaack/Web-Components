import { test, expect } from '@playwright/test';

test.describe('Carousel Component', () => {
  test('Carousel should be able to add and display string items', async ({ page }) => {
    await page.goto(`http://localhost:8080/carousel.html`);
    await expect(await page.getByText(/Carousel Test/)).toBeVisible();
  
    await expect(await page.getByRole('img')).toBeVisible();
  });
  test('Can click arrow buttons to see next items', async ({ page }) => {
    await page.goto(`http://localhost:8080/carousel.html`);
  
    await expect(await page.getByTestId('prev-arr')).toBeVisible();
    await expect(await page.getByTestId('next-arr')).toBeVisible();
  });
  test('Can display a caption along with the carousel item', async({ page }) => {
    await page.goto(`http://localhost:8080/carousel.html`);
  
    await page.getByTestId('next-arr').click();
    await expect(await page.getByText(/test caption text 1/i)).toBeVisible();
  });
  test('Can create a clickable call to action button', async ({ page }) => {
    await page.goto(`http://localhost:8080/carousel.html`);
  
    await page.getByRole('button', { name: /click here/i }).click();
    await expect(await page.getByText(/item 1 has been clicked/i)).toBeVisible();
  });
});
