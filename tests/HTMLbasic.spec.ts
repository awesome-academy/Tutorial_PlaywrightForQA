import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');
    //fill textbox username
    await page.getByRole('textbox', { name: 'Username:' }).click();
    await page.getByRole('textbox', { name: 'Username:' }).fill('vũ thị lụa');
    //fill textbox email
    await page.getByRole('textbox', { name: 'Email:' }).click();
    await page.getByRole('textbox', { name: 'Email:' }).fill('vu.thi.lua@sun-asterisk.com');
    //select radio
    await page.getByRole('radio', { name: 'Female' }).check();
    await expect(page.getByRole('radio', { name: 'Female' })).toBeChecked();
    //select checkbox
    await page.getByRole('checkbox', { name: 'Reading' }).check();
    await expect(page.getByRole('checkbox', { name: 'Reading' })).toBeChecked();
    //select dropdown
    await page.getByLabel('Interests:').selectOption('music');
    const select = await page.getByLabel('Interests:').inputValue();
    await expect(select).toBe('music');

    await page.getByLabel('Country:').selectOption('canada');
    const selectcontry = await page.getByLabel('Country:').inputValue();
    await expect(selectcontry).toBe('canada');

    // fill date of birth
    await page.getByRole('textbox', { name: 'Date of Birth:' }).fill('1996-10-26');
    await expect(page.getByRole('textbox', { name: 'Date of Birth:' })).toHaveValue('1996-10-26');

    //click register
    await page.getByRole('button', { name: 'Register' }).click();

     const lastRow = page.locator('#userTable tbody tr').last();

// Username nằm ở td thứ 2 (index 1)
await expect(lastRow.locator('td').nth(1)).toHaveText('vũ thị lụa');

// Email nằm ở td thứ 3 (index 2)
await expect(lastRow.locator('td').nth(2)).toHaveText('vu.thi.lua@sun-asterisk.com');

// Thông tin khác (Gender, Hobbies, Country, DOB) nằm ở td thứ 4 (index 3)
await expect(lastRow.locator('td').nth(3)).toContainText('Gender: female');
await expect(lastRow.locator('td').nth(3)).toContainText('Hobbies: reading');
await expect(lastRow.locator('td').nth(3)).toContainText('Country: canada');
await expect(lastRow.locator('td').nth(3)).toContainText('Date of Birth: 1996-10-26');

// Actions nằm ở td thứ 5 (index 4) nếu cần

});

