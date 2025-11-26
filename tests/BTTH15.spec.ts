
import { test, expect } from '@playwright/test';

test('TodoMVC exercise', async ({ page }) => {

    // 1️⃣ Truy cập trang TodoMVC
    await page.goto('https://demo.playwright.dev/todomvc');

    const todoInput = page.getByPlaceholder('What needs to be done?');

    // 2️⃣ Thêm 3 công việc: Task A, Task B, Task C
    await todoInput.fill('Task A');
    await todoInput.press('Enter');

    await todoInput.fill('Task B');
    await todoInput.press('Enter');

    await todoInput.fill('Task C');
    await todoInput.press('Enter');

    const todoList = page.locator('.todo-list li');

    // 3️⃣ Tick chọn công việc thứ 2 (index = 1 → Task B)
    await todoList.nth(1).locator('.toggle').click();

    // 4️⃣ Kiểm tra task đầu tiên là "Task A"
    await expect(todoList.first()).toContainText('Task A');

    // 5️⃣ Dùng filter() để chọn task có nội dung "Task C" và xóa nó
    const taskC = todoList.filter({ hasText: 'Task C' });
    await taskC.hover();
    await taskC.locator('.destroy').click();

    // Kiểm tra Task C đã bị xóa
    const items = await todoList.allTextContents();
    expect(items).not.toContain('Task C');

});
