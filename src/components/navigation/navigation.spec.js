import { test, expect } from '@playwright/test';
import liveServer from 'live-server';

test.beforeAll(async () => {
  const params = {
    root: 'src/components/navigation',
    file: 'index.html',
    open: 'false',
  }
  liveServer.start(params);
});
test.afterAll(async () => {
  liveServer.shutdown();
});

test('Should render navigation list with links', async ({ page }) => {
  await page.goto(`http://localhost:8080`);
  await expect(await page.getByText(/Navigation Test/)).toBeVisible();

  await expect(await page.getByRole('link', { name: 'test link 1' })).toBeVisible();
  await expect(await page.getByRole('link', { name: 'Page 2' })).toBeVisible();
  await expect(await page.getByRole('link', { name: 'LinkToGoogle' })).toBeVisible();
});

test('Should navigate on click', async ({ page }) => {
  await page.goto(`http://localhost:8080`);
  
  await page.getByRole('link', {name: 'LinkToGoogle' }).click();
  let pageUrl = await page.url();
  await expect(pageUrl.includes('google')).toBeTruthy();
});
