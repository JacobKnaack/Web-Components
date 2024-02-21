import { test, expect } from '@playwright/test';
import liveServer from 'live-server';

test.beforeAll(async () => {
  const params = {
    root: 'src',
    file: 'index.html',
    open: 'false',
  }
  liveServer.start(params);
});
test.afterAll(async () => {
  liveServer.shutdown();
});

test('Has a visible table with a caption', async ({ page }) => {
  await page.goto(`http://localhost:8080/components/table`);
  await expect( await page.getByText(/test caption/i)).toBeVisible();
});

test('Can add rows and columns', async ({ page }) => {
  await page.goto(`http://localhost:8080/components/table`);
  await expect(await page.getByText(/test1/i)).toBeVisible();
  await expect(await page.getByText(/row 1 value 1/i)).toBeVisible();
});