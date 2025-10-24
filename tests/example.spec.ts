import { test, expect } from '@playwright/test';

test.describe('Tests after login', () => {
  test('Verify user is on the inventory page', async ({ page }) => {
    // Access the inventory page directly
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Check the URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Verify that the page displays products
    const productList = page.locator('.inventory_list');
    await expect(productList).toBeVisible();
  });

  test('Add product to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Click the "Add to cart" button of the first product
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify the cart icon displays the item count
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

  });

  test('Check sidebar menu', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Click menu button
    await page.locator('#react-burger-menu-btn').click();

    // Check menu items
    const logoutLink = page.locator('#logout_sidebar_link');
    await expect(logoutLink).toBeVisible();

  });
});
