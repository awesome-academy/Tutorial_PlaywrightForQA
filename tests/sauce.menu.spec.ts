import { test, expect } from '@playwright/test';
test('Click about', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="about-sidebar-link"]').click();
    await expect(page).toHaveURL('https://saucelabs.com/');


});

test('Click logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');

});

test('Click icon x', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('button', { name: 'Close Menu' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


});


//case check when select data on dropdown
test('check data on dropdown', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    //await page.locator('[data-test="password"]').press('Enter');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await sortDropdown.selectOption('za');
    await expect(sortDropdown).toHaveValue('za');
});


test('select data on dropdown', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    //await page.locator('[data-test="password"]').press('Enter');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await sortDropdown.selectOption('hilo');
    await expect(sortDropdown).toHaveValue('hilo');
    await expect(page.locator(".inventory_item_price").first()).toHaveText("$49.99");

    const prices = await page.locator(".inventory_item_price").allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));

    const sortedHighToLow = [...numericPrices].sort((a, b) => b - a);

    expect(numericPrices).toEqual(sortedHighToLow);

});


// case check name button khi click butotn Add to card
test('add product to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    //await page.locator('[data-test="password"]').press('Enter');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
    const removebutton = page.locator('[data-test="remove-sauce-labs-onesie"]');
    await addButton.click();
    await expect(removebutton).toHaveText("Remove");
    await removebutton.click();
    await expect(addButton).toHaveText("Add to cart");


});

// case check khi add san pham vao gio hang
test('show data after add to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    const cartBage = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBage).toHaveText("1");
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const cartitem = page.locator('.cart_item');
    await expect(cartitem).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
});

// click button continue shopping trong màn giỏ hàng
test('continue flow shopping', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    const cartBage = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBage).toHaveText("1");
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

      await page.locator('[data-test="continue-shopping"]').click();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});