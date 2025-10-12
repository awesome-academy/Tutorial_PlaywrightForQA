import { test, expect } from '@playwright/test';

test('checkURLPage', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox',{name : 'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name : 'Password'}).fill('secret_sauce');
    await page.getByRole('button',{name : 'Login'}).click();
    await page.waitForURL('**/inventory.html');
    await page.reload();
    await expect(page).toHaveURL(/inventory.html/);
    // await page.close();
});
test('interactWithElement', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.getByRole('textbox',{name : 'First Name'}).fill('Nguyen');
    await page.getByRole('textbox',{name : 'Last Name'}).fill('Quan');
    await page.getByRole('textbox',{name : 'name@example.com'}).fill('quannguyen@gmail.com')
    await page.locator('//input[@value="Male"]').click({ force: true })
    //await page.check('input[name="gender"][value="Female"]')
    await page.getByRole('textbox',{name : 'Mobile Number'}).fill('0987654321')
    await page.getByRole('checkbox',{name : 'Music'}).click({ force: true })
    // await page.getByRole('heading',{name : 'DEMOQA'}).hover()
    // const tooltip = page.getByRole('tooltip');
    // console.log(await tooltip.textContent());
    await page.getByRole('button',{name : 'Submit'}).click()
    await expect(page.locator('.modal-content')).toBeVisible()
});
test('methodWait', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.getByRole('button',{name : 'Start'}).click();
    await page.waitForSelector('#loading',{ state: 'hidden' });
    expect(await page.locator('//*[@id="finish"]/h4')).toHaveText('Hello World!')
    await page.screenshot({path: 'image_test/submit_button.png'})
});
test('methodWait', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.getByRole('button',{name : 'Start'}).click();
    await page.waitForSelector('#loading',{ state: 'hidden' });
    expect(await page.locator('//*[@id="finish"]/h4')).toHaveText('Hello World!')
    await page.screenshot({path: 'image_test/submit_button.png'})
});
