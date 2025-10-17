import {test,expect} from '@playwright/test';
test.describe('DemoQA textbox',()=>{
    test('DemoQA textbox',async({page})=>{
        await page.goto('https://demoqa.com/text-box');
await page.fill('#userName', 'testuser');
await page.fill('#userEmail', 'testuser@example.com');
await page.fill('#currentAddress', '123 Test St, Test City');
await page.fill('#permanentAddress', '456 Permanent St, Permanent City');
await page.click('#submit');
await expect(page.locator('#name')).toHaveText('Name:testuser');
await expect(page.locator('#email')).toHaveText('Email:testuser@example.com');
await expect(page.locator('#output #currentAddress')).toHaveText('Current Address :123 Test St, Test City');
await expect(page.locator('#output #permanentAddress')).toHaveText('Permananet Address :456 Permanent St, Permanent City');
    });
});

test.describe('DemoQA checkbox', () => {
    test('DemoQA checkbox', async ({ page }) => {
        // Navigate with increased timeout
        await page.goto('https://demoqa.com/checkbox', { waitUntil: 'domcontentloaded' });
        
        // // Click the expand button to show the checkbox tree
        // await page.locator('.rct-icon.rct-icon-expand-close').first().click();
        
        // Click on the Home checkbox label (not the input directly)
        await page.check('#tree-node-home', { force: true });
        
        // Verify the actual checkbox input is checked
        await expect(page.locator('input#tree-node-home')).toBeChecked();
        
        // Verify result text appears
        await expect(page.locator('#result')).toContainText('home');
    });
});
test('Practice Form: Interact with all input types', async ({ page }) => {
    // 1. Mở form
    await page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });

    // // Xóa quảng cáo để tránh che element
    // await page.evaluate(() => {
    //     const ads = document.querySelectorAll('#fixedban, #adplus-anchor, iframe[id*="google_ads"]');
    //     ads.forEach(ad => ad.remove());
    // });

    // 2. Nhập thông tin
    await page.fill('#firstName', 'Tra');
    await page.fill('#lastName', 'Pham');
    await page.fill('#userEmail', 'tra.pham@example.com');

    // 3. Chọn giới tính (radio) - Click vào LABEL thay vì input
    await page.click('label[for="gender-radio-2"]');

    // 4. Nhập số điện thoại
    await page.fill('#userNumber', '0912345678');

    // 5. Tích checkbox sở thích - Click label
    await page.locator('label[for="hobbies-checkbox-2"]').click(); // Reading
    await page.locator('label[for="hobbies-checkbox-3"]').click(); // Music

    // 6. Hover lên tiêu đề
    await page.hover('.practice-form-wrapper h5');

    // 7. Submit form
    await page.click('#submit');

    // 8. Kiểm tra popup hiện ra
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
});


test('Practice Form: Interact with all input types2', async ({ page }) => {
    // 1. Mở form
    await page.goto('https://demoqa.com/automation-practice-form', { waitUntil: 'domcontentloaded' });

    // 2. Nhập thông tin
    await page.fill('#firstName', 'Tra');
    await page.fill('#lastName', 'Pham');
    await page.fill('#userEmail', 'tra.pham@example.com');

    // 3. Chọn giới tính (radio)
    await page.click('label[for="gender-radio-2"]');
    // 4. Nhập số điện thoại
    await page.fill('#userNumber', '0912345678');

    // 5. Tích checkbox sở thích
    await page.check('label:has-text("Reading")'); 
    await page.check('label:has-text("Music")');

    // 6. Hover lên tiêu đề
    await page.hover('.practice-form-wrapper h5');

    // 7. Submit form
    await page.click('#submit');

    // 8. Kiểm tra popup hiện ra
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
});