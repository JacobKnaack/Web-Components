import { test, expect } from '@playwright/test';
import liveServer from 'live-server';

test.beforeAll(async () => {
  const params = {
    root: 'src/components/form',
    file: 'index.html',
    open: 'false',
  }
  liveServer.start(params);
});
test.afterAll(async () => {
  liveServer.shutdown();
});

test('Has Form title and input labels visible in Browser', async ({ page }) => {
  await page.goto(`http://localhost:8080`);
  await expect(await page.getByText(/Form Test/)).toBeVisible();

  await expect(await page.getByText(/Test Legend/)).toBeVisible();
  await expect(await page.getByText(/test label 1/)).toBeVisible();
  await expect(await page.getByText(/test label 2/)).toBeVisible();
});
test('Can add a callback and click submit', async ({ page }) => {
  await page.goto(`http://localhost:8080`);
  let input1 = 'test input 1';

  await page.getByLabel('test label 1').fill(input1);
  await page.getByRole('button', { name: "Submit" }).click();
  await expect(await page.getByText(input1)).toBeVisible();
});
test('Can add drop down menu input', async ({ page }) => {
  await page.goto(`http://localhost:8080`);

  await page.getByLabel('test label 1').fill('test');
  await page.locator('[name=test-id-2]').selectOption('option 2');
  await page.getByRole('button', { name: "Submit" }).click();
  await expect(await page.getByText('option-2')).toBeVisible();
});
test('Can add a multiple choice input', async ({ page }) => {
  await page.goto(`http://localhost:8080`);

  await page.getByLabel('test label 1').fill('test');
  await page.getByText(/option 3/i).click();
  await page.getByRole('button', { name: "Submit" }).click();
  await expect(await page.getByText('true')).toBeVisible();
});