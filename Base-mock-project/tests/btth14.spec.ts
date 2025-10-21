import { test, expect, Page, Locator } from "@playwright/test";

/*
 BTTH: GlobalSQA Demo Site – Đăng ký
- Yêu cầu bài tập:
Thực hiện viết testcase kiểm tra đăng ký acc thành công và có thể login được bằng acc vừa đăng ký.
Link: https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register

- Viết đoạn mã Playwright để:
    Kiểm tra tiêu đề page hiển thị đúng là "Register"
    Kiểm tra các ô input có hiển thị
    Điền thông tin vào các ô và nhấn nút "Register"

//Fn dùng chung

*/

const URL_REGISTER =
  "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register";
const URL_LOGIN =
  "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login";

const URL_HOME =
  "https://globalsqa.com/angularJs-protractor/registration-login-example/#/";

const ACCOUNT = {
  firstName: "Cao",
  lastName: "Hai",
  username: "caohai2721",
  password: "Password123",
};

test.describe("BTTH14 - GlobalSQA Demo Site – Đăng ký", () => {
  test("Kiểm tra tiêu đề page hiển thị đúng là Register", async ({ page }) => {
    await page.goto(URL_REGISTER);

    // Kiểm tra tiêu đề page
    await expect(page.locator("h2")).toHaveText("Register");
  });

  test("Kiểm tra các ô input có hiển thị", async ({ page }) => {
    await page.goto(URL_REGISTER);
    // Kiểm tra các ô input hiển thị
    await expect(
      page.locator('input[ng-model="vm.user.firstName"]')
    ).toBeVisible();
    await expect(
      page.locator('input[ng-model="vm.user.lastName"]')
    ).toBeVisible();
    await expect(
      page.locator('input[ng-model="vm.user.username"]')
    ).toBeVisible();
    await expect(
      page.locator('input[ng-model="vm.user.password"]')
    ).toBeVisible();

    console.log("✅ TC02: Các ô input hiển thị đúng");
  });

  test("Điền thông tin vào các ô hợp lệ và nhấn nút Register", async ({
    page,
  }) => {
    await page.goto(URL_REGISTER);
    // Điền thông tin vào các ô input
    await page.fill('input[ng-model="vm.user.firstName"]', ACCOUNT.firstName);
    await page.fill('input[ng-model="vm.user.lastName"]', ACCOUNT.lastName);
    await page.fill('input[ng-model="vm.user.username"]', ACCOUNT.username);
    await page.fill('input[ng-model="vm.user.password"]', ACCOUNT.password);

    // Nhấn nút Register
    await page.click('button[type="submit"]');

    // Kiểm tra chuyển hướng đến trang login
    await expect(page).toHaveURL(URL_LOGIN);
  });

  test("Đăng nhập bằng tài khoản vừa đăng ký", async ({ page }) => {
    // 🟢 Vào trang login
    await page.goto(URL_LOGIN);

    // 🟢 Nhập thông tin tài khoản
    await page.fill('input[ng-model="vm.username"]', ACCOUNT.username);
    await page.fill('input[ng-model="vm.password"]', ACCOUNT.password);

    // 🟢 Submit form
    await page.click('button[type="submit"]');

    // 🟢 Chờ hoặc redirect, hoặc DOM thay đổi (AngularJS SPA)
    await Promise.all([
      (async () => {
        try {
          await page.waitForURL(URL_HOME, { timeout: 10000 });
        } catch {
          console.log("⚠️ Không thấy đổi URL — có thể là SPA");
        }
      })(),
      page.waitForSelector("h1", { state: "visible", timeout: 10000 }),
    ]);

    // 🟢 Kiểm tra nội dung sau đăng nhập
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(`Hi ${ACCOUNT.firstName}!`);

    await expect(page.locator("p")).toContainText("You're logged in");
    await expect(page.locator("a.btn.btn-primary")).toHaveText("Logout");

    console.log("✅ Đăng nhập thành công, URL hiện tại:", page.url());
  });
});
