import { expect, test } from '@playwright/test';

test('root redirects to /en even for Persian-language browsers', async ({ browser }) => {
  const ctx = await browser.newContext({ locale: 'fa-IR', extraHTTPHeaders: { 'Accept-Language': 'fa-IR,fa;q=0.9' } });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
  await ctx.close();
});

test('unprefixed paths go to the English version', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveURL(/\/en\/about$/);
});

test('home shows hero, 4 services, 4 featured projects and a contact CTA', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#main section').nth(1).locator('h3')).toHaveCount(4);
  await expect(page.locator('#main section').nth(2).locator('h3')).toHaveCount(4);
  await page.locator('#main').getByRole('link', { name: 'Contact me' }).first().click();
  await expect(page).toHaveURL(/\/en\/contact$/);
});

test('header shows the name without a trailing dot and both flags next to the switcher', async ({ page }) => {
  await page.goto('/en');
  const brand = page.locator('header a').first();
  expect((await brand.innerText()).trim()).toBe('Amin Maghrebi');
  await expect(page.locator('a[hreflang=fa] svg')).toHaveCount(2);
});
