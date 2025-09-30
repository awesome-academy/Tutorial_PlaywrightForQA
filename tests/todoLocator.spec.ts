import { expect, test } from '@playwright/test';
test.describe('Bài tập TodoMVC - Sử dụng first, nth, filter', () => {

  test('Hoàn thành yêu cầu bài tập', async ({ page }) => {

    // --- 1. Truy cập trang ---
    await page.goto('https://demo.playwright.dev/todomvc');

    // --- Định nghĩa locator ---
    const newTodoInput = page.locator('.new-todo');
    // Locator này sẽ đại diện cho cả danh sách các công việc (<li>)
    const todoItems = page.locator('.todo-list li');

    // --- 2. Thêm 3 công việc: Task A, Task B, Task C ---
    await newTodoInput.fill('Task A');
    await newTodoInput.press('Enter');

    await newTodoInput.fill('Task B');
    await newTodoInput.press('Enter');

    await newTodoInput.fill('Task C');
    await newTodoInput.press('Enter');

    // Kiểm tra nhanh xem đã thêm đủ 3 tasks chưa
    await expect(todoItems).toHaveCount(3);
    console.log('Đã thêm 3 tasks: A, B, C');

    // --- 3. Tick chọn công việc thứ 2 (dùng .nth(1)) ---
    // .nth(0) là "Task A"
    // .nth(1) là "Task B"
    const secondTask = todoItems.nth(1);

    // Tìm checkbox bên trong phần tử thứ 2 và check
    await secondTask.locator('input[type="checkbox"]').check();

    // Kiểm tra xem task đó đã được đánh dấu hoàn thành (có class 'completed')
    await expect(secondTask).toHaveClass('completed');
    console.log('Đã tick chọn Task B (dùng .nth(1))');

    // --- 4. Kiểm tra task đầu tiên là Task A (dùng .first()) ---
    const firstTask = todoItems.first();

    // Kiểm tra nội dung text của task đầu tiên
    await expect(firstTask).toHaveText('Task A');
    console.log('Đã xác nhận Task A là task đầu tiên (dùng .first())');

    // --- 5. Dùng .filter() để chọn "Task C" và xóa nó ---
    // Tìm phần tử <li> có chứa text là "Task C"
    const taskC = todoItems.filter({ hasText: 'Task C' });

    // Nút xóa (button.destroy) bị ẩn, ta cần hover vào task trước khi click
    await taskC.hover();
    await taskC.locator('button.destroy').click();

    // Kiểm tra xem Task C đã thực sự bị xóa hay chưa
    // Danh sách giờ chỉ còn 2 phần tử
    await expect(todoItems).toHaveCount(2);
    // Và không còn thấy task nào tên là Task C
    await expect(todoItems.filter({ hasText: 'Task C' })).not.toBeVisible();
    console.log('Đã xóa Task C (dùng .filter())');
  });
});
