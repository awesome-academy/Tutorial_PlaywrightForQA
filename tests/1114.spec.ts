import { test, expect } from '@playwright/test';
// test('goto register screen', async ({ page }) => {

//     // di chuyển tới màn register
//     await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
//     await page.getByRole('link', { name: 'Register' }).click();
//     await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");

//     // check hiển thị title
//     const header = page.locator('h2');
//     await expect(header).toHaveText("Register");

// });

// test('check show all field input', async ({ page }) => {
//     // di chuyển tới màn register
//     await page.goto("https://globalsqa.com/angularJs-protractor/registration-login-example/#/register");

//     // check hiển thị các ô input
//     await expect(page.locator('input[name="firstName"]')).toBeVisible();
//     await expect(page.locator('input[name="lastName"]')).toBeVisible();
//     await expect(page.locator('input[name="username"]')).toBeVisible();
//     await expect(page.locator('input[name="password"]')).toBeVisible();

//     //   await page.locator('#firstName').fill('lua2511');
//     //   await page.locator('#Text1').click();
//     //   await page.locator('#Text1').fill('vu');
// });

// test('register acount success', async ({ page }) => {
//   await page.goto('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register');
//   await page.locator('#firstName').click();
//   await page.locator('#firstName').fill('lua+2');
//   await page.locator('#Text1').click();
//   await page.locator('#Text1').fill('vu');
//   await page.getByRole('textbox', { name: 'First name Last name Username' }).click();
//   await page.getByRole('textbox', { name: 'First name Last name Username' }).fill('luavu+2');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('11111');
//   await page.getByRole('button', { name: 'Register' }).click();
//   await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login");

//   await page.getByRole('textbox', { name: 'Username' }).click();
//   await page.getByRole('textbox', { name: 'Username' }).fill('luavu+2');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('11111');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await expect(page).toHaveURL("https://globalsqa.com/angularJs-protractor/registration-login-example/#/");
// });

// test('goto page demo', async ({ page }) => {
//     // BTTH15: goto page
//     await page.goto('https://demo.playwright.dev/todomvc/#/');

//     // add 3 công việc: Task A, Task B, Task C
//     const todoinput = page.getByPlaceholder("What needs to be done?");
//     await todoinput.fill('Task A');
//     await todoinput.press('Enter');

//     await todoinput.fill('Task B');
//     await todoinput.press('Enter');

//     await todoinput.fill('Task C');
//     await todoinput.press('Enter');

//     // tick vào công việc thứ 2
//     const selectitem = page.locator(".todo-list li");
//     await selectitem.nth(1).locator(".toggle").check();

//     // kiểm tra task đầu tiên
//     await expect(selectitem.first()).toContainText("Task A");

//     // chọn Task = Task C và delete
//     await page.getByRole('listitem').filter({ hasText: 'Task C' }).getByLabel('Toggle Todo').check();
//     await page.getByRole('button', { name: 'Delete' }).click();

//     // kiểm tra lại list data sau khi xóa
//     const items = await selectitem.allTextContents();
//     expect(items).not.toContain('Task C');
// });


// test('goto page demo1', async ({ page }) => {
//     await page.goto('https://demo.playwright.dev/todomvc/#/')

//     const inputfield = page.getByPlaceholder("What needs to be done?");
//     await inputfield.fill('task a');
//     await inputfield.press('Enter');
//     await inputfield.fill('task b');
//     await inputfield.press('Enter');
//     await inputfield.fill('task c');
//     await inputfield.press('Enter');

//     const select = page.locator(".todo-list li");
//     await select.nth(1).locator(".toggle").check();
//     await expect(select.first()).toContainText('task a');

//     await page.getByRole('listitem').filter({ hasText: 'task c' }).getByLabel('Toggle Todo').check();
//     await page.getByRole('button', { name: 'Delete' }).click();



// });

const URL = "https://www.saucedemo.com";
const USERNAME = "standard_user";
const PASSWORD = "secret_sauce";

test.describe("Login Tests", () => {

  // 1️⃣ Trước mỗi test, login
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.locator('[data-test="username"]').fill(USERNAME);
    await page.locator('[data-test="password"]').fill(PASSWORD);
    await page.locator('[data-test="login-button"]').click();
  });

  // 2️⃣ Sau mỗi test, chụp screenshot
  test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({ 
      path: `screenshots/${testInfo.title.replace(/\s+/g, "_")}.png`, 
      fullPage: true 
    });
  });

  // 3️⃣ Test 1: kiểm tra vào được trang inventory
  test("Inventory page is visible after login", async ({ page }) => {
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });

  // 4️⃣ Test 2: kiểm tra logout thành công
  test("Logout returns to login page", async ({ page }) => {
    // Click menu
    await page.locator("#react-burger-menu-btn").click();
    // Click logout
    await page.locator("#logout_sidebar_link").click();

    await expect(page).toHaveURL(URL);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

});
