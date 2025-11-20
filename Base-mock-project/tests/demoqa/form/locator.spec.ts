import { test, expect } from '@playwright/test';

test.describe('Student Registration Form - Validation Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        await page.waitForLoadState('domcontentloaded');
    });

test('use get by role - Verify email format validation', async ({ page }) => {
      
        // Test various invalid email formats
        const invalidEmails = [
            'plaintext',
            '@example.com',
            'user@',
            'user name@example.com',
            'user@example',
        ];


        // Use getByRole for better accessibility
        const emailInput = page.getByRole('textbox', { name: 'name@example.com' });
        for (const email of invalidEmails) {
            await emailInput.clear();
            await emailInput.fill(email);
            
            // Trigger validation by clicking another field
            await page.getByRole('textbox', { name: 'First Name' }).click();
            
            // Fill required fields and try to submit
            await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
            await page.getByRole('textbox', { name: 'Last Name' }).fill('User');
            
            // ✅ FIX: Radio button cần click vào label (cách người dùng thật làm)
            await page.getByText('Male', { exact: true }).click();
            
            await page.getByRole('textbox', { name: 'Mobile Number' }).fill('1234567890');
            await page.getByRole('button', { name: 'Submit' }).click();
            
            // Modal should not appear for invalid email
            await page.waitForTimeout(500);
            const modalVisible = await page.locator('#example-modal-sizes-title-lg').isVisible();
            expect(modalVisible).toBe(false);
        }
    });

    test('use locator- Verify email format validation', async ({ page }) => {
      
        // Test various invalid email formats
        const invalidEmails = [
            'plaintext',
            '@example.com',
            'user@',
            'user name@example.com',
            'user@example',
        ];


        // Use getByRole for better accessibility
        const emailInput = page.locator('#userEmail');
        for (const email of invalidEmails) {
            await emailInput.clear();
            await emailInput.fill(email);
                    
            await page.locator('#firstName').click();
            await page.locator('#firstName').fill('Test');
            await page.locator('#lastName').fill('User');
            await page.locator('label[for="gender-radio-1"]').click();
            await page.locator('#userNumber').fill('1234567890');
            await page.locator('#submit').click();
            
            // Modal should not appear for invalid email
            await page.waitForTimeout(500);
            const modalVisible = await page.locator('#example-modal-sizes-title-lg').isVisible();
            expect(modalVisible).toBe(false);
        }
    });
});
