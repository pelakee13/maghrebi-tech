import { expect, test } from '@playwright/test';

const SLUG = 'ai-session-1';

test('nav has a Courses link and the list shows the sample session', async ({ page }) => {
  await page.goto('/en');
  // Desktop shows the inline nav; on small screens the same links live in the mobile menu.
  const menuButton = page.locator('button[aria-controls=mobile-menu]');
  if (await menuButton.isVisible()) {
    await menuButton.click();
    await page.locator('#mobile-menu a', { hasText: 'Courses' }).click();
  } else {
    await page.locator('header nav a', { hasText: 'Courses' }).click();
  }
  await expect(page).toHaveURL(/\/en\/courses$/);
  // first h2 is the page title; the rest are course cards
  await expect(page.locator('main h2')).toHaveCount(2);
  await expect(page.locator('main h2').nth(1)).toContainText('Where Did AI Come From');
});

test('Persian list is RTL and has the Persian title and nav label', async ({ page }) => {
  await page.goto('/fa/courses');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('main h2').nth(1)).toContainText('هوش مصنوعی از کجا آمد');
  await expect(page.locator('header nav a', { hasText: 'آموزش‌ها' })).toHaveCount(1);
});

for (const locale of ['en', 'fa'] as const) {
  test(`/${locale}/courses/${SLUG} shows details and downloads the PDF`, async ({ page, request }) => {
    await page.goto(`/${locale}/courses/${SLUG}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('time')).toHaveAttribute('datetime', '2026-10-22');
    const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('course-download').click()]);
    expect(download.suggestedFilename()).toBe(`ai-session-1-${locale}.pdf`);
    const res = await request.get(`/courses/ai-session-1-${locale}.pdf`);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/pdf');
  });
}

test('language switcher keeps the same session and hreflang is paired', async ({ page }) => {
  await page.goto(`/en/courses/${SLUG}`);
  await expect(page.locator('link[rel=alternate][hreflang=fa]')).toHaveAttribute('href', `https://maghrebi.tech/fa/courses/${SLUG}`);
  await page.locator('a[hreflang=fa]').first().click();
  await expect(page).toHaveURL(new RegExp(`/fa/courses/${SLUG}$`));
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('unknown course returns a localized 404', async ({ page }) => {
  const res = await page.goto('/en/courses/nope');
  expect(res?.status()).toBe(404);
});
