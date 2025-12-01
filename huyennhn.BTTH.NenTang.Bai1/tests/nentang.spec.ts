import { test, expect } from '@playwright/test';

//Access web successfully
test('access w3school', async ({ page }) => {
    //access
    await page.goto('https://www.w3schools.com/');
    //Check display
    await expect(page.getByText('Learn to Code')).toBeVisible();
    await expect(page.getByPlaceholder('Search our tutorials, e.g. HTML')).toBeVisible();
});

// Searching
test('searching typescript', async ({ page }) => {
    //access
    await page.goto('https://www.w3schools.com/');
    //check display page
    await expect(page.getByPlaceholder('Search our tutorials, e.g. HTML')).toBeVisible();
    //input keyword
    await page.fill('#tnb-google-search-input','typescript');
    //click btn search
    await page.locator('#tnb-google-search-input').click();
    //check display result page
    await expect(page).toHaveURL(/typescript/); // fail do timeout
    await expect(page.getByText('Typescript Tutorial')).toBeVisible();

});