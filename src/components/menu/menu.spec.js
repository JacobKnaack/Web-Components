import { test, expect } from '@playwright/test';
import liveServer from 'live-server';

test.beforeAll(async () => {
  const params = {
    root: 'src/components/menu',
    file: 'index.html',
    open: 'false',
  }
  liveServer.start(params);
});
test.afterAll(async () => {
  liveServer.shutdown();
});

test('Can add menu items', async ({ page }) => {
  await page.goto(`http://localhost:8080`);
  await expect(await page.getByText(/Menu Test/)).toBeVisible();

  await expect(await page.getByText(/Item 1/)).toBeVisible();
  await expect(await page.getByText(/Item 2/)).toBeVisible();
  await expect(await page.getByText(/Item 3/)).toBeVisible();
  await expect(await page.getByText(/Item 4/)).toBeVisible();
});
test('Can add horizontal menu', async ({ page }) => {
  await page.goto(`http://localhost:8080`);

  await expect(await page.getByText(/Item 5/)).toBeVisible();
  await expect(await page.getByText(/Item 6/)).toBeVisible();
});