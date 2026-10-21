import { expect, test } from '@playwright/test';

test('language switch keeps the page and flips direction and font', async ({ page }) => {
  await page.goto('/fa/services');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.locator('a[hreflang=en]').first().click();
  await expect(page).toHaveURL(/\/en\/services$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(font.toLowerCase()).toContain('inter');
  await page.locator('a[hreflang=fa]').first().click();
  await expect(page).toHaveURL(/\/fa\/services$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('article switcher goes to the counterpart article', async ({ page }) => {
  await page.goto('/en/blog/telegram-bot-for-sales');
  await page.locator('a[hreflang=fa]').first().click();
  await expect(page).toHaveURL(/\/fa\/blog\/telegram-bot-for-sales$/);
});

test('unsupported locale and unknown page show a localized 404', async ({ page }) => {
  const r1 = await page.goto('/fa/nope');
  expect(r1?.status()).toBe(404);
  await expect(page.getByText('صفحه پیدا نشد')).toBeVisible();
  await page.goto('/de/about');
  await expect(page.getByText('404')).toBeVisible();
});
