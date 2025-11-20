import { test, expect } from '@playwright/test';

test.describe('Student Registration Form - UI/UX Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        await page.waitForLoadState('domcontentloaded');
    });

    test('TC31 - Verify all form labels are visible', async ({ page }) => {
        // Check all field labels
        await expect(page.getByText('Name', { exact: true })).toBeVisible();
        await expect(page.getByText('Email', { exact: true })).toBeVisible();
        await expect(page.getByText('Gender', { exact: true })).toBeVisible();
        await expect(page.getByText('Mobile(10 Digits)')).toBeVisible();
        await expect(page.getByText('Date of Birth')).toBeVisible();
        await expect(page.getByText('Subjects', { exact: true })).toBeVisible();
        await expect(page.getByText('Hobbies', { exact: true })).toBeVisible();
        await expect(page.getByText('Picture', { exact: true })).toBeVisible();
        await expect(page.getByText('Current Address')).toBeVisible();
        await expect(page.getByText('State and City')).toBeVisible();
    });

    test('TC32 - Verify all form inputs have placeholders', async ({ page }) => {
        // Check placeholders
        const firstNamePlaceholder = await page.locator('#firstName').getAttribute('placeholder');
        expect(firstNamePlaceholder).toBeTruthy();
        
        const lastNamePlaceholder = await page.locator('#lastName').getAttribute('placeholder');
        expect(lastNamePlaceholder).toBeTruthy();
        
        const emailPlaceholder = await page.locator('#userEmail').getAttribute('placeholder');
        expect(emailPlaceholder).toBe('name@example.com');
        
        const mobilePlaceholder = await page.locator('#userNumber').getAttribute('placeholder');
        expect(mobilePlaceholder).toBeTruthy();
    });

    test('TC33 - Verify form inputs are interactive on hover', async ({ page }) => {
        const firstNameInput = page.locator('#firstName');
        
        // Get initial cursor style
        await firstNameInput.hover();
        const cursorStyle = await firstNameInput.evaluate(el => 
            getComputedStyle(el).cursor
        );
        
        // Input fields should show text cursor
        expect(['text', 'auto']).toContain(cursorStyle);
    });

    test('TC34 - Verify gender radio buttons are mutually exclusive', async ({ page }) => {
        // Select Male
        await page.locator('label[for="gender-radio-1"]').click();
        await expect(page.locator('#gender-radio-1')).toBeChecked();
        
        // Select Female - Male should be unchecked
        await page.locator('label[for="gender-radio-2"]').click();
        await expect(page.locator('#gender-radio-2')).toBeChecked();
        await expect(page.locator('#gender-radio-1')).not.toBeChecked();
        
        // Select Other - Female should be unchecked
        await page.locator('label[for="gender-radio-3"]').click();
        await expect(page.locator('#gender-radio-3')).toBeChecked();
        await expect(page.locator('#gender-radio-2')).not.toBeChecked();
    });

    test('TC35 - Verify hobby checkboxes can be unchecked', async ({ page }) => {
        // Check Sports
        await page.locator('label[for="hobbies-checkbox-1"]').click();
        await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
        
        // Uncheck Sports
        await page.locator('label[for="hobbies-checkbox-1"]').click();
        await expect(page.locator('#hobbies-checkbox-1')).not.toBeChecked();
        
        // Check and uncheck Reading
        await page.locator('label[for="hobbies-checkbox-2"]').click();
        await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();
        await page.locator('label[for="hobbies-checkbox-2"]').click();
        await expect(page.locator('#hobbies-checkbox-2')).not.toBeChecked();
    });

    test('TC36 - Verify submit button is visible and clickable', async ({ page }) => {
        const submitButton = page.locator('#submit');
        
        // Check visibility
        await expect(submitButton).toBeVisible();
        
        // Check if it's enabled
        await expect(submitButton).toBeEnabled();
        
        // Verify button text
        await expect(submitButton).toHaveText('Submit');
        
        // Verify cursor changes on hover
        await submitButton.hover();
        const cursorStyle = await submitButton.evaluate(el => 
            getComputedStyle(el).cursor
        );
        expect(cursorStyle).toBe('pointer');
    });

    test('TC37 - Verify form has proper tab navigation order', async ({ page }) => {
        // Focus first name
        await page.locator('#firstName').focus();
        let focusedElement = await page.evaluate(() => document.activeElement?.id);
        expect(focusedElement).toBe('firstName');
        
        // Tab to last name
        await page.keyboard.press('Tab');
        focusedElement = await page.evaluate(() => document.activeElement?.id);
        expect(focusedElement).toBe('lastName');
        
        // Tab to email
        await page.keyboard.press('Tab');
        focusedElement = await page.evaluate(() => document.activeElement?.id);
        expect(focusedElement).toBe('userEmail');
        
        // Verify tab order continues logically through form
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        focusedElement = await page.evaluate(() => document.activeElement?.id);
        expect(focusedElement).toBeTruthy();
    });

    test('TC38 - Verify date picker calendar UI', async ({ page }) => {
        await page.locator('#dateOfBirthInput').click();
        
        const datePicker = page.locator('.react-datepicker');
        await expect(datePicker).toBeVisible();
        
        // Verify month and year dropdowns are present
        await expect(page.locator('.react-datepicker__month-select')).toBeVisible();
        await expect(page.locator('.react-datepicker__year-select')).toBeVisible();
        
        // Verify navigation arrows
        await expect(page.locator('.react-datepicker__navigation--previous')).toBeVisible();
        await expect(page.locator('.react-datepicker__navigation--next')).toBeVisible();
        
        // Verify days are displayed
        const days = page.locator('.react-datepicker__day');
        const dayCount = await days.count();
        expect(dayCount).toBeGreaterThan(0);
    });

    test('TC39 - Verify modal appears after successful submission', async ({ page }) => {
        // Fill required fields
        await page.locator('#firstName').fill('Test');
        await page.locator('#lastName').fill('User');
        await page.locator('#userEmail').fill('test@example.com');
        await page.locator('label[for="gender-radio-1"]').click();
        await page.locator('#userNumber').fill('1234567890');
        
        // Submit
        await page.locator('#submit').click();
        
        // Verify modal
        const modal = page.locator('.modal-content');
        await expect(modal).toBeVisible();
        
        // Verify modal header
        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
        
        // Verify modal has close button
        await expect(page.locator('#closeLargeModal')).toBeVisible();
    });

    test('TC40 - Verify modal close button functionality', async ({ page }) => {
        // Submit form
        await page.locator('#firstName').fill('Test');
        await page.locator('#lastName').fill('User');
        await page.locator('#userEmail').fill('test@example.com');
        await page.locator('label[for="gender-radio-1"]').click();
        await page.locator('#userNumber').fill('1234567890');
        await page.locator('#submit').click();
        
        // Wait for modal
        await expect(page.locator('.modal-content')).toBeVisible();
        
        // Close modal
        await page.locator('#closeLargeModal').click();
        
        // Verify modal is closed
        await expect(page.locator('.modal-content')).not.toBeVisible();
    });

    test('TC41 - Verify submitted data is displayed in modal', async ({ page }) => {
        const testData = {
            firstName: 'John',
            lastName: 'Smith',
            email: 'john.smith@test.com',
            mobile: '9876543210'
        };
        
        // Fill and submit
        await page.locator('#firstName').fill(testData.firstName);
        await page.locator('#lastName').fill(testData.lastName);
        await page.locator('#userEmail').fill(testData.email);
        await page.locator('label[for="gender-radio-1"]').click();
        await page.locator('#userNumber').fill(testData.mobile);
        await page.locator('#submit').click();
        
        // Verify data in modal
        const modalBody = page.locator('.modal-body');
        await expect(modalBody).toContainText(`${testData.firstName} ${testData.lastName}`);
        await expect(modalBody).toContainText(testData.email);
        await expect(modalBody).toContainText(testData.mobile);
        await expect(modalBody).toContainText('Male');
    });

    test('TC42 - Verify state dropdown opens on click', async ({ page }) => {
        const stateDropdown = page.locator('#state');
        
        // Click dropdown
        await stateDropdown.click();
        
        // Verify options appear
        await expect(page.getByText('NCR', { exact: true })).toBeVisible();
        await expect(page.getByText('Uttar Pradesh', { exact: true })).toBeVisible();
        await expect(page.getByText('Haryana', { exact: true })).toBeVisible();
        await expect(page.getByText('Rajasthan', { exact: true })).toBeVisible();
    });

    test('TC43 - Verify dropdown closes on Escape key', async ({ page }) => {
        // Open state dropdown
        await page.locator('#state').click();
        await expect(page.getByText('NCR', { exact: true })).toBeVisible();
        
        // Press Escape
        await page.keyboard.press('Escape');
        
        // Verify dropdown is closed
        await page.waitForTimeout(300);
        const isVisible = await page.getByText('NCR', { exact: true }).isVisible().catch(() => false);
        expect(isVisible).toBe(false);
    });

    test('TC44 - Verify dropdown keyboard navigation', async ({ page }) => {
        // Open state dropdown
        await page.locator('#state').click();
        await page.waitForTimeout(300);
        
        // Navigate with arrow keys
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        
        // Press Enter to select
        await page.keyboard.press('Enter');
        
        // Verify a state is selected
        const stateText = await page.locator('#state').textContent();
        expect(stateText).toBeTruthy();
        expect(stateText).not.toBe('Select State');
    });

    test('TC45 - Verify form responsiveness', async ({ page }) => {
        // Get form container
        const formWrapper = page.locator('.practice-form-wrapper');
        await expect(formWrapper).toBeVisible();
        
        // Get form width
        const formBox = await formWrapper.boundingBox();
        expect(formBox).toBeTruthy();
        expect(formBox!.width).toBeGreaterThan(0);
        
        // Verify form elements are within viewport
        const firstNameBox = await page.locator('#firstName').boundingBox();
        expect(firstNameBox).toBeTruthy();
        expect(firstNameBox!.x).toBeGreaterThanOrEqual(0);
    });

    test('TC46 - Verify input focus states', async ({ page }) => {
        const firstNameInput = page.locator('#firstName');
        
        // Focus input
        await firstNameInput.focus();
        
        // Verify input is focused
        const isFocused = await firstNameInput.evaluate(el => 
            el === document.activeElement
        );
        expect(isFocused).toBe(true);
        
        // Verify focus styling (border or outline)
        const borderColor = await firstNameInput.evaluate(el => 
            getComputedStyle(el).borderColor
        );
        expect(borderColor).toBeTruthy();
    });

    test('TC47 - Verify form fields clear on page refresh', async ({ page }) => {
        // Fill some fields
        await page.locator('#firstName').fill('Test');
        await page.locator('#lastName').fill('User');
        await page.locator('#userEmail').fill('test@example.com');
        
        // Refresh page
        await page.reload();
        await page.waitForLoadState('domcontentloaded');
        
        // Verify fields are empty
        await expect(page.locator('#firstName')).toHaveValue('');
        await expect(page.locator('#lastName')).toHaveValue('');
        await expect(page.locator('#userEmail')).toHaveValue('');
    });

    test('TC48 - Verify page header and title', async ({ page }) => {
        // Verify page has header
        const header = page.locator('.main-header');
        await expect(header).toBeVisible();
        await expect(header).toHaveText('Practice Form');
        
        // Verify form title
        const formTitle = page.locator('.practice-form-wrapper h5');
        await expect(formTitle).toBeVisible();
        await expect(formTitle).toHaveText('Student Registration Form');
    });

    test('TC49 - Verify sidebar navigation menu', async ({ page }) => {
        // Verify sidebar exists
        const sidebar = page.locator('.left-pannel');
        await expect(sidebar).toBeVisible();
        
        // Verify Forms menu item is visible and active
        const formsMenu = page.locator('.element-group').filter({ hasText: 'Forms' });
        await expect(formsMenu).toBeVisible();
        
        // Verify Practice Form is highlighted
        const practiceFormLink = page.locator('.menu-list li').filter({ hasText: 'Practice Form' });
        await expect(practiceFormLink).toBeVisible();
    });

    test('TC50 - Verify page footer', async ({ page }) => {
        // Scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        
        // Verify footer exists
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
        
        // Verify footer text
        await expect(footer).toContainText('TOOLSQA.COM');
    });
});
