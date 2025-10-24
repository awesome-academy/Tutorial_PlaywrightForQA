import {test, expect} from '@playwright/test';
import { SaucedemoPage } from '../pages/SaucedemoPage';
import { before, beforeEach } from 'node:test';
import { SaucedemoData } from '../data/SaucedemoData';

test.describe('Test products', () => {

    let saucedemoPage: SaucedemoPage;
    test.beforeEach(async ({page}) => {
        saucedemoPage = new SaucedemoPage(page);
        await saucedemoPage.goto();
        await saucedemoPage.loginAs('standardUser');
    });
    test('Test1: Check total products displayed', async () => {
        await expect(saucedemoPage.productItemName).toHaveCount(6);
    });
    test('Test2: Check display name of product', async () => {

        await expect(saucedemoPage.productItemName.nth(2)).toHaveText(SaucedemoData.products.product3.name, {timeout: 500});
    });
});
test .describe('Test cart', () => {
    let saucedemoPage: SaucedemoPage;
    test.beforeEach(async ({page}) => {
        saucedemoPage = new SaucedemoPage(page);
        await saucedemoPage.goto();
        await saucedemoPage.loginAs('standardUser');
        // Add product1 to cart
        await saucedemoPage.addProductToCartByName(SaucedemoData.products.product1.name);
    });

    test('Test1: Add one product to cart and verify', async () => {
        await saucedemoPage.addProductToCartByName(SaucedemoData.products.product2.name);
        await saucedemoPage.goToCart();
        await expect(saucedemoPage.cartItemList).toHaveCount(2);
        await expect(saucedemoPage.getCartItemNameByIndex(1)).toHaveText(SaucedemoData.products.product2.name);
    });

    test('Test2: Add multiple products to cart and verify', async () => {
        await saucedemoPage.removeProductFromCartByName(SaucedemoData.products.product1.name);
        await saucedemoPage.addProductToCartByName(SaucedemoData.products.product4.name);
        await saucedemoPage.addProductToCartByName(SaucedemoData.products.product3.name);
        await saucedemoPage.addProductToCartByName(SaucedemoData.products.product2.name);

        await saucedemoPage.goToCart();
        await expect(saucedemoPage.cartItemList).toHaveCount(3);
        await expect(saucedemoPage.getCartItemNameByIndex(0)).toHaveText(SaucedemoData.products.product4.name);
        await expect(saucedemoPage.getCartItemNameByIndex(1)).toHaveText(SaucedemoData.products.product3.name);
        await expect(saucedemoPage.getCartItemNameByIndex(2)).toHaveText(SaucedemoData.products.product2.name);
    });

    test('Test3: Verify cart badge count after adding products', async () => {
        await saucedemoPage.addProductToCartByName(SaucedemoData.products.product3.name);
        await saucedemoPage.addProductToCartByName(SaucedemoData.products.product2.name);
        await expect(saucedemoPage.cartIconBadge).toHaveText('3');
    });

    test('Test4: Check product of cart', async () => {
        await saucedemoPage.goToCart();
        await expect(saucedemoPage.getCartItemNameByIndex(0)).toHaveText(SaucedemoData.products.product1.name);
    });
    test('Test5: Remove product from cart and verify', async () => {
        await saucedemoPage.removeProductFromCartByName(SaucedemoData.products.product1.name);
        await expect(saucedemoPage.cartItemList).toHaveCount(0);
    });
});
