import { expect, test } from '@playwright/test';

test('blog list shows the starter article and it opens', async ({ page }) => {
  await page.goto('/en/blog');
  await expect(page.locator('main h3')).toHaveCount(1);
  await page.locator('main h3 a').click();
  await expect(page).toHaveURL(/\/en\/blog\/telegram-bot-for-sales$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Telegram bot');
  await expect(page.locator('time')).toHaveAttribute('datetime', '2026-10-01');
});

test('Persian article renders RTL', async ({ page }) => {
  await page.goto('/fa/blog/telegram-bot-for-sales');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});
