import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

/** Expected counts are derived from the content files, not hard-coded. */
function countServiceFiles(): number {
  return fs.readdirSync(path.join(process.cwd(), 'content', 'en', 'services')).filter((f) => f.endsWith('.mdx')).length;
}

function countFeaturedProjects(): number {
  const dir = path.join(process.cwd(), 'content', 'en', 'projects');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => {
      const text = fs.readFileSync(path.join(dir, f), 'utf8');
      return /^featured:\s*true\s*$/m.test(text) && !/^consumer:\s*true\s*$/m.test(text);
    }).length;
}

const serviceCount = countServiceFiles();
const featuredCount = countFeaturedProjects();

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

test(`home shows hero, ${serviceCount} services, tech stack, ${featuredCount} featured projects and a contact CTA`, async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // Sections: 0 Hero, 1 Running feature, 2 services, 3 tech stack, 4 projects.
  await expect(page.locator('#main section').nth(2).locator('h3')).toHaveCount(serviceCount);
  await expect(page.locator('#main section').nth(4).locator('h3')).toHaveCount(featuredCount);
  await page.locator('#main').getByRole('link', { name: 'Discuss my project' }).first().click();
  await expect(page).toHaveURL(/\/en\/contact$/);
});

test('header shows the name without a trailing dot and both flags next to the switcher', async ({ page }) => {
  await page.goto('/en');
  const brand = page.locator('header a').first();
  expect((await brand.innerText()).trim()).toBe('Amin Maghrebi');
  await expect(page.locator('a[hreflang=fa] svg')).toHaveCount(2);
});

test('hero offers website design above the fold in both languages', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('websites');
  await page.goto('/fa');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('طراحی سایت');
});

test('Persian hero uses the new Vazirmatn copy without the eyebrow', async ({ page }) => {
  await page.goto('/fa');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('طراحی سایت و اتوماسیون برای کسب‌وکارها');
  await expect(page.getByText('برای معرفی خدماتتان وب‌سایت طراحی می‌کنم و برای کارهایی مثل ثبت سفارش و نوبت‌دهی، ربات تلگرام می‌سازم.')).toBeVisible();
  await expect(page.getByText('طراحی وب‌سایت · ربات تلگرام · اتوماسیون')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'دیدن نمونه‌کارها' })).toBeVisible();
  await page.goto('/en');
  await expect(page.getByText('Website design · Telegram bots · automation')).toHaveCount(1);
});

test('Persian hero renders Vazirmatn at weight 600 with the primary CTA above the fold on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 844 });
  await page.goto('/fa');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toBeVisible();
  const style = await h1.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { family: cs.fontFamily, weight: cs.fontWeight, size: cs.fontSize, lineHeight: cs.lineHeight };
  });
  expect(style.family).toContain('vazirmatn');
  expect(style.weight).toBe('600');
  // clamp() resolves with sub-pixel float error (e.g. 44.0002px).
  expect(parseFloat(style.size)).toBeCloseTo(30, 0);
  expect(parseFloat(style.lineHeight)).toBeCloseTo(44, 0);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('600 30px vazirmatn'))).toBe(true);
  const cta = page.getByRole('link', { name: 'دربارهٔ پروژه‌ام صحبت کنیم' }).first();
  const box = await cta.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThanOrEqual(844);
});

test('mobile menu closes with Escape and returns focus to the menu button', async ({ page }) => {
  const width = page.viewportSize()?.width ?? 0;
  test.skip(width >= 1280, 'collapsible menu only below the xl breakpoint');
  await page.goto('/en');
  // The button's accessible name flips Menu <-> Close when toggled, so locate
  // it by the stable aria-controls instead of its name.
  const menuButton = page.locator('button[aria-controls="mobile-menu"]');
  await menuButton.click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toBeFocused();
});
