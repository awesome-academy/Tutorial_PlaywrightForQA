import { test, expect } from "@playwright/test";

test.describe("Demo – Hook order and take screenshots on failure", () => {
  test.beforeAll(async () => {
    console.log("Starting the test group");
  });

  test.beforeEach(async ({ page }) => {
    console.log("beforeEach: Logging in");
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
  });

  test("Verify successful login", async ({ page }) => {
    await expect(page).toHaveURL(/.*inventory/);
  });

  test("Verify product name", async ({ page }) => {
    const firstItem = page.locator(".inventory_item_name").first();
    await expect(firstItem).toHaveText("Sauce Labs Backpack");
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      console.log("Test failed → Taking screenshot");
      await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true,
      });
    }
  });

  test.afterAll(async () => {
    console.log("Finished the test group");
  });
});
