import { expect, test } from '@playwright/test';

test('root redirects to /fa even for English browsers', async ({ browser }) => {
  const ctx = await browser.newContext({ locale: 'en-US', extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' } });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/fa$/);
  await ctx.close();
});

test('home shows hero, 4 services, 3 featured projects and a contact CTA', async ({ page }) => {
  await page.goto('/fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#main section').nth(1).locator('h3')).toHaveCount(4);
  await expect(page.locator('#main section').nth(2).locator('h3')).toHaveCount(3);
  await page.locator('#main').getByRole('link').filter({ hasText: 'تماس با من' }).first().click();
  await expect(page).toHaveURL(/\/fa\/contact$/);
});
