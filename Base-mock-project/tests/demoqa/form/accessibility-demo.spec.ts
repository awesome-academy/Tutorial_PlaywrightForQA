import { test, expect } from '@playwright/test';

/**
 * 🎯 DEMO: Accessibility-First Testing
 * 
 * File này giải thích TẠI SAO nên dùng getByRole thay vì locator
 */

test.describe('Accessibility-First Testing - Giải thích chi tiết', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        await page.waitForLoadState('domcontentloaded');
    });

    test('Demo 1: Cách người dùng THẬT SỰ nhìn thấy form', async ({ page }) => {
        /**
         * 🧑 NGƯỜI DÙNG BÌNH THƯỜNG nhìn thấy:
         * - Một ô "Email" với placeholder "name@example.com"
         * - Một ô "First Name"
         * - Các nút radio "Male", "Female", "Other"
         * - Nút "Submit"
         * 
         * Họ KHÔNG biết và KHÔNG quan tâm:
         * - ID là #userEmail hay #firstName
         * - Class CSS là gì
         * - Label có for="gender-radio-1" hay không
         */

        // ✅ ĐÚNG: Test theo cách người dùng nhìn thấy
        await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
        await page.getByRole('textbox', { name: /first name/i }).fill('John');
        
        // Verify người dùng có thể thấy giá trị
        await expect(page.getByRole('textbox', { name: /email/i })).toHaveValue('test@example.com');
    });

    test('Demo 2: Cách SCREEN READER (người khiếm thị) tương tác', async ({ page }) => {
        /**
         * 🔊 SCREEN READER sẽ đọc:
         * 
         * 1. "Email, edit text, name@example.com" 
         *    → getByRole('textbox', { name: 'name@example.com' })
         * 
         * 2. "First Name, edit text"
         *    → getByRole('textbox', { name: 'First Name' })
         * 
         * 3. "Male, radio button, not checked"
         *    → getByLabel('Male') hoặc click vào label
         * 
         * 4. "Submit, button"
         *    → getByRole('button', { name: 'Submit' })
         */

        // ✅ Test theo cách screen reader "nghe" được
        const emailField = page.getByRole('textbox', { name: 'name@example.com' });
        await emailField.fill('accessible@test.com');
        
        // Screen reader sẽ thông báo: "Email field now contains accessible@test.com"
        await expect(emailField).toHaveValue('accessible@test.com');
    });

    test('Demo 3: Tại sao LOCATOR (#id) là KHÔNG TỐT', async ({ page }) => {
        /**
         * ❌ VẤN ĐỀ với locator:
         * 
         * 1. Phụ thuộc vào implementation (ID có thể đổi)
         * 2. Không test accessibility (nếu form không accessible, test vẫn pass)
         * 3. Không phản ánh trải nghiệm người dùng thật
         * 4. Khó maintain khi HTML thay đổi
         */

        // ❌ CÁCH CŨ: Test theo implementation
        await page.locator('#firstName').fill('John');
        await page.locator('#lastName').fill('Doe');
        await page.locator('#userEmail').fill('john@test.com');
        
        // Vấn đề: Nếu developer đổi ID thành #first-name, test sẽ fail
        // Nhưng form vẫn hoạt động tốt cho người dùng!
        
        // ✅ CÁCH MỚI: Test theo user experience
        await page.getByRole('textbox', { name: 'First Name' }).clear();
        await page.getByRole('textbox', { name: 'First Name' }).fill('Jane');
        
        // Nếu developer đổi ID nhưng giữ nguyên label, test vẫn pass
        // Chỉ fail khi UX thực sự thay đổi (label biến mất)
    });

    test('Demo 4: Giải pháp cho Gender Radio Buttons', async ({ page }) => {
        /**
         * 🔍 VẤN ĐỀ phát hiện:
         * - Radio buttons không có aria-label riêng
         * - Cần click vào LABEL thay vì radio button trực tiếp
         * 
         * 🎯 GIẢI PHÁP:
         * - Dùng getByLabel() để click vào label
         * - Hoặc dùng getByText() với label text
         */

        // ❌ KHÔNG HOẠT ĐỘNG: getByRole('radio', { name: 'Male' })
        // Lý do: Radio button không có accessible name riêng
        
        // ✅ GIẢI PHÁP 1: Click vào label
        await page.getByText('Male', { exact: true }).click();
        
        // ✅ GIẢI PHÁP 2: Dùng label selector
        await page.locator('label[for="gender-radio-2"]').click(); // Female
        
        // ✅ GIẢI PHÁP 3: Kết hợp - tìm label text trong form group
        const genderGroup = page.locator('.custom-control').filter({ hasText: 'Other' });
        await genderGroup.click();
        
        // Verify radio is checked
        await expect(page.locator('#gender-radio-3')).toBeChecked();
    });

    test('Demo 5: So sánh TRỰC TIẾP - Locator vs GetByRole', async ({ page }) => {
        console.log('\n=== SO SÁNH LOCATOR VS GETBYROLE ===\n');

        // 📊 Test Case: Fill email field
        console.log('📧 TEST: Fill Email Field');
        
        // ❌ CÁCH 1: Locator (Implementation-based)
        console.log('\n❌ Locator approach:');
        const startLocator = Date.now();
        await page.locator('#userEmail').fill('locator@test.com');
        console.log(`   - Selector: #userEmail`);
        console.log(`   - Time: ${Date.now() - startLocator}ms`);
        console.log(`   - Accessibility tested: NO`);
        console.log(`   - Readable: NO (phải biết ID)`);
        console.log(`   - Maintainable: NO (ID có thể đổi)`);
        
        await page.locator('#userEmail').clear();
        
        // ✅ CÁCH 2: GetByRole (User-centric)
        console.log('\n✅ GetByRole approach:');
        const startRole = Date.now();
        await page.getByRole('textbox', { name: 'name@example.com' }).fill('role@test.com');
        console.log(`   - Selector: getByRole('textbox', { name: 'name@example.com' })`);
        console.log(`   - Time: ${Date.now() - startRole}ms`);
        console.log(`   - Accessibility tested: YES ✓`);
        console.log(`   - Readable: YES ✓ (ai cũng hiểu)`);
        console.log(`   - Maintainable: YES ✓ (chỉ fail khi UX đổi)`);
        
        // Verify both work
        await expect(page.getByRole('textbox', { name: 'name@example.com' }))
            .toHaveValue('role@test.com');
    });

    test('Demo 6: THỰC TẾ - Form submission hoàn chỉnh với GetByRole', async ({ page }) => {
        /**
         * 🎯 BEST PRACTICE: Mix giữa getByRole, getByLabel, và getByText
         */

        // 1. Text inputs - dùng getByRole với name từ placeholder hoặc label
        await page.getByRole('textbox', { name: 'First Name' }).fill('Alice');
        await page.getByRole('textbox', { name: 'Last Name' }).fill('Smith');
        await page.getByRole('textbox', { name: 'name@example.com' }).fill('alice@test.com');
        await page.getByRole('textbox', { name: 'Mobile Number' }).fill('1234567890');
        
        // 2. Radio buttons - click vào label text (cách người dùng thật làm)
        await page.getByText('Female', { exact: true }).click();
        
        // 3. Checkboxes - dùng getByLabel
        await page.locator('label[for="hobbies-checkbox-2"]').click(); // Reading
        await page.locator('label[for="hobbies-checkbox-3"]').click(); // Music
        
        // 4. Textarea
        await page.getByRole('textbox', { name: 'Current Address' }).fill('123 Main St');
        
        // 5. Button - dùng getByRole
        await page.getByRole('button', { name: 'Submit' }).click();
        
        // Verify modal xuất hiện
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
    });

    test('Demo 7: TẠI SAO quan trọng - Real accessibility bug example', async ({ page }) => {
        /**
         * 🐛 SCENARIO: Developer xóa placeholder của email field
         * 
         * Điều gì sẽ xảy ra?
         */

        // ❌ Test với LOCATOR vẫn PASS (BAD!)
        await page.locator('#userEmail').fill('test@example.com');
        await expect(page.locator('#userEmail')).toHaveValue('test@example.com');
        // Test pass nhưng user không biết field này là gì!
        
        // ✅ Test với GETBYROLE sẽ FAIL (GOOD!)
        // await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@example.com');
        // → Sẽ fail vì không tìm thấy textbox với name đó
        // → Buộc developer phải fix accessibility issue!
        
        console.log('\n💡 KEY INSIGHT:');
        console.log('   Locator test = Test code hoạt động');
        console.log('   GetByRole test = Test USER EXPERIENCE');
        console.log('   Nếu screen reader không đọc được → GetByRole fail → Bắt bug sớm!');
    });
});

/**
 * 📚 TÓM TẮT:
 * 
 * ❌ LOCATOR (#id, .class):
 * - Test theo IMPLEMENTATION (code)
 * - Không đảm bảo accessibility
 * - Khó maintain khi HTML đổi
 * - Không phản ánh user experience
 * 
 * ✅ GETBYROLE / GETBYLABEL:
 * - Test theo USER EXPERIENCE
 * - Đảm bảo accessibility (screen reader friendly)
 * - Dễ maintain (chỉ fail khi UX thực sự đổi)
 * - Tự động test accessibility compliance
 * 
 * 🎯 BEST PRACTICE:
 * 1. Ưu tiên: getByRole, getByLabel, getByPlaceholder, getByText
 * 2. Fallback: getByTestId (thêm data-testid vào HTML)
 * 3. Tránh: locator với ID/class CSS (trừ khi không có cách nào khác)
 */
