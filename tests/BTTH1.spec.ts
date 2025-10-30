import { test, expect } from '@playwright/test';

test('userRegistration', async ({ page }) => {
  await page.goto('/01-xpath-register-page.html');
  await page.locator('#username').fill('Tung Quan');
  await page.locator('#email').fill('tungquan123@gmail.com');
  await page.locator('#male').click();
  await page.locator('#traveling').click();
  await page.locator('#interests>option[value="technology"]').click();
  await page.selectOption('#country','Canada');
  await page.locator('#dob').fill('2025-10-03');   
  await page.locator('#profile').setInputFiles('image_test/Nguyen Thi Bich Danh.png');
  await page.locator('#bio').fill('QuanNT');
  const slider = page.locator('#rating');
  await slider.fill('9');
  await page.check('#newsletter');
  await  page.locator('.switch>.slider.round').click();
  await page.getByText('Register').click();
  await expect(await page.locator('#male').isChecked()).toBe(false);
  await expect(await page.locator('#reading').isChecked()).toBe(false);
  await expect(await page.locator('#newsletter').isChecked()).toBe(false);
  await expect(page.getByRole('cell',{ name : 'Tung Quan'})).toBeVisible()
});
