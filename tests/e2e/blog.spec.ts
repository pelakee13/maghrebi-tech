import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { expect, test } from '@playwright/test';
import { isPublished } from '../../lib/content-utils';

/** Articles the blog list renders, counted from the same content files the
 *  page reads — so publishing a new article cannot break this test. */
function publishedArticleCount(locale: string): number {
  const dir = path.join(process.cwd(), 'content', locale, 'blog');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const data = matter(fs.readFileSync(path.join(dir, f), 'utf8')).data as {
        draft?: boolean;
        date: string | Date;
      };
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
      return { draft: data.draft, date };
    })
    .filter((meta) => isPublished(meta)).length;
}

test('blog list shows the articles and they open', async ({ page }) => {
  await page.goto('/en/blog');
  const expected = publishedArticleCount('en');
  expect(expected).toBeGreaterThan(0);
  await expect(page.locator('main h3')).toHaveCount(expected);
  const hrefs = (
    await page
      .locator('main h3 a')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')))
  ).filter((href): href is string => href !== null);
  expect(hrefs).toHaveLength(expected);
  for (const href of hrefs) {
    expect(href).toMatch(/^\/en\/blog\/[a-z0-9-]+$/);
    await page.goto(href);
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
  await page.goto('/en/blog/telegram-bot-for-sales');
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
