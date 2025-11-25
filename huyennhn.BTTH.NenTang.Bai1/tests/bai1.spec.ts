import { test, expect } from '@playwright/test';

//Access web successfully
test('register user', async ({ page }) => {
    //access url
    await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

    //check screen
    await expect(page.getByText('User Registration')).toBeVisible();

    //Input username
    await page.fill('#username','Amanda');

    //Input Email
    await page.fill('#email','nguyen.ha.ngoc.huyen@sun-asterisk.com');

    //Select Gender
    await page.check('#female');
    //Check selected value
    await expect(page.locator('#female')).toBeChecked();

    //Select Hobbies
    await page.check('#reading');
    await page.check('#traveling');
    await page.check('#cooking');
    //Check selected Hobbies
    await expect(page.locator('#reading')).toBeChecked();
    await expect(page.locator('#traveling')).toBeChecked();
    await expect(page.locator('#cooking')).toBeChecked();

    // Select Interests (multiselect)
    await page.locator('#interests').selectOption(['art','music']);

    //Select Country
    await page.locator('#country').selectOption('canada');

    //Select Date of Birth
    await page.locator('#dob').fill('2000-11-18');

    //Submit
    await page.locator('button[type="submit"]').click();

    //Check display new record
    await expect(page.getByText('Amanda')).toBeVisible();
});