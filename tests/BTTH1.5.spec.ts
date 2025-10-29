import { test, expect } from '@playwright/test';

test('Bài 5 - Locator chaining trên trang TodoMVC', async ({ page }) => {
  // 1️⃣ Truy cập trang
  await page.goto('https://demo.playwright.dev/todomvc');

  // 2️⃣ Thêm 3 công việc: Task A, Task B, Task C
  const todoInput = page.locator('.new-todo');
  await todoInput.fill('Task A');
  await todoInput.press('Enter');
  await todoInput.fill('Task B');
  await todoInput.press('Enter');
  await todoInput.fill('Task C');
  await todoInput.press('Enter');

  // Xác nhận có 3 task
  const allTasks = page.locator('.todo-list li');
  await expect(allTasks).toHaveCount(3);

  // 3️⃣ Tick chọn công việc thứ 2 (Task B)
  await allTasks.nth(1).locator('.toggle').check();

  // 4️⃣ Kiểm tra task đầu tiên là Task A
  const firstTask = allTasks.first();
  await expect(firstTask).toContainText('Task A');

  // 5️⃣ Dùng .filter() để chọn task có nội dung "Task C" và xóa nó
  const taskC = allTasks.filter({ hasText: 'Task C' });
  await taskC.hover();
  await taskC.locator('.destroy').click(); // click nút X để xóa

  // Kiểm tra còn 2 task sau khi xóa
  await expect(allTasks).toHaveCount(2);
});
