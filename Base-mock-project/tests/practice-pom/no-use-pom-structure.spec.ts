import { test, expect } from '@playwright/test';

test.describe('Practice Form WITHOUT POM Pattern', () => {
    test('Practice Form: Interact with all input types (No POM - Direct page interactions)', async ({ page }) => {
        // 1. Mở form - Direct page.goto()
        await page.goto('https://demoqa.com/automation-practice-form');
        
        // Đợi form load hoàn toàn - Direct page.waitForLoadState()
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#firstName')).toBeVisible();

        // 2. Nhập thông tin - Direct page.fill() calls
        await page.fill('#firstName', 'Tra');
        await page.fill('#lastName', 'Pham');
        await page.fill('#userEmail', 'tra.pham@example.com');

        // 3. Chọn giới tính (radio) - Direct page.click() with raw selectors
        await page.click('label[for="gender-radio-2"]'); // Female 

        // 4. Nhập số điện thoại - Direct page.fill()
        await page.fill('#userNumber', '0912345678');

        // 5. Tích checkbox sở thích - Direct page.click() calls
        await page.click('label[for="hobbies-checkbox-2"]'); // Reading
        await page.click('label[for="hobbies-checkbox-3"]'); // Music

        // 6. Hover lên tiêu đề - Direct page.hover()
        await page.hover('.practice-form-wrapper h5');

        // 7. Submit form - Direct page.click()
        await page.click('#submit');

        // 8. Kiểm tra popup hiện ra - Direct expect with raw selector
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
    });
});