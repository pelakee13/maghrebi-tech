import { expect, test } from '@playwright/test';

const paths = ['', '/about', '/services', '/portfolio', '/blog', '/resume', '/contact'];

for (const locale of ['fa', 'en']) {
  for (const p of paths) {
    test(`seo tags on /${locale}${p}`, async ({ page }) => {
      await page.goto(`/${locale}${p}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://www.maghrebi.tech/${locale}${p}`);
      await expect(page.locator('link[rel=alternate][hreflang=fa]')).toHaveAttribute('href', `https://www.maghrebi.tech/fa${p}`);
      await expect(page.locator('link[rel=alternate][hreflang=en]')).toHaveAttribute('href', `https://www.maghrebi.tech/en${p}`);
      await expect(page.locator('link[rel=alternate][hreflang=x-default]')).toHaveAttribute('href', `https://www.maghrebi.tech/en${p}`);
      expect((await page.title()).length).toBeGreaterThan(2);
    });
  }
}
