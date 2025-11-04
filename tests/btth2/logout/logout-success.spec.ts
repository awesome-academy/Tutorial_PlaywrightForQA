import { test, expect } from "@playwright/test";

test.describe("Logout Valid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
  });

  test("Logout successful", async ({ page }) => {
    await page.click("#react-burger-menu-btn");
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});
