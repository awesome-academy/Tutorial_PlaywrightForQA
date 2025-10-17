import { test, expect } from '@playwright/test';
test ('login success', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
test ('cart badge', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
await page.goto('https://www.saucedemo.com/inventory.html');
await page.locator('#add-to-cart-sauce-labs-backpack').click();
const cartBadge = page.locator('.shopping_cart_badge');
await expect(cartBadge).toHaveText('1');
await page.locator('#add-to-cart-sauce-labs-bike-light').click();
await expect(cartBadge).toHaveText('2');
});
test ('log out', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
await page.goto('https://www.saucedemo.com/inventory.html');
await page.locator('#react-burger-menu-btn').click();
await page.locator('#logout_sidebar_link').click();
await expect(page).toHaveURL('https://www.saucedemo.com/');
});
