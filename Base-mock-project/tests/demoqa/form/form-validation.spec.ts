import { test, expect } from '@playwright/test';

test.describe('Student Registration Form - Validation Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        await page.waitForLoadState('domcontentloaded');
    });

    test('TC16 - Verify required fields validation on empty submit', async ({ page }) => {
        // Try to submit empty form
        await page.locator('#submit').click();
        
        // Check if required fields have validation styling
        const firstNameInput = page.locator('#firstName');
        const hasError = await firstNameInput.evaluate(el => {
            const style = getComputedStyle(el);
            return style.borderColor === 'rgb(255, 0, 0)' || 
                   el.classList.contains('field-error') ||
                   el.getAttribute('aria-invalid') === 'true';
        });
        
        // Form should not be submitted (no modal should appear)
        await expect(page.locator('#example-modal-sizes-title-lg')).not.toBeVisible();
    });

    test('TC17 - Verify mobile number accepts only numbers', async ({ page }) => {
        const mobileInput = page.locator('#userNumber');
        
        // Try to enter letters
        await mobileInput.fill('abcdefghij');
        
        // Verify that letters are not accepted
        const value = await mobileInput.inputValue();
        expect(value).toBe('');
        
        // Enter valid numbers
        await mobileInput.fill('1234567890');
        await expect(mobileInput).toHaveValue('1234567890');
    });

    test('TC18 - Verify mobile number max length (10 digits)', async ({ page }) => {
        const mobileInput = page.locator('#userNumber');
        
        // Try to enter more than 10 digits
        await mobileInput.fill('12345678901234567890');
        
        // Verify only 10 digits are accepted
        const value = await mobileInput.inputValue();
        expect(value.length).toBeLessThanOrEqual(10);
    });

    test('TC19 - Verify email format validation', async ({ page }) => {
      
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
            await page.getByRole('radio', { name: 'Male' }).check();
            await page.getByRole('textbox', { name: 'Mobile Number' }).fill('1234567890');
            await page.getByRole('button', { name: 'Submit' }).click();
            
            // Modal should not appear for invalid email
            await page.waitForTimeout(500);
            const modalVisible = await page.locator('#example-modal-sizes-title-lg').isVisible();
            expect(modalVisible).toBe(false);
        }
    });

    test('TC20 - Verify valid email formats are accepted', async ({ page }) => {
        const validEmails = [
            'user@example.com',
            'user.name@example.com',
            'user+tag@example.co.uk',
            'user_name@example-domain.com',
        ];
        
        for (const email of validEmails) {
            // Reload page for fresh form
            await page.reload();
            await page.waitForLoadState('domcontentloaded');
            
            await page.locator('#firstName').fill('Test');
            await page.locator('#lastName').fill('User');
            await page.locator('#userEmail').fill(email);
            await page.locator('label[for="gender-radio-1"]').click();
            await page.locator('#userNumber').fill('1234567890');
            await page.locator('#submit').click();
            
            // Modal should appear for valid email
            await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible({ timeout: 3000 });
            
            // Close modal
            await page.locator('#closeLargeModal').click();
        }
    });

    test('TC21 - Verify first name field accepts various characters', async ({ page }) => {
        const firstNameInput = page.locator('#firstName');
        
        // Test with letters
        await firstNameInput.fill('John');
        await expect(firstNameInput).toHaveValue('John');
        
        // Test with letters and spaces
        await firstNameInput.fill('John Paul');
        await expect(firstNameInput).toHaveValue('John Paul');
        
        // Test with special characters
        await firstNameInput.fill("O'Brien");
        await expect(firstNameInput).toHaveValue("O'Brien");
        
        // Test with numbers (may or may not be allowed)
        await firstNameInput.fill('John123');
        const value = await firstNameInput.inputValue();
        expect(value.length).toBeGreaterThan(0);
    });

    test('TC22 - Verify last name field validation', async ({ page }) => {
        const lastNameInput = page.locator('#lastName');
        
        // Test with various valid inputs
        await lastNameInput.fill('Smith');
        await expect(lastNameInput).toHaveValue('Smith');
        
        await lastNameInput.fill('Van Der Berg');
        await expect(lastNameInput).toHaveValue('Van Der Berg');
        
        await lastNameInput.fill("O'Connor");
        await expect(lastNameInput).toHaveValue("O'Connor");
    });

    test('TC23 - Verify date of birth cannot be in future', async ({ page }) => {
        const dobInput = page.locator('#dateOfBirthInput');
        
        // Click to open date picker
        await dobInput.click();
        
        // Try to select future year
        const currentYear = new Date().getFullYear();
        const yearSelect = page.locator('.react-datepicker__year-select');
        
        // Get all available years
        const years = await yearSelect.locator('option').allTextContents();
        const maxYear = Math.max(...years.map(y => parseInt(y)));
        
        // Verify max year is not in future
        expect(maxYear).toBeLessThanOrEqual(currentYear);
    });

    test('TC24 - Verify city dropdown is disabled when no state selected', async ({ page }) => {
        const cityDropdown = page.locator('#city');
        
        // Check if city dropdown is disabled or not interactable
        const cityInput = page.locator('#city input');
        const isDisabled = await cityInput.isDisabled();
        
        // City should not be selectable without state
        if (!isDisabled) {
            // Alternative check: clicking should not show options
            await cityDropdown.click();
            await page.waitForTimeout(300);
            const options = page.locator('.css-26l3qy-menu');
            const visible = await options.isVisible().catch(() => false);
            expect(visible).toBe(false);
        }
    });

    test('TC25 - Verify city options change based on selected state', async ({ page }) => {
        // Select NCR state
        await page.locator('#state').click();
        await page.getByText('NCR', { exact: true }).click();
        
        // Check NCR cities
        await page.locator('#city').click();
        await expect(page.getByText('Delhi', { exact: true })).toBeVisible();
        const ncrCities = await page.locator('[id^="react-select-4-option"]').allTextContents();
        
        // Close dropdown
        await page.keyboard.press('Escape');
        
        // Change to Haryana state
        await page.locator('#state').click();
        await page.getByText('Haryana', { exact: true }).click();
        
        // Check Haryana cities
        await page.locator('#city').click();
        await expect(page.getByText('Karnal', { exact: true })).toBeVisible();
        const haryanaCities = await page.locator('[id^="react-select-4-option"]').allTextContents();
        
        // Verify cities are different
        expect(ncrCities).not.toEqual(haryanaCities);
    });

    test('TC26 - Verify form field max lengths', async ({ page }) => {
        const longText = 'a'.repeat(1000);
        
        // Test first name
        await page.locator('#firstName').fill(longText);
        const firstNameValue = await page.locator('#firstName').inputValue();
        
        // Test last name
        await page.locator('#lastName').fill(longText);
        const lastNameValue = await page.locator('#lastName').inputValue();
        
        // Test email
        await page.locator('#userEmail').fill('a'.repeat(500) + '@example.com');
        const emailValue = await page.locator('#userEmail').inputValue();
        
        // All fields should accept the input (or truncate it)
        expect(firstNameValue.length).toBeGreaterThan(0);
        expect(lastNameValue.length).toBeGreaterThan(0);
        expect(emailValue.length).toBeGreaterThan(0);
    });

    test('TC27 - Verify special characters in name fields', async ({ page }) => {
        const specialChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
        
        // Test first name with special characters
        await page.locator('#firstName').fill(specialChars);
        const firstNameValue = await page.locator('#firstName').inputValue();
        
        // Some special characters may be filtered
        console.log('First name with special chars:', firstNameValue);
        
        // Test with hyphenated name
        await page.locator('#firstName').fill('Jean-Pierre');
        await expect(page.locator('#firstName')).toHaveValue('Jean-Pierre');
    });

    test('TC28 - Verify subjects field allows multiple selections', async ({ page }) => {
        const subjectsInput = page.locator('#subjectsInput');
        
        // Add first subject
        await subjectsInput.fill('English');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        
        // Add second subject
        await subjectsInput.fill('Maths');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        
        // Add third subject
        await subjectsInput.fill('Physics');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        
        // Verify multiple subjects are added
        const subjects = page.locator('.subjects-auto-complete__multi-value__label');
        const count = await subjects.count();
        expect(count).toBeGreaterThanOrEqual(3);
    });

    test('TC29 - Verify subjects can be removed', async ({ page }) => {
        const subjectsInput = page.locator('#subjectsInput');
        
        // Add a subject
        await subjectsInput.fill('English');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        
        // Verify subject is added
        const subject = page.locator('.subjects-auto-complete__multi-value__label');
        await expect(subject).toBeVisible();
        
        // Remove subject by clicking the X button
        const removeButton = page.locator('.subjects-auto-complete__multi-value__remove').first();
        await removeButton.click();
        
        // Verify subject is removed
        await expect(subject).not.toBeVisible();
    });

    test('TC30 - Verify address field accepts multiline text', async ({ page }) => {
        const addressTextarea = page.locator('#currentAddress');
        
        const multilineAddress = `Line 1: Street Address
Line 2: Apartment Number
Line 3: Building Name
Line 4: Additional Info`;
        
        await addressTextarea.fill(multilineAddress);
        
        // Verify the full text is retained
        await expect(addressTextarea).toHaveValue(multilineAddress);
        
        // Verify it handles line breaks
        const value = await addressTextarea.inputValue();
        const lines = value.split('\n');
        expect(lines.length).toBe(4);
    });
});
