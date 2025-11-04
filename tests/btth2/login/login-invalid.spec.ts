import { test, expect } from "@playwright/test";

test.describe("Login InValid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
  });

  test("Login with wrong password", async ({ page }) => {
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "huhuhuhuhu");
    await page.click("#login-button");
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Login without username", async ({ page }) => {
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("Login without locked_out_user", async ({ page }) => {
    await page.fill("#user-name", "locked_out_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
