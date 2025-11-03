import { test, expect } from "../src/fixtures/baseFixtures";

test.describe("GlobalSQA Demo Site – Đăng ký", () => {
  test("Đăng ký tài khoản, Login vào bằng tk vừa đăng ký", async ({ page }) => {
    //Register user
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#Text1");
    const username = page.getByRole("textbox", { name: "username" });
    const password = page.getByRole("textbox", { name: "password" });
    const buttonRegister = page.getByRole("button", { name: "Register" });

    await page.goto(
      "https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register"
    );
    //Kiểm tra tiêu đều page
    const title = page.locator("h2");
    await expect(title).toHaveText("Register");

    //Input các thông tin đăng ký
    await firstName.fill("Pham");
    await lastName.fill("Thanh Tra");
    await username.fill("trapt0809");
    await password.fill("12345678");

    //Kiểm tra các ô input đã điền đúng thông tin
    console.log(`First name là: ` + (await firstName.inputValue()));
    console.log(`Last name là: ` + (await lastName.inputValue()));
    console.log(`Username là: ` + (await username.inputValue()));
    console.log(`Password là: ` + (await password.inputValue()));

    await buttonRegister.click();
    await expect(page).toHaveURL(/registration-login-example\/#\/login/);  
    console.log("Đăng ký thành công");
    await page.waitForTimeout(2000);

    //Login with user registered
    const userNameLogin = page.locator("#username");
    const passWordLogin = page.locator("#password");
    const buttonLogin = page.locator("button:has-text('Login')");
    await userNameLogin.fill("trapt0809");
    await passWordLogin.fill("12345678");
    await buttonLogin.click();
    await expect(page).toHaveURL(/registration-login-example\/#\//);
    await expect(page.getByText("You're logged in!!")).toBeVisible();
    console.log("Login thành công");
    await page.waitForTimeout(2000);

    page.close();
  });
});

// BTTH: GlobalSQA Demo Site – Đăng ký
// Link: https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register
// Yêu cầu bài tập:
// Thực hiện viết testcase kiểm tra đăng ký acc thành công và có thể login được bằng acc vừa đăng ký.
// Viết đoạn mã Playwright để:
// Kiểm tra tiêu đề page hiển thị đúng là "Register"
// Kiểm tra các ô input có hiển thị
// Điền thông tin vào các ô và nhấn nút "Register"
