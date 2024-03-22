import { test, expect } from '@playwright/test';

test.describe('Input Element', () => {
  test('Should be selected able and take in text input', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');

    let input = await page.getByRole('textbox', { name: /placeholder value 1/i });
    await expect(input).toBeVisible();

    await input.fill('input value 1');
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveValue('input value 1');
  });

  test('Should be selectable by label text if present', async ({ page }) => {
    await page.goto('http://localhost:8080/elements.html');
    let input = await page.getByRole('textbox', { name: /input label 1/i });
    await expect(input).toBeVisible();
    
    await input.fill('input value 2');
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveValue('input value 2');
  });
});
