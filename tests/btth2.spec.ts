import { test, expect } from "@playwright/test";

test.describe("Group A – Product Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await expect(page).toHaveURL(/.*inventory/);
  });

  test("Verify the number of products displayed on the page", async ({
    page,
  }) => {
    const items = await page.locator(".inventory_item").count();
    expect(items).toBeGreaterThan(0);
  });

  test("Verify the name of the first product", async ({ page }) => {
    const firstItem = page.locator(".inventory_item_name").first();
    await expect(firstItem).toHaveText("Sauce Labs Backpack");
  });
});

test.describe("Group B – Cart Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await page.locator(".btn_inventory").first().click();
  });

  test("Verify that the cart icon displays the correct item count", async ({
    page,
  }) => {
    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");
  });

  test("Verify that the correct product is displayed in the cart", async ({
    page,
  }) => {
    await page.locator(".shopping_cart_link").click();
    const cartItem = page.locator(".inventory_item_name");
    await expect(cartItem.first()).toHaveText("Sauce Labs Backpack");
  });
});
