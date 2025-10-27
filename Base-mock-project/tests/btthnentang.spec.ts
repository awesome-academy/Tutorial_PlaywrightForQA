import { test, expect } from '../src/fixtures/baseFixtures';

test('test', async ({ page }) => {
  await page.goto('https://www.w3schools.com/');
  const textBox = page.getByPlaceholder('Search our tutorials, e.g. HTML');
  const button =page.getByRole('button', { name: '' });
  await textBox.click();
  await textBox.fill('Playwright document');
  await button.click();
  //await page.waitForTimeout(500);
  await expect(page).toHaveURL(/Playwright%20document/);
  page.close();
});