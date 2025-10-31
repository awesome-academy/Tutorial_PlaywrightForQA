import { test, expect } from '@playwright/test';

/* ============================================================
 🧩 PHẦN 1: YÊU CẦU ĐỀ BÀI
   - Truy cập trang TodoMVC
   - Thêm 1 task mới
   - Đánh dấu hoàn thành
   - Xóa task
   - Kèm theo expect kiểm tra thêm / xóa thành công
============================================================ */

test('Todo App - Thêm, hoàn thành và xóa 1 task', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const taskName = 'Học Playwright';
  const input = page.getByRole('textbox', { name: 'What needs to be done?' });

  // Thêm task mới
  await input.fill(taskName);
  await input.press('Enter');

  // ✅ Kiểm tra: task được thêm thành công
  const todoItem = page.locator('.todo-list li');
  await expect(todoItem).toHaveCount(1);
  await expect(todoItem.first()).toContainText(taskName);

  // Đánh dấu hoàn thành
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();

  // ✅ Kiểm tra: task có class "completed"
  await expect(todoItem.first()).toHaveClass(/completed/);

  // Xóa task
  await page.getByRole('button', { name: 'Delete' }).click();

  // ✅ Kiểm tra: task đã bị xóa
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});


/* ============================================================
 🚀 PHẦN 2: NÂNG CAO MỞ RỘNG
   - Thêm nhiều task
   - Kiểm tra số lượng task còn lại
   - Sử dụng bộ lọc “Active” / “Completed”
============================================================ */

test('Todo App - Thêm nhiều task và lọc theo trạng thái', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const tasks = ['Task A', 'Task B', 'Task C'];
  const input = page.getByRole('textbox', { name: 'What needs to be done?' });

  // Thêm nhiều task
  for (const name of tasks) {
    await input.fill(name);
    await input.press('Enter');
  }

  // ✅ Kiểm tra: có 3 task trong danh sách
  const todoItems = page.locator('.todo-list li');
  await expect(todoItems).toHaveCount(3);

  // Đánh dấu Task B hoàn thành
  await todoItems.nth(1).locator('.toggle').check();
  await expect(todoItems.nth(1)).toHaveClass(/completed/);

  // Lọc "Active" → chỉ còn Task A và C
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(2);
  await expect(page.locator('.todo-list li')).toContainText(['Task A', 'Task C']);

  // Lọc "Completed" → chỉ còn Task B
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li').first()).toContainText('Task B');
});
