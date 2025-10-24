import { expect, test } from '@playwright/test';
test.use({ storageState: 'auth.json' });
test.describe('Quản lý người dùng (Admin)', () => {
  test('Test Case: Thêm và xác minh người dùng mới', async ({ page }) => {

    // --- PHẦN 1: THÊM NGƯỜI DÙNG (Tương đương Codegen Part 2) ---
    console.log(`Đang thêm người dùng mới`);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByText('-- Select --').first().click();
    await page.getByRole('option', { name: 'Admin' }).click();
    await page.getByText('-- Select --').click();
    await page.getByRole('option', { name: 'Enabled' }).click();
    await page.getByRole('textbox', { name: 'Type for hints...' }).click();
    await page.getByRole('textbox', { name: 'Type for hints...' }).fill('anh');
    await page.getByText('tung tung tung sahur Nrgmzkvzdnq anh').click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('TestUser12345');
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('P@ssw0rd123');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('P@ssw0rd123');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible();

    // --- PHẦN 2: KIỂM TRA NGƯỜI DÙNG (Tương đương Codegen Part 3) ---
    console.log(`Đang tìm kiếm và xác minh người dùng`);
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill('TestUser12345');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('cell', { name:'TestUser12345' , exact: true })).toBeVisible();
    console.log('Xác minh thành công!');
  });
});
