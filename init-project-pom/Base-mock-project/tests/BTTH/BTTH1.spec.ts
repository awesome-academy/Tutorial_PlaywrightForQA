import {test, expect} from '@playwright/test';
test.describe('BTTH HTML Basics', () => {
    test('register user', async ({page}) => {
        await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html', {waitUntil: 'domcontentloaded'});

    // Input data

    // Username
    await page.fill('#username','vietnh');
    // Email
    await page.fill('#email','nguyen.hoang.viet@sun-asterisk.com');
    // Gender
    await page.check('input[name="gender"][value="male"]');
    // Hobbies
    await page.check('input[name="hobbies"][value="reading"]');
    await page.check('input[name="hobbies"][value="traveling"]');
    // Interests
    await page.selectOption('#interests', ['technology', 'sports','music']);
    // Country
    await page.selectOption('#country', 'canada');
    // Date of Birth
    await page.fill('#dob', '1997-04-27');
    // Upload profile picture
    const filePath = 'C:\\Users\\nguyen.hoang.viet\\Downloads\\IMG_1437_processed_by_imagy.gif';
    await page.setInputFiles('#profile', filePath);

    // Submit form
    await page.click('button[type="submit"]');
    // Verify gender and hobbies
    const firstRow = page.locator('#userTable tbody tr').nth(0);
    const infoCell = firstRow.locator('td').nth(3);

    await expect(infoCell).toContainText('Gender: male');
    await expect(infoCell).toContainText('Hobbies: reading, traveling');

    });
});