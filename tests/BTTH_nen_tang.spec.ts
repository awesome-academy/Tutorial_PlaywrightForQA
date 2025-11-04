import { test, expect } from '@playwright/test';

test('user can fill data in search condition', async ({ page }) => {
    await page.goto('https://www.w3schools.com/');

    await page.fill('#tnb-google-search-input', 'JavaScript Tutorial');

});