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

test('Carousel should be able to add and display string items', async ({ page }) => {
  await page.goto(`http://localhost:8080/components/carousel`);
  await expect(await page.getByText(/Carousel Test/)).toBeVisible();

  // should test for the presence of an image and a clickable arrow
  await expect(await page.getByRole('img')).toBeVisible();
});