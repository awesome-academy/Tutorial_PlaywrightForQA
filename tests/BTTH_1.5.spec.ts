import { test, expect } from '@playwright/test';

test('BTTH 1.5', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // Thêm 3 công việc: Task A, Task B, Task C
  await page.locator('input[class="new-todo"]').fill('Task A');
  await page.locator('input[class="new-todo"]').press('Enter');
  await page.locator('input[class="new-todo"]').fill('Task B');
  await page.locator('input[class="new-todo"]').press('Enter');
  await page.locator('input[class="new-todo"]').fill('Task C');
  await page.locator('input[class="new-todo"]').press('Enter');

  // Tick chọn công việc thứ 2 (dùng .nth(1))
  await page.locator('input[class="toggle"]').nth(1).check();

  // Kiểm tra task đầu tiên là Task A (dùng .first())
  await expect(page.locator('ul[class="todo-list"] li').first()).toHaveText('Task A');

  // Dùng .filter() để chọn task có nội dung "Task C", hover chuột và xóa nó
    await page.locator('ul[class="todo-list"] li').filter({ hasText: 'Task C' }).hover();
    await page.locator('ul[class="todo-list"] li').filter({ hasText: 'Task C' }).locator('button[class="destroy"]').click();
    
});