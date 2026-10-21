import { expect, test } from '@playwright/test';

async function fill(page: import('@playwright/test').Page, name: string, email: string, message: string) {
  await page.fill('#name', name);
  await page.fill('#email', email);
  await page.fill('#message', message);
}

test('invalid input shows localized field errors and keeps values', async ({ page }) => {
  await page.goto('/fa/contact');
  await page.waitForTimeout(3300); // minimum fill time
  await fill(page, 'A', 'bad', 'short');
  await page.getByRole('button', { name: 'ارسال پیام' }).click();
  await expect(page.getByText('نام باید حداقل ۲ نویسه باشد.')).toBeVisible();
  await expect(page.getByText('ایمیل معتبر وارد کنید.')).toBeVisible();
  await expect(page.locator('#message')).toHaveValue('short');
});

test('valid submit shows the success message', async ({ page }) => {
  await page.goto('/en/contact');
  await page.waitForTimeout(3300);
  await fill(page, 'Test User', 'test@example.com', 'This is a valid message for the test.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toContainText('Your message was received');
});

test('filled honeypot gives a generic error', async ({ page }) => {
  await page.goto('/en/contact');
  await page.waitForTimeout(3300);
  await fill(page, 'Bot', 'bot@example.com', 'Spam spam spam spam spam');
  await page.evaluate(() => {
    (document.querySelector('input[name=website]') as HTMLInputElement).value = 'http://spam';
  });
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.locator('form [role=alert]')).toContainText('Could not send');
});
