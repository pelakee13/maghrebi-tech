import { expect, test } from '@playwright/test';

test('blog list shows the articles and they open', async ({ page }) => {
  await page.goto('/en/blog');
  await expect(page.locator('main h3')).toHaveCount(6); // starter + 4 articles + Heli case study
  await page.locator('main h3 a[href="/en/blog/telegram-bot-for-sales"]').click();
  await expect(page).toHaveURL(/\/en\/blog\/telegram-bot-for-sales$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Telegram bot');
  await expect(page.locator('time')).toHaveAttribute('datetime', '2026-10-01');
});

test('Heli case study is published in both locales', async ({ page }) => {
  await page.goto('/en/blog');
  await expect(page.locator('main h3 a[href="/en/blog/heli-beauty-studio-case-study"]')).toBeVisible();
  await page.locator('main h3 a[href="/en/blog/heli-beauty-studio-case-study"]').click();
  await expect(page).toHaveURL(/\/en\/blog\/heli-beauty-studio-case-study$/);
  await expect(page.locator('time')).toHaveAttribute('datetime', '2026-11-09');

  await page.goto('/fa/blog');
  await expect(page.locator('main h3 a[href="/fa/blog/heli-beauty-studio-case-study"]')).toBeVisible();
});

test('Persian article renders RTL', async ({ page }) => {
  await page.goto('/fa/blog/telegram-bot-for-sales');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});
