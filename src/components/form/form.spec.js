import { test, expect } from '@playwright/test';

test.describe('Form component', () => {
  test('Has Form title and input labels visible in Browser', async ({ page }) => {
    await page.goto(`http://localhost:8080/form.html`);
    await expect(await page.getByText(/Form Test/)).toBeVisible();
  
    await expect(await page.getByRole('heading', {name:/Test Legend/})).toBeVisible();
    await expect(await page.getByText(/test label 1/)).toBeVisible();
  });
  test('Can add a callback and click submit', async ({ page }) => {
    await page.goto(`http://localhost:8080/form.html`);
    let input = 'test input 1';
  
    await page.getByLabel('test label 1').fill(input);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(await page.getByText(input)).toBeVisible();
  });
  test('Can add a required text input', async ({ page }) => {
    await page.goto(`http://localhost:8080/form.html`);
    await page.getByRole('button', { name: /add required input/i }).click();
    let input = 'test input 2';
  
    await page.getByLabel('test label 5').fill(input);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(await page.getByText(input)).toBeVisible();
  });
  test('Can add drop down menu input', async ({ page }) => {
    await page.goto(`http://localhost:8080/form.html`);
  
    await page.locator('[name=test-id-2]').selectOption('option 2');
    await page.getByRole('button', { name: "Submit" }).click();
    await expect(await page.getByText('option-2')).toBeVisible();
  });
  test('Can add a multiple choice input', async ({ page }) => {
    await page.goto(`http://localhost:8080/form.html`);
  
    await page.getByText(/option 3/i).click();
    await page.getByRole('button', { name: "Submit" }).click();
    await expect(await page.getByText('true')).toBeVisible();
  });
  test('Can add a date picker input', async ({ page }) => {
    await page.goto(`http://localhost:8080/form.html`);
  
    expect(await page.getByLabel('test label 4')).toBeVisible();
  
    await page.getByLabel('test label 4').click();
    await page.keyboard.press('Digit1');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Digit1');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Digit1');
    await page.keyboard.press('Digit1');
    await page.keyboard.press('Digit1');
    await page.keyboard.press('Digit1');
    await page.getByRole('button', { name: "Submit" }).click();
    await expect(await page.getByText('1111-01-01')).toBeVisible();
  });
});
