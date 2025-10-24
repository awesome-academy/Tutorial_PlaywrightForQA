import { expect, test } from '@playwright/test';
test('Todo App - thêm, hoàn thành và xóa task', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Học Playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    // Kiểm tra: Task được thêm thành công
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('button', { name: 'Delete' }).click();
   // Kiểm tra: Task được xóa thành công
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
