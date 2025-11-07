import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `screenshots/${testInfo.title}.png`,
      fullPage: true,
    });
  }

  await page.locator("#react-burger-menu-btn").click();
  await page.locator("#logout_sidebar_link").click();
});

test("Verify that the URL after login contains /inventory", async ({
  page,
}) => {
  await expect(page).toHaveURL(/.*inventory/);
});

test("Verify that the first product displays the correct name", async ({
  page,
}) => {
  const firstItem = page.locator(".inventory_item_name").first();
  await expect(firstItem).toHaveText("Sauce Labs Backpack");
});
