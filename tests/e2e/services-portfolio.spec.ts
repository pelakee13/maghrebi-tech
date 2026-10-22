import { expect, test } from '@playwright/test';

for (const locale of ['fa', 'en']) {
  test(`/${locale}/services lists 4 services with a CTA`, async ({ page }) => {
    await page.goto(`/${locale}/services`);
    await expect(page.locator('main h2')).toHaveCount(4 + 1); // section title + 4 services
    await expect(page.locator('main a[href$="/contact"]')).toHaveCount(4);
  });

  test(`/${locale}/portfolio lists 4 projects`, async ({ page }) => {
    await page.goto(`/${locale}/portfolio`);
    await expect(page.locator('main h2')).toHaveCount(4 + 1);
  });
}

test('portfolio shows the two galleries and the football project link', async ({ page }) => {
  await page.goto('/en/portfolio');
  await expect(page.locator('main a[href$="heli-1.png"]')).toHaveCount(1);
  await expect(page.locator('main a[href$="football-2.png"]')).toHaveCount(1);
  await expect(page.locator('main a[href="https://football-image-template-one.vercel.app/"]')).toHaveCount(1);
});
