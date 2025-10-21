import { test, expect, Page, Locator } from "@playwright/test";

/*
 BTTH 1-5: Locator

- Áp dụng nhóm hàm:
page.locator()
.first()
.nth(n)
.filter()

- Yêu cầu:
Tìm đúng phần tử trong danh sách
Tương tác với phần tử cụ thể (không bị nhầm)
Kiểm tra chính xác text

- Trang luyện tập:
Link: https://demo.playwright.dev/todomvc
Trang Todo List đơn giản (thêm công việc, đánh dấu hoàn thành, xóa...)

- Yêu cầu bài tập:

1.Truy cập trang
2. Thêm 3 công việc: Task A, Task B, Task C
3. Tick chọn công việc thứ 2 (dùng .nth(1))
4. Kiểm tra task đầu tiên là Task A (dùng .first())
5. Dùng .filter() để chọn task có nội dung "Task C" và xóa nó


*/
//Fn dùng chung

async function logHTML(locator: Locator, label: string = "Element") {
  const html = await locator.first().evaluate((el) => el.outerHTML);
  console.log(`\n==== HTML của ${label} ====`);
  console.log(html);
  console.log("==========================\n");
}

// Function: Truy cập trang và kiểm tra cơ bản
async function navigateAndVerifyPage(page: Page) {
  await page.goto("https://demo.playwright.dev/todomvc");

  // ✅ Kiểm tra URL linh hoạt nhưng chính xác
  await expect(page).toHaveURL(/https:\/\/demo\.playwright\.dev\/todomvc/);

  const todoInput = page.locator(".new-todo");
  await expect(todoInput).toBeVisible();
  await expect(todoInput).toHaveAttribute(
    "placeholder",
    "What needs to be done?"
  );

  return todoInput;
}

// Function: Thêm danh sách công việc
async function addTasks(
  page: Page,
  tasks: string[] = ["Task A", "Task B", "Task C"]
) {
  const todoInput = page.locator(".new-todo");

  for (const task of tasks) {
    await todoInput.fill(task);
    await todoInput.press("Enter");
  }

  const todoItems = page.locator(".todo-list li");
  await expect(todoItems).toHaveCount(tasks.length);

  return todoItems;
}

// Function: Thiết lập 3 công việc mặc định
async function setupThreeTasks(page: Page) {
  const todoInput = await navigateAndVerifyPage(page);
  const todoItems = await addTasks(page);

  // Kiểm tra nội dung từng task
  await expect(todoItems.nth(0)).toContainText("Task A");
  await expect(todoItems.nth(1)).toContainText("Task B");
  await expect(todoItems.nth(2)).toContainText("Task C");

  return { todoInput, todoItems };
}

// Function: Kiểm tra trạng thái completed của task
async function verifyTaskCompleted(
  todoItems: Locator,
  index: number,
  shouldBeCompleted: boolean = true
) {
  if (shouldBeCompleted) {
    await expect(todoItems.nth(index)).toHaveClass(/completed/);
  } else {
    await expect(todoItems.nth(index)).not.toHaveClass(/completed/);
  }
}

// Function: Kiểm tra các task còn lại sau khi xóa
async function verifyRemainingTasks(
  page: Page,
  todoItems: Locator,
  expectedTasks: string[]
) {
  await expect(todoItems).toHaveCount(expectedTasks.length);

  for (let i = 0; i < expectedTasks.length; i++) {
    await expect(todoItems.nth(i)).toContainText(expectedTasks[i]);
  }
}

test.describe("BTTH15 - Truy cập trang", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("TC00: Truy cập trang TodoMVC thành công", async ({ page }) => {
    // Sử dụng function dùng chung
    const todoInput = await navigateAndVerifyPage(page);

    // Kiểm tra title trang
    await expect(page).toHaveTitle(/TodoMVC/);

    // Kiểm tra header
    const header = page.locator("h1");
    await expect(header).toBeVisible();
    await expect(header).toContainText("todos");

    // Kiểm tra input có thể nhập được
    await todoInput.click();
    await expect(todoInput).toBeFocused();

    // Log HTML structure của input
    await logHTML(todoInput, "Input truy cập trang");

    console.log("✅ TC00: Truy cập trang TodoMVC thành công");
  });

  test("TC00.1: Kiểm tra giao diện ban đầu", async ({ page }) => {
    // Kiểm tra danh sách todo ban đầu trống
    const todoList = page.locator(".todo-list");
    await expect(todoList).not.toBeVisible();

    // Kiểm tra footer và main section không hiển thị ban đầu
    await expect(page.locator(".footer")).not.toBeVisible();
    await expect(page.locator(".main")).not.toBeVisible();

    // Kiểm tra chỉ có input và header hiển thị
    await expect(page.locator(".new-todo")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();

    console.log("✅ TC00.1: Giao diện ban đầu đúng như mong đợi");
  });
});

test.describe("BTTH15 - TC Thêm 3 công việc: Task A, Task B, Task C", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("TC01: Truy cập trang và thêm 3 công việc", async ({ page }) => {
    // Sử dụng function dùng chung để setup và kiểm tra
    const { todoInput, todoItems } = await setupThreeTasks(page);

    console.log("✅ TC01: Đã thêm 3 công việc thành công");
  });
});

test.describe("BTTH15 - TC Tick chọn công việc thứ 2 (dùng .nth(1))", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("TC02: Tick chọn công việc thứ 2 bằng .nth(1)", async ({ page }) => {
    // Setup: Sử dụng function dùng chung
    const { todoItems } = await setupThreeTasks(page);

    // Test chính: Tick chọn công việc thứ 2 (Task B) - sử dụng .nth(1)
    const secondTaskCheckbox = todoItems.nth(1).locator(".toggle");
    await secondTaskCheckbox.check();

    // Kiểm tra trạng thái completed bằng function dùng chung
    await verifyTaskCompleted(todoItems, 1, true); // Task thứ 2 completed
    await verifyTaskCompleted(todoItems, 0, false); // Task thứ 1 không completed
    await verifyTaskCompleted(todoItems, 2, false); // Task thứ 3 không completed

    console.log("✅ TC02: Đã tick công việc thứ 2 thành công bằng .nth(1)");
  });
});

test.describe("BTTH15 - TC Kiểm tra task đầu tiên là Task A (dùng .first())", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("TC03: Kiểm tra task đầu tiên bằng .first()", async ({ page }) => {
    // Setup: Sử dụng function dùng chung
    const { todoItems } = await setupThreeTasks(page);

    // Test chính: Kiểm tra task đầu tiên là Task A bằng .first()
    const firstTask = todoItems.first();
    await expect(firstTask).toContainText("Task A");

    // Kiểm tra bổ sung: So sánh .first() với .nth(0)
    await expect(todoItems.nth(0)).toContainText("Task A");

    // Kiểm tra HTML structure của first task
    await logHTML(firstTask, "Task đầu tiên (.first())");

    console.log(
      "✅ TC03: Task đầu tiên chính xác là Task A (sử dụng .first())"
    );
  });
});

test.describe("BTTH15 - TC Dùng .filter() để chọn task có nội dung 'Task C' và xóa nó", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("TC04: Tìm và xóa task bằng .filter()", async ({ page }) => {
    // Setup: Sử dụng function dùng chung
    const { todoItems } = await setupThreeTasks(page);

    // Test chính: Dùng .filter() để tìm task có nội dung "Task C"
    const taskCItem = todoItems.filter({ hasText: "Task C" });

    // Kiểm tra .filter() tìm đúng 1 element
    await expect(taskCItem).toHaveCount(1);
    await expect(taskCItem).toContainText("Task C");

    // Hover để hiện nút delete và click xóa
    await taskCItem.hover();
    const deleteButton = taskCItem.locator(".destroy");
    await deleteButton.click();

    // Kiểm tra kết quả bằng function dùng chung
    await verifyRemainingTasks(page, todoItems, ["Task A", "Task B"]);

    // Kiểm tra Task C đã bị xóa
    await expect(page.locator(".todo-list")).not.toContainText("Task C");

    console.log("✅ TC04: Đã tìm và xóa Task C thành công bằng .filter()");
  });
});
