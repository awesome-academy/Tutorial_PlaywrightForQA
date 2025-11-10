import { expect } from "@playwright/test";
import { test } from "./fixtures/login.fixture";
import { log } from "console";

// Test 1: Kiểm tra dashboard sau khi login
test("Kiểm tra dashboard hiển thị đúng", async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText("Swag Labs")).toBeVisible();
});

test("verify sauce inventory products", async ({ loggedInPage }) => {
  // Verify we're on inventory page
  await expect(loggedInPage.getByText("Products")).toBeVisible();

  // Verify all 6 products are displayed
  const inventoryItems = loggedInPage.locator('[data-test="inventory-item"]');
  await expect(inventoryItems).toHaveCount(6);

  // Verify specific products exist
  await expect(loggedInPage.getByText("Sauce Labs Backpack")).toBeVisible();
  await expect(loggedInPage.getByText("Sauce Labs Bike Light")).toBeVisible();
  await expect(
    loggedInPage.getByText("Sauce Labs Fleece Jacket")
  ).toBeVisible();
  await expect(loggedInPage.getByText("Sauce Labs Onesie")).toBeVisible();
  await expect(
    loggedInPage.getByText("Test.allTheThings() T-Shirt (Red)")
  ).toBeVisible();
});

// Add 1 product to Cart
test("Add 1 product to Cart", async ({ loggedInPage }) => {
  const addCartButton = loggedInPage.locator(
    "#add-to-cart-sauce-labs-backpack"
  );
  const cartBadge = loggedInPage.locator(".shopping_cart_badge");
  await addCartButton.click();
  await expect(cartBadge).toHaveText("1");
});

// Check product was add at Cart
test("Check product was add at Cart", async ({ loggedInPage }) => {
  //Add to cart
  const addCartButton = loggedInPage.locator(
    "#add-to-cart-sauce-labs-backpack"
  );
  const cartBadge = loggedInPage.locator(".shopping_cart_badge");
  await addCartButton.click();
  //Open cart Screen
  const cartIcon = loggedInPage.locator(".shopping_cart_link");
  await cartIcon.click();
  expect(loggedInPage.waitForURL("**/cart.html"));
  //Check product was added
  expect(loggedInPage.getByText("Sauce Labs Backpack")).toBeVisible();
});
