import { test, expect } from '@playwright/test';

/**
 * 🚨 KHI NÀO GETBYROLE KHÔNG HOẠT ĐỘNG?
 * 
 * File này demo các trường hợp getByRole gặp vấn đề và cách giải quyết
 */

test.describe('GetByRole - Khi nào KHÔNG hoạt động?', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        await page.waitForLoadState('domcontentloaded');
    });

    test('❌ Case 1: Element không có accessible name', async ({ page }) => {
        /**
         * VẤN ĐỀ: Radio buttons không có aria-label hoặc accessible name riêng
         * 
         * HTML thực tế:
         * <input type="radio" id="gender-radio-1" name="gender" value="Male" />
         * <label for="gender-radio-1">Male</label>
         * 
         * Screen reader đọc: "Male, radio button" (từ label liên kết qua 'for')
         * Nhưng Playwright's getByRole cần accessible name TRỰC TIẾP trên input
         */

        console.log('\n❌ KHÔNG HOẠT ĐỘNG:');
        try {
            // Cố gắng dùng getByRole với name
            await page.getByRole('radio', { name: 'Male' }).check({ timeout: 2000 });
            console.log('   Không nên đến đây!');
        } catch (error: any) {
            console.log('   ✗ getByRole("radio", { name: "Male" }) FAILED');
            console.log('   Lý do: Radio button không có accessible name trực tiếp');
            console.log('   Error:', error.message.split('\n')[0]);
        }

        console.log('\n✅ GIẢI PHÁP:');
        
        // Giải pháp 1: Click vào label (cách user thật làm)
        await page.getByText('Male', { exact: true }).click();
        console.log('   ✓ Solution 1: getByText("Male") - Click vào label text');
        
        // Giải pháp 2: Dùng label selector
        await page.locator('label[for="gender-radio-2"]').click();
        console.log('   ✓ Solution 2: locator("label[for=...]") - Click vào label element');
        
        // Giải pháp 3: Dùng getByLabel (nếu có label hợp lệ)
        // await page.getByLabel('Female').check();
        // console.log('   ✓ Solution 3: getByLabel("Female")');
        
        // Verify
        await expect(page.locator('#gender-radio-2')).toBeChecked();
    });

    test('❌ Case 2: Custom components không có proper ARIA roles', async ({ page }) => {
        /**
         * VẤN ĐỀ: React Select và custom dropdowns không có role="combobox" đúng cách
         * 
         * HTML thực tế:
         * <div id="state">Select State</div>
         * → Không phải <select>, không có role="combobox"
         */

        console.log('\n❌ KHÔNG HOẠT ĐỘNG:');
        try {
            // Cố gắng tìm state dropdown như một combobox
            await page.getByRole('combobox', { name: 'State' }).click({ timeout: 2000 });
            console.log('   Không nên đến đây!');
        } catch (error: any) {
            console.log('   ✗ getByRole("combobox", { name: "State" }) FAILED');
            console.log('   Lý do: Custom dropdown không có proper ARIA role');
        }

        console.log('\n✅ GIẢI PHÁP:');
        
        // Giải pháp 1: Dùng ID/class selector
        await page.locator('#state').click();
        console.log('   ✓ Solution 1: locator("#state") - Dùng ID selector');
        
        // Giải pháp 2: Dùng getByText cho visible text
        await page.getByText('Select State').click();
        console.log('   ✓ Solution 2: getByText("Select State") - Dùng visible text');
        
        // Giải pháp 3: Thêm data-testid vào HTML
        // <div id="state" data-testid="state-dropdown">...</div>
        // await page.getByTestId('state-dropdown').click();
        console.log('   ✓ Solution 3: getByTestId() - Cần thêm data-testid vào HTML');
    });

    test('❌ Case 3: Multiple elements với cùng role và name', async ({ page }) => {
        /**
         * VẤN ĐỀ: Nhiều textbox không có tên riêng biệt
         * 
         * Ví dụ: Nếu có 2 textbox cùng không có placeholder/label
         */

        console.log('\n❌ KHÔNG HOẠT ĐỘNG:');
        
        // Giả sử có nhiều textbox với cùng accessible name
        const allTextboxes = await page.getByRole('textbox').all();
        console.log(`   Tìm thấy ${allTextboxes.length} textboxes`);
        console.log('   Vấn đề: Nếu không specify name, không biết chọn cái nào');

        console.log('\n✅ GIẢI PHÁP:');
        
        // Giải pháp 1: Dùng name cụ thể
        await page.getByRole('textbox', { name: 'First Name' }).fill('John');
        console.log('   ✓ Solution 1: Specify { name: "First Name" }');
        
        // Giải pháp 2: Dùng index (không khuyến khích)
        await page.getByRole('textbox').nth(0).fill('Jane');
        console.log('   ✓ Solution 2: .nth(0) - Nhưng dễ break!');
        
        // Giải pháp 3: Filter by context
        const nameSection = page.locator('.row').filter({ hasText: 'Name' });
        await nameSection.getByRole('textbox').first().fill('Bob');
        console.log('   ✓ Solution 3: Filter by parent/context');
    });

    test('❌ Case 4: Elements bị ẩn hoặc disabled', async ({ page }) => {
        /**
         * VẤN ĐỀ: City dropdown bị disabled khi chưa chọn State
         */

        console.log('\n❌ KHÔNG HOẠT ĐỘNG:');
        try {
            // Cố gắng click city khi chưa chọn state
            await page.locator('#city').click();
            const cityOptions = await page.getByText('Delhi').isVisible({ timeout: 1000 });
            console.log('   City visible:', cityOptions);
        } catch (error: any) {
            console.log('   ✗ Không thể select city khi chưa chọn state');
            console.log('   Lý do: Element disabled hoặc không có options');
        }

        console.log('\n✅ GIẢI PHÁP:');
        
        // Giải pháp: Kiểm tra state trước khi interact
        const cityInput = page.locator('#city input');
        const isDisabled = await cityInput.isDisabled().catch(() => false);
        console.log(`   City input disabled: ${isDisabled}`);
        
        if (isDisabled) {
            console.log('   → Chọn state trước...');
            await page.locator('#state').click();
            await page.getByText('NCR', { exact: true }).click();
        }
        
        // Bây giờ mới select city
        await page.locator('#city').click();
        await page.getByText('Delhi', { exact: true }).click();
        console.log('   ✓ Solution: Check element state trước khi interact');
    });

    test('❌ Case 5: Dynamic content loading', async ({ page }) => {
        /**
         * VẤN ĐỀ: Subjects autocomplete cần time để load suggestions
         */

        console.log('\n❌ KHÔNG HOẠT ĐỘNG (nếu không wait):');
        
        const subjectsInput = page.locator('#subjectsInput');
        await subjectsInput.fill('Mat');
        
        try {
            // Cố gắng select ngay lập tức
            await page.getByText('Maths', { exact: true }).click({ timeout: 500 });
        } catch (error: any) {
            console.log('   ✗ Không tìm thấy "Maths" ngay lập tức');
            console.log('   Lý do: Suggestions chưa load xong');
        }

        console.log('\n✅ GIẢI PHÁP:');
        
        // Giải pháp 1: Dùng waitForTimeout (quick fix)
        await subjectsInput.clear();
        await subjectsInput.fill('Eng');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        console.log('   ✓ Solution 1: waitForTimeout() - Quick but not ideal');
        
        // Giải pháp 2: Wait for selector (better)
        await subjectsInput.clear();
        await subjectsInput.fill('Phy');
        await page.waitForSelector('.subjects-auto-complete__menu', { timeout: 3000 });
        await page.keyboard.press('Enter');
        console.log('   ✓ Solution 2: waitForSelector() - Wait for menu to appear');
        
        // Giải pháp 3: Wait for specific option
        await subjectsInput.clear();
        await subjectsInput.fill('Che');
        await page.waitForSelector('text=Chemistry', { timeout: 3000 });
        await page.keyboard.press('Enter');
        console.log('   ✓ Solution 3: Wait for specific text - Most reliable');
    });

    test('❌ Case 6: File upload buttons', async ({ page }) => {
        /**
         * VẤN ĐỀ: File input thường được hide, chỉ hiển thị custom button
         */

        console.log('\n❌ KHÔNG HOẠT ĐỘNG:');
        try {
            // Cố gắng tìm file input như button
            await page.getByRole('button', { name: 'Choose File' }).click({ timeout: 2000 });
        } catch (error: any) {
            console.log('   ✗ getByRole("button", { name: "Choose File" }) có thể fail');
            console.log('   Lý do: Real file input bị ẩn, custom button có cấu trúc khác');
        }

        console.log('\n✅ GIẢI PHÁP:');
        
        // Giải pháp 1: Tìm input[type="file"] trực tiếp
        const fileInput = page.locator('input[type="file"]');
        console.log('   ✓ Solution 1: locator("input[type=file]")');
        
        // Giải pháp 2: Dùng setInputFiles (không cần click)
        // await fileInput.setInputFiles('path/to/file.txt');
        console.log('   ✓ Solution 2: setInputFiles() - Không cần click button');
        
        // Giải pháp 3: Click vào visible button text
        await page.getByText('Select picture').click();
        console.log('   ✓ Solution 3: getByText("Select picture")');
    });

    test('❌ Case 7: Modal và overlay elements', async ({ page }) => {
        /**
         * VẤN ĐỀ: Modal xuất hiện sau submit, cần wait
         */

        // Fill form
        await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
        await page.getByRole('textbox', { name: 'Last Name' }).fill('User');
        await page.getByRole('textbox', { name: 'name@example.com' }).fill('test@test.com');
        await page.getByText('Male', { exact: true }).click();
        await page.getByRole('textbox', { name: 'Mobile Number' }).fill('1234567890');
        await page.getByRole('button', { name: 'Submit' }).click();

        console.log('\n❌ KHÔNG HOẠT ĐỘNG (nếu không wait):');
        try {
            // Cố gắng find modal title ngay lập tức
            const modalTitle = page.locator('#example-modal-sizes-title-lg');
            const text = await modalTitle.textContent({ timeout: 100 });
            console.log('   Modal text:', text);
        } catch (error: any) {
            console.log('   ✗ Modal chưa xuất hiện');
        }

        console.log('\n✅ GIẢI PHÁP:');
        
        // Giải pháp 1: Dùng expect với auto-waiting
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
        console.log('   ✓ Solution 1: expect().toBeVisible() - Auto waiting');
        
        // Giải pháp 2: Wait for selector
        await page.waitForSelector('.modal-content', { state: 'visible' });
        console.log('   ✓ Solution 2: waitForSelector() with state');
        
        // Giải pháp 3: Wait for heading role
        await page.waitForSelector('h1:has-text("Thanks for submitting")');
        console.log('   ✓ Solution 3: Specific selector with text');
        
        // Verify modal content
        const modalTitle = await page.locator('#example-modal-sizes-title-lg').textContent();
        console.log(`   Modal title: "${modalTitle}"`);
    });

    test('❌ Case 8: Nested frames/iframes', async ({ page }) => {
        /**
         * VẤN ĐỀ: Elements trong iframe cần switch context
         * 
         * Note: Form này không có iframe, đây là ví dụ tổng quát
         */

        console.log('\n❌ KHÔNG HOẠT ĐỘNG (nếu có iframe):');
        console.log('   ✗ getByRole() không tìm thấy elements trong iframe');
        console.log('   Lý do: Cần switch vào iframe context');

        console.log('\n✅ GIẢI PHÁP:');
        console.log('   ✓ Solution 1: frame.locator()');
        console.log('   const frame = page.frameLocator("iframe[name=\'myframe\']");');
        console.log('   await frame.getByRole("button", { name: "Click" }).click();');
        
        console.log('\n   ✓ Solution 2: page.frame()');
        console.log('   const frame = page.frame({ name: "myframe" });');
        console.log('   await frame?.getByRole("button").click();');
    });

    test('✅ Best Practice: Kết hợp nhiều strategies', async ({ page }) => {
        /**
         * 🎯 BEST PRACTICE: Không nên chỉ dùng getByRole
         * Kết hợp nhiều locator strategies để robust hơn
         */

        console.log('\n🎯 BEST PRACTICE - Kết hợp strategies:\n');

        // 1. Text inputs: getByRole + name
        await page.getByRole('textbox', { name: 'First Name' }).fill('Alice');
        console.log('   1. Textbox: getByRole("textbox", { name })');

        // 2. Email: getByRole với placeholder
        await page.getByRole('textbox', { name: 'name@example.com' }).fill('alice@test.com');
        console.log('   2. Email: getByRole + placeholder name');

        // 3. Radio: getByText hoặc click label
        await page.getByText('Female', { exact: true }).click();
        console.log('   3. Radio: getByText() - click label');

        // 4. Checkbox: locator + label
        await page.locator('label[for="hobbies-checkbox-2"]').click();
        console.log('   4. Checkbox: locator() with for attribute');

        // 5. Custom dropdown: locator + ID
        await page.locator('#state').click();
        await page.getByText('NCR', { exact: true }).click();
        console.log('   5. Dropdown: locator("#id") + getByText()');

        // 6. Autocomplete: locator + keyboard
        await page.locator('#subjectsInput').fill('English');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        console.log('   6. Autocomplete: locator() + keyboard');

        // 7. Textarea: getByRole
        await page.getByRole('textbox', { name: 'Current Address' }).fill('123 Main St');
        console.log('   7. Textarea: getByRole("textbox")');

        // 8. Mobile: getByRole
        await page.getByRole('textbox', { name: 'Mobile Number' }).fill('9876543210');
        console.log('   8. Mobile: getByRole()');

        // 9. Submit button: getByRole
        await page.getByRole('button', { name: 'Submit' }).click();
        console.log('   9. Button: getByRole("button", { name })');

        // 10. Modal: expect + locator
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
        console.log('   10. Modal: expect() + locator()');

        console.log('\n✅ Form submitted successfully with mixed strategies!');
    });
});

/**
 * 📚 TÓM TẮT - KHI NÀO GETBYROLE KHÔNG HOẠT ĐỘNG
 * 
 * ❌ CASE 1: Element không có accessible name
 *    → Solution: getByText(), locator(), getByLabel()
 * 
 * ❌ CASE 2: Custom components không có proper ARIA
 *    → Solution: locator(), getByTestId(), thêm ARIA roles
 * 
 * ❌ CASE 3: Multiple elements cùng role/name
 *    → Solution: Specify name, filter by context, nth()
 * 
 * ❌ CASE 4: Elements bị disabled/hidden
 *    → Solution: Check state trước, enable dependencies
 * 
 * ❌ CASE 5: Dynamic content loading
 *    → Solution: waitForSelector(), waitForTimeout()
 * 
 * ❌ CASE 6: File upload buttons
 *    → Solution: locator('input[type="file"]'), setInputFiles()
 * 
 * ❌ CASE 7: Modal/overlay timing
 *    → Solution: expect().toBeVisible(), waitForSelector()
 * 
 * ❌ CASE 8: Nested iframes
 *    → Solution: frameLocator(), page.frame()
 * 
 * 🎯 BEST PRACTICE:
 * - Ưu tiên getByRole khi có thể
 * - Fallback sang getByLabel, getByText, getByPlaceholder
 * - Cuối cùng dùng locator() hoặc getByTestId()
 * - Luôn kết hợp nhiều strategies để test robust hơn
 * 
 * 💡 RULE OF THUMB:
 * "Dùng getByRole cho standard HTML elements,
 *  dùng locator/getByTestId cho custom components"
 */
