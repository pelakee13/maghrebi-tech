import { expect, test } from '@playwright/test';

for (const locale of ['fa', 'en']) {
  test(`/${locale}/services lists 4 services with a CTA`, async ({ page }) => {
    await page.goto(`/${locale}/services`);
    await expect(page.locator('main h2')).toHaveCount(4 + 1); // section title + 4 services
    await expect(page.locator('main a[href$="/contact"]')).toHaveCount(4);
  });

  test(`/${locale}/portfolio lists 3 projects`, async ({ page }) => {
    await page.goto(`/${locale}/portfolio`);
    await expect(page.locator('main h2')).toHaveCount(3 + 1);
  });
}
