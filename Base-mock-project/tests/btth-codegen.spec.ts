import { test, expect } from "../src/fixtures/baseFixtures";
test.describe("BTTH Codegen - Cơ bản", () => {
  test("test", async ({ page }) => {
    //Open page
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    //Thêm task
    await page.getByRole("textbox", { name: "What needs to be done?" }).click();
    await page
      .getByRole("textbox", { name: "What needs to be done?" })
      .fill("Học Playwright");
    await page
      .getByRole("textbox", { name: "What needs to be done?" })
      .press("Enter");

    //Kiểm tra task thêm thành công
    await expect(page.locator("data-testid=todo-title")).toHaveText(
      "Học Playwright"
    );

    //Tick chọn task đã thêm
    await page.getByRole("checkbox", { name: "Toggle Todo" }).check();

    //Xóa task đã thêm
    await page.getByRole("button", { name: "Delete" }).click();

    //Kiểm tra task đã xóa thành công
    await expect(page.locator("data-testid=todo-item")).toHaveCount(0);
    await page.close();
  });
});

//-------------------------------------------------------------
test.describe("BTTH Codegen - Bổ sung", () => {
  test("test", async ({ page }) => {
    //Open page
    await page.goto("https://demo.playwright.dev/todomvc/#/");

    //-------------------------------
    //Thêm task 1+2+3
    for (let i = 1; i <= 3; i++) {
      await page
        .getByRole("textbox", { name: "What needs to be done?" })
        .click();
      await page
        .getByRole("textbox", { name: "What needs to be done?" })
        .fill("Task " + i);
      await page
        .getByRole("textbox", { name: "What needs to be done?" })
        .press("Enter");
    }
    //-------------------------------
    // Kiểm tra xem đã thêm được bao nhiêu task
    const todoItems = page.locator('[data-testid="todo-item"]');
    console.log("Số lượng task đã thêm là:" + (await todoItems.count()));

    for (let i = 0; i < (await todoItems.count()); i++) {
      console.log(await todoItems.nth(i).innerText());
    }

    //-------------------------------
    //   Tick chọn 1 task, lọc các task Active và Completed
    const checkboxes = page.getByRole("checkbox", { name: "Toggle Todo" });
    await checkboxes.nth(0).check(); //Chec chọn 1 task

    //Task active
    const active = page.locator('.filters a[href="#/active"]');
    await active.click();
    const taskActive = page.locator('[data-testid="todo-item"]');
    console.log(
      "Tick chon 1 task, Số task Active là:" +
        (await taskActive.count()) +
        " Danh sách task: "
    );
    for (let i = 0; i < (await taskActive.count()); i++) {
      console.log(await taskActive.nth(i).innerText());
    }
    console.log("Số task Active là:" + (await taskActive.count()));

    //Task completed
    const completed = page.locator('.filters a[href="#/completed"]');
    await completed.click();
    const taskCompleted = page.locator('[data-testid="todo-item"]');
    console.log(
      "Số task Completed là:" +
        (await taskCompleted.count()) +
        " Danh sách task: "
    );
    for (let i = 0; i < (await taskCompleted.count()); i++) {
      console.log(await taskCompleted.nth(i).innerText());
    }
  });
});


// 🎯 Mục tiêu bài tập
// Dùng codegen để tạo script tự động cho việc:
// Truy cập vào trang: https://demo.playwright.dev/todomvc
// Tạo một task mới trong danh sách việc cần làm.
// Đánh dấu task đó là đã hoàn thành.
// Xóa task đó.
// Bổ sung expect vào script để tạo testcase hoàn chỉnh:
// Kiểm tra task được thêm thành công trên list
// Kiểm tra task được xóa thành công trên list

// 🎯 mở rộng
// Sau khi làm bài tập này, bạn có thể thử:
// Thêm nhiều task cùng lúc.
// Kiểm tra bộ lọc "Active", "Completed".
// Kết hợp expect để kiểm tra số lượng task.
