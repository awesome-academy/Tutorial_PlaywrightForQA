import { test, expect } from "../src/fixtures/baseFixtures";

test.describe("Bai thuc hanh 1.5", () => {
  test("Add task, complete, delete", async ({ page }) => {
    //Add task
    const newTask = page.locator(".new-todo");
    const listTasks = page.locator('.todo-list li[data-testid="todo-item"]');

    await page.goto("https://demo.playwright.dev/todomvc/#/");

    //Input data: Task A, B, C
    await newTask.fill("Task A");
    await newTask.press("Enter");
    await newTask.fill("Task B");
    await newTask.press("Enter");
    await newTask.fill("Task C");
    await newTask.press("Enter");

    //Kiểm tra list đã nhập đúng 3 task
    //const listTasks = await page.locator('ul.todo-list li[data-testid="todo-item"]');

    for (let i = 0; i < (await listTasks.count()); i++) {
      const todoTask = await listTasks
        .nth(i)
        .locator('label[data-testid="todo-title"]')
        .innerText();
      console.log(todoTask);
    }

    //Tick chọn Task số 2 (Task B)
    const task2 = listTasks.nth(1);
    await task2.locator(".toggle").check();
    console.log("Đã tick chọn Task B");

    //Kiểm tra task đầu tiên là Task A
    const firstTask = listTasks.first();
    await expect(firstTask).toContainText("Task A");
    console.log("Task đầu tiên là Task A");

    //Tìm task C và xóa nó
    const taskC = listTasks.filter({ hasText: "Task C" });
    await taskC.hover();
    const deleteC = taskC.locator(".destroy");
    await deleteC.click();
    console.log("Đã xóa Task C");

    await page.waitForTimeout(2000);

    page.close();
  });
});

// 🔗 Trang luyện tập:
// Link: https://demo.playwright.dev/todomvc
// Trang Todo List đơn giản (thêm công việc, đánh dấu hoàn thành, xóa...)

// 📝 Yêu cầu bài tập:
// Truy cập trang
// Thêm 3 công việc: Task A, Task B, Task C
// Tick chọn công việc thứ 2 (dùng .nth(1))
// Kiểm tra task đầu tiên là Task A (dùng .first())
// Dùng .filter() để chọn task có nội dung "Task C" và xóa nó
