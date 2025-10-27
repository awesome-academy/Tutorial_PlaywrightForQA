/*
Dùng codegen để tạo script tự động cho việc:
Truy cập vào trang: https://demo.playwright.dev/todomvc
Tạo một task mới trong danh sách việc cần làm.
Đánh dấu task đó là đã hoàn thành.
Xóa task đó.
Bổ sung expect vào script để tạo testcase hoàn chỉnh:
Kiểm tra task được thêm thành công trên list
Kiểm tra task được xóa thành công trên list


✅ Bước 1: Mở codegen
Chạy lệnh sau trong terminal của bạn:
npx playwright codegen https://demo.playwright.dev/todomvc
Trình duyệt và cửa sổ code sẽ xuất hiện.

✅ Bước 2: Thực hiện các thao tác sau trên trang:
Trong ô "What needs to be done?", gõ: Học Playwright
Nhấn Enter → task sẽ được thêm vào danh sách.
Click vào checkbox bên trái để đánh dấu task là đã hoàn thành.
Di chuột và click nút X (destroy) bên phải task để xóa nó khỏi danh sách.
(Trong quá trình này, quan sát cửa sổ code — bạn sẽ thấy mã Playwright được sinh tự động theo mọi thao tác của bạn.)

✅ Bước 3: Dừng và lưu lại mã test
Khi hoàn thành:
Copy đoạn mã đã sinh ra.
Lưu vào file todo.spec.ts trong thư mục tests/.

✅ Bước 4: Chạy lại test bạn vừa tạo
npx playwright test tests/todo.spec.ts

*/

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.locator("html").click();
  await page.getByRole("textbox", { name: "What needs to be done?" }).click();
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .fill("Học Pl");
  await page.getByRole("textbox", { name: "What needs to be done?" }).click();
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .fill("Học Playwright");
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .press("Enter");
  await page.getByRole("checkbox", { name: "Toggle Todo" }).check();
  await page.getByRole("button", { name: "Delete" }).click();
});
