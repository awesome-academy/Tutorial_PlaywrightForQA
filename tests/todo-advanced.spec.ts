import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

// KỊCH BẢN 1: Thêm nhiều task và kiểm tra số lượng
test('Kịch bản 1: Thêm nhiều task và kiểm tra list', async ({ page }) => {
  const newTodo = page.locator('.new-todo');

  await newTodo.fill('Học Playwright Codegen');
  await newTodo.press('Enter');
  await newTodo.fill('Viết test cho bộ lọc');
  await newTodo.press('Enter');
  await newTodo.fill('Chạy test và báo cáo');
  await newTodo.press('Enter');

  const tasks = page.locator('.todo-list li');
  await expect(tasks).toHaveCount(3);
  await expect(tasks).toHaveText([
    'Học Playwright Codegen',
    'Viết test cho bộ lọc',
    'Chạy test và báo cáo'
  ]);
});

// KỊCH BẢN 2: Kiểm tra bộ lọc "Active" và "Completed"
test('Kịch bản 2: Kiểm tra các bộ lọc (Filters)', async ({ page }) => {
  const newTodo = page.locator('.new-todo');
  const tasks = page.locator('.todo-list li');

  await newTodo.fill('Task 1 (Active)');
  await newTodo.press('Enter');
  await newTodo.fill('Task 2 (Completed)');
  await newTodo.press('Enter');
  await newTodo.fill('Task 3 (Active)');
  await newTodo.press('Enter');
  await expect(tasks).toHaveCount(3);

  // Tìm task "Task 2 (Completed)" và click vào checkbox
  const taskLocator = page.getByRole('listitem').filter({ hasText: 'Task 2 (Completed)' });
  await taskLocator.getByLabel('Toggle Todo').check();
  const completedTasks = page.getByRole('listitem').filter({ has: page.getByRole('checkbox', { checked: true })});
  await expect(completedTasks).toHaveCount(1);
  await expect(completedTasks).toHaveText('Task 2 (Completed)');

  // --- 1. KIỂM TRA BỘ LỌC "ACTIVE" ---
  console.log('Đang kiểm tra filter: Active');
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(tasks).toHaveCount(2);
  await expect(tasks).toHaveText([
    'Task 1 (Active)',
    'Task 3 (Active)'
  ]);

  // --- 2. KIỂM TRA BỘ LỌC "COMPLETED" ---
  console.log('Đang kiểm tra filter: Completed');
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(tasks).toHaveCount(1);
  await expect(tasks).toHaveText('Task 2 (Completed)');

  // --- 3. KIỂM TRA BỘ LỌC "ALL" ---
  console.log('Đang kiểm tra filter: All');
  await page.getByRole('link', { name: 'All' }).click();
  await expect(tasks).toHaveCount(3);
});
