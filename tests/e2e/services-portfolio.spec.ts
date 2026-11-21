import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

/** Expected counts are derived from the content files, not hard-coded. */
function countFiles(dir: string): number {
  return fs.readdirSync(path.join(process.cwd(), 'content', 'en', dir)).filter((f) => f.endsWith('.mdx')).length;
}

const serviceCount = countFiles('services');
const projectCount = countFiles('projects');

for (const locale of ['fa', 'en']) {
  test(`/${locale}/services lists ${serviceCount} services with CTAs`, async ({ page }) => {
    await page.goto(`/${locale}/services`);
    await expect(page.locator('main h1')).toHaveCount(1);
    // Service card titles + pricing section (the page title is the h1).
    await expect(page.locator('main h2')).toHaveCount(serviceCount + 1);
    // One /contact?service=<id> link per service card + the plain pricing CTA.
    await expect(page.locator('main a[href*="/contact?service="]')).toHaveCount(serviceCount);
    await expect(page.locator('main a[href$="/contact"]')).toHaveCount(1);
    // The website-design card also links to its example project.
    await expect(page.locator('main a[href$="/portfolio#maghrebi-tech"]')).toHaveCount(1);
  });

  test(`/${locale}/portfolio lists ${projectCount} projects with anchors`, async ({ page }) => {
    await page.goto(`/${locale}/portfolio`);
    await expect(page.locator('main h1')).toHaveCount(1);
    // One h2 per project card title (the page title is the h1).
    await expect(page.locator('main h2')).toHaveCount(projectCount);
    await expect(page.locator('#heli-beauty-studio')).toHaveCount(1);
    await expect(page.locator('#maghrebi-tech')).toHaveCount(1);
    await expect(page.locator('main a[href$="/blog/heli-beauty-studio-case-study"]')).toHaveCount(1);
    await expect(page.locator('main a[href="https://github.com/pelakee13/maghrebi-tech"]')).toHaveCount(1);
    // The maghrebi.tech entry closes the buyer's journey: one CTA to a
    // website-design inquiry with the topic preselected.
    await expect(page.locator('#maghrebi-tech a[href$="/contact?service=website-design"]')).toHaveCount(1);
  });
}

test('portfolio shows the two galleries and the football project link', async ({ page }) => {
  await page.goto('/en/portfolio');
  await expect(page.locator('main a[href$="heli-1.png"]')).toHaveCount(1);
  await expect(page.locator('main a[href$="football-2.png"]')).toHaveCount(1);
  await expect(page.locator('main a[href="https://football-image-template-one.vercel.app/"]')).toHaveCount(1);
});

test('portfolio anchor lands on the Heli entry', async ({ page }) => {
  await page.goto('/en/portfolio#heli-beauty-studio');
  await expect(page.locator('#heli-beauty-studio')).toBeVisible();
});

test('home running feature links to the running portfolio entry in the same language', async ({ page }) => {
  // The running feature is the second section; scope the assertions to it.
  await page.goto('/en');
  await expect(page.locator('#main section').nth(1).locator('h2')).toHaveText('Bilingual running workout log app');
  await expect(
    page.locator('#main section').nth(1).locator('a[href="/en/portfolio#running-app"]'),
  ).toHaveCount(1);
  await page.goto('/fa');
  await expect(page.locator('#main section').nth(1).locator('h2')).toHaveText('اپلیکیشن دوزبانهٔ ثبت تمرین‌های دویدن');
  await expect(
    page.locator('#main section').nth(1).locator('a[href="/fa/portfolio#running-app"]'),
  ).toHaveCount(1);
});
