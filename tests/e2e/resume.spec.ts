import { expect, test } from '@playwright/test';

test('about page renders', async ({ page }) => {
  await page.goto('/en/about');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('About');
});

test('English resume downloads a PDF', async ({ page }) => {
  await page.goto('/en/resume');
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('resume-download').click()]);
  expect(download.suggestedFilename()).toBe('amin-maghrebi-resume-en.pdf');
});

test('Persian download button is hidden while no Persian PDF exists', async ({ page }) => {
  const res = await page.request.get('/resume/amin-maghrebi-resume-fa.pdf');
  await page.goto('/fa/resume');
  const present = res.status() === 200;
  await expect(page.getByTestId('resume-download')).toHaveCount(present ? 1 : 0);
});
