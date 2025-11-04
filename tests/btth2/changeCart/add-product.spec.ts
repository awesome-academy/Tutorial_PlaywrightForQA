import { test, expect } from "@playwright/test";

test.describe("change Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
  });

  test("Add more product", async ({ page }) => {
    await page
      .locator('[data-test="inventory-item"]')
      .first()
      .getByRole("button", { name: "Add to cart" })
      .click();

    await page
      .locator('[data-test="inventory-item"]')
      .nth(3)
      .getByRole("button", { name: "Add to cart" })
      .click();

    await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
  });
});
