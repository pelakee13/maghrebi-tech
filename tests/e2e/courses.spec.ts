import { expect, test } from '@playwright/test';

const SLUG = 'ai-session-1';

test('nav has a Courses link and the list shows all 10 sessions', async ({ page }) => {
  await page.goto('/en');
  const menuButton = page.locator('button[aria-controls=mobile-menu]');
  if (await menuButton.isVisible()) {
    await menuButton.click();
    await page.locator('#mobile-menu a', { hasText: 'Courses' }).click();
  } else {
    await page.locator('header nav a', { hasText: 'Courses' }).click();
  }
  await expect(page).toHaveURL(/\/en\/courses$/);
  // 10 session cards; only the 2 published ones are links
  await expect(page.getByText(/Where Did AI Come From/)).toBeVisible();
  await expect(page.getByText(/How Do Machines Learn/)).toBeVisible();
  await expect(page.getByText('Coming soon')).toHaveCount(8);
  await expect(page.locator('a[href="/en/courses/ai-session-3"]')).toHaveCount(0);
});

test('Persian list is RTL and has the Persian titles', async ({ page }) => {
  await page.goto('/fa/courses');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByText('هوش مصنوعی از کجا آمد')).toBeVisible();
  await expect(page.getByText('به‌زودی')).toHaveCount(8);
  await expect(page.locator('header nav a', { hasText: 'آموزش‌ها' })).toHaveCount(1);
});

for (const locale of ['en', 'fa'] as const) {
  test(`/${locale}/courses/${SLUG} shows the lesson and downloads the PDF`, async ({ page, request }) => {
    await page.goto(`/${locale}/courses/${SLUG}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('course-download').click()]);
    expect(download.suggestedFilename()).toBe(`ai-session-1-${locale}.pdf`);
    const res = await request.get(`/courses/ai-session-1-${locale}.pdf`);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/pdf');
  });
}

test('lesson shows slides and written notes without placeholder text', async ({ page }) => {
  await page.goto(`/en/courses/${SLUG}`);
  // Slide carousel renders the first slide image
  await expect(page.locator('figure img').first()).toHaveAttribute('src', /slide-01\.webp/);
  // Production never shows TODO placeholders (build-time check enforces this too)
  await expect(page.getByText(/TODO/)).toHaveCount(0);
});

test('coming-soon lesson pages 404', async ({ page }) => {
  const res = await page.goto('/en/courses/ai-session-3');
  expect(res?.status()).toBe(404);
});

test('language switcher keeps the same session and hreflang is paired', async ({ page }) => {
  await page.goto(`/en/courses/${SLUG}`);
  await expect(page.locator('link[rel=alternate][hreflang=fa]')).toHaveAttribute('href', `https://www.maghrebi.tech/fa/courses/${SLUG}`);
  await page.locator('a[hreflang=fa]').first().click();
  await expect(page).toHaveURL(new RegExp(`/fa/courses/${SLUG}$`));
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});

test('unknown course returns a localized 404', async ({ page }) => {
  const res = await page.goto('/en/courses/nope');
  expect(res?.status()).toBe(404);
});
