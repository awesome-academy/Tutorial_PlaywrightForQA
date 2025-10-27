/**
 * 🔴 BÀI TẬP: TẠO FIXTURE LOGIN VÀ TÁI SỬ DỤNG NHIỀU TEST
web demo: https://dev-2nd.fpls.jp/login

🎯 Yêu cầu
Tạo một fixture loggedInPage để login một lần.
Dùng lại fixture này trong nhiều test (add user role owner/role manager, search user).
Refactor fixture để login bằng storageState (auth.json) thay vì login thủ công.

 */

import { expect, Page } from "@playwright/test";
import { test } from "../tests/fixtures/login.fixture";

// Test 1: Kiểm tra dashboard sau khi login
test("Kiểm tra dashboard hiển thị đúng", async ({
  loggedInPage,
}: {
  loggedInPage: Page;
}) => {
  await loggedInPage.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
  );
  await expect(loggedInPage.getByText("Dashboard")).toBeVisible();
});

// Test 2: Mở trang PIM
test("Mở trang PIM", async ({ loggedInPage }: { loggedInPage: Page }) => {
  await loggedInPage.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"
  );
  await expect(loggedInPage.getByText("Employee Information")).toBeVisible();
});

// Test 3: Kiểm tra trang Admin
test("Kiểm tra trang Admin", async ({
  loggedInPage,
}: {
  loggedInPage: Page;
}) => {
  await loggedInPage.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers"
  );
  await expect(loggedInPage.getByText("System Users")).toBeVisible();
});
