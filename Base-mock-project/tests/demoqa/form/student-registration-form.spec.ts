import { test, expect } from '@playwright/test';

test.describe('Student Registration Form - DemoQA', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/automation-practice-form');
        await page.waitForLoadState('domcontentloaded');
    });

    test('TC01 - Verify form page loads successfully', async ({ page }) => {
        // Verify page title
        await expect(page).toHaveTitle('DEMOQA');
        
        // Verify form heading
        const formHeading = page.locator('.practice-form-wrapper h5');
        await expect(formHeading).toBeVisible();
        await expect(formHeading).toHaveText('Student Registration Form');
        
        // Verify main title
        const mainTitle = page.locator('.main-header');
        await expect(mainTitle).toHaveText('Practice Form');
    });

    test('TC02 - Fill all required fields and submit successfully', async ({ page }) => {
        // Fill Name
        await page.locator('#firstName').fill('John');
        await page.locator('#lastName').fill('Doe');
        
        // Fill Email
        await page.locator('#userEmail').fill('john.doe@example.com');
        
        // Select Gender
        await page.locator('label[for="gender-radio-1"]').click();
        
        // Fill Mobile Number
        await page.locator('#userNumber').fill('1234567890');
        
        // Submit form
        await page.locator('#submit').click();
        
        // Verify success modal
        const modalTitle = page.locator('#example-modal-sizes-title-lg');
        await expect(modalTitle).toBeVisible();
        await expect(modalTitle).toHaveText('Thanks for submitting the form');
    });

    test('TC03 - Verify all gender options are selectable', async ({ page }) => {
        // Test Male radio button
        const maleRadio = page.locator('label[for="gender-radio-1"]');
        await maleRadio.click();
        await expect(page.locator('#gender-radio-1')).toBeChecked();
        
        // Test Female radio button
        const femaleRadio = page.locator('label[for="gender-radio-2"]');
        await femaleRadio.click();
        await expect(page.locator('#gender-radio-2')).toBeChecked();
        
        // Test Other radio button
        const otherRadio = page.locator('label[for="gender-radio-3"]');
        await otherRadio.click();
        await expect(page.locator('#gender-radio-3')).toBeChecked();
    });

    test('TC04 - Verify multiple hobbies can be selected', async ({ page }) => {
        // Select Sports
        await page.locator('label[for="hobbies-checkbox-1"]').click();
        await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
        
        // Select Reading
        await page.locator('label[for="hobbies-checkbox-2"]').click();
        await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();
        
        // Select Music
        await page.locator('label[for="hobbies-checkbox-3"]').click();
        await expect(page.locator('#hobbies-checkbox-3')).toBeChecked();
        
        // Verify all three are still checked
        await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
        await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();
        await expect(page.locator('#hobbies-checkbox-3')).toBeChecked();
    });

    test('TC05 - Verify Date of Birth picker functionality', async ({ page }) => {
        const dobInput = page.locator('#dateOfBirthInput');
        
        // Click to open date picker
        await dobInput.click();
        
        // Verify date picker is visible
        const datePicker = page.locator('.react-datepicker');
        await expect(datePicker).toBeVisible();
        
        // Select year
        await page.locator('.react-datepicker__year-select').selectOption('1990');
        
        // Select month
        await page.locator('.react-datepicker__month-select').selectOption('0'); // January
        
        // Select day
        await page.locator('.react-datepicker__day--015').first().click();
        
        // Verify selected date
        await expect(dobInput).toHaveValue('15 Jan 1990');
    });

    test('TC06 - Verify State and City dropdown cascading', async ({ page }) => {
        // Click State dropdown
        await page.locator('#state').click();
        
        // Verify states are visible
        const ncrOption = page.getByText('NCR', { exact: true });
        await expect(ncrOption).toBeVisible();
        
        // Select NCR
        await ncrOption.click();
        
        // Verify NCR is selected
        await expect(page.locator('#state')).toContainText('NCR');
        
        // Click City dropdown
        await page.locator('#city').click();
        
        // Verify cities for NCR are visible
        const delhiOption = page.getByText('Delhi', { exact: true });
        await expect(delhiOption).toBeVisible();
        
        // Select Delhi
        await delhiOption.click();
        
        // Verify Delhi is selected
        await expect(page.locator('#city')).toContainText('Delhi');
    });

    test('TC07 - Verify all state options', async ({ page }) => {
        // Click State dropdown
        await page.locator('#state').click();
        
        // Verify all states are available
        await expect(page.getByText('NCR', { exact: true })).toBeVisible();
        await expect(page.getByText('Uttar Pradesh', { exact: true })).toBeVisible();
        await expect(page.getByText('Haryana', { exact: true })).toBeVisible();
        await expect(page.getByText('Rajasthan', { exact: true })).toBeVisible();
    });

    test('TC08 - Verify city options for each state', async ({ page }) => {
        // Test NCR cities
        await page.locator('#state').click();
        await page.getByText('NCR', { exact: true }).click();
        await page.locator('#city').click();
        await expect(page.getByText('Delhi', { exact: true })).toBeVisible();
        await expect(page.getByText('Gurgaon', { exact: true })).toBeVisible();
        await expect(page.getByText('Noida', { exact: true })).toBeVisible();
        
        // Close dropdown and reset
        await page.keyboard.press('Escape');
        
        // Test Uttar Pradesh cities
        await page.locator('#state').click();
        await page.getByText('Uttar Pradesh', { exact: true }).click();
        await page.locator('#city').click();
        await expect(page.getByText('Agra', { exact: true })).toBeVisible();
        await expect(page.getByText('Lucknow', { exact: true })).toBeVisible();
        await expect(page.getByText('Meерut', { exact: true })).toBeVisible();
    });

    test('TC09 - Verify Subjects field autocomplete', async ({ page }) => {
        const subjectsInput = page.locator('#subjectsInput');
        
        // Type partial subject name
        await subjectsInput.fill('Mat');
        
        // Wait for autocomplete suggestions
        await page.waitForTimeout(500);
        
        // Verify suggestions appear
        const autocompleteOptions = page.locator('.subjects-auto-complete__menu');
        await expect(autocompleteOptions).toBeVisible();
        
        // Select first suggestion
        await page.keyboard.press('Enter');
        
        // Verify subject is added
        const selectedSubject = page.locator('.subjects-auto-complete__multi-value__label');
        await expect(selectedSubject).toBeVisible();
    });

    test('TC10 - Verify Current Address textarea', async ({ page }) => {
        const addressTextarea = page.locator('#currentAddress');
        
        const testAddress = '123 Main Street\nApartment 4B\nCity, State 12345';
        await addressTextarea.fill(testAddress);
        
        // Verify address is entered correctly
        await expect(addressTextarea).toHaveValue(testAddress);
    });

    test('TC11 - Verify email validation', async ({ page }) => {
        const emailInput = page.locator('#userEmail');
        
        // Enter invalid email
        await emailInput.fill('invalid-email');
        
        // Click outside to trigger validation
        await page.locator('#firstName').click();
        
        // Check if email field has error class
        const hasError = await emailInput.evaluate(el => 
            el.classList.contains('field-error') || 
            getComputedStyle(el).borderColor === 'rgb(255, 0, 0)'
        );
        
        expect(hasError).toBeTruthy();
    });

    test('TC12 - Verify mobile number validation (10 digits)', async ({ page }) => {
        const mobileInput = page.locator('#userNumber');
        
        // Test with less than 10 digits
        await mobileInput.fill('12345');
        await page.locator('#firstName').click();
        
        // Test with exactly 10 digits
        await mobileInput.fill('1234567890');
        
        // Verify the value
        await expect(mobileInput).toHaveValue('1234567890');
    });

    test('TC13 - Complete form submission with all fields', async ({ page }) => {
        // Fill all fields
        await page.locator('#firstName').fill('Alice');
        await page.locator('#lastName').fill('Johnson');
        await page.locator('#userEmail').fill('alice.johnson@test.com');
        await page.locator('label[for="gender-radio-2"]').click();
        await page.locator('#userNumber').fill('9876543210');
        
        // Date of Birth
        await page.locator('#dateOfBirthInput').click();
        await page.locator('.react-datepicker__year-select').selectOption('1995');
        await page.locator('.react-datepicker__month-select').selectOption('5'); // June
        await page.locator('.react-datepicker__day--015').first().click();
        
        // Subjects
        await page.locator('#subjectsInput').fill('English');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        
        // Hobbies
        await page.locator('label[for="hobbies-checkbox-2"]').click();
        await page.locator('label[for="hobbies-checkbox-3"]').click();
        
        // Current Address
        await page.locator('#currentAddress').fill('456 Oak Avenue\nSuite 100');
        
        // State and City
        await page.locator('#state').click();
        await page.getByText('Haryana', { exact: true }).click();
        await page.locator('#city').click();
        await page.getByText('Karnal', { exact: true }).click();
        
        // Submit
        await page.locator('#submit').click();
        
        // Verify modal
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
        
        // Verify submitted data in modal
        const modalContent = page.locator('.modal-body');
        await expect(modalContent).toContainText('Alice Johnson');
        await expect(modalContent).toContainText('alice.johnson@test.com');
        await expect(modalContent).toContainText('Female');
        await expect(modalContent).toContainText('9876543210');
    });

    test('TC14 - Verify form fields are editable', async ({ page }) => {
        // Fill first name
        await page.locator('#firstName').fill('Original');
        await expect(page.locator('#firstName')).toHaveValue('Original');
        
        // Edit first name
        await page.locator('#firstName').fill('Updated');
        await expect(page.locator('#firstName')).toHaveValue('Updated');
        
        // Verify clear and refill
        await page.locator('#firstName').clear();
        await expect(page.locator('#firstName')).toHaveValue('');
        await page.locator('#firstName').fill('Final');
        await expect(page.locator('#firstName')).toHaveValue('Final');
    });

    test('TC15 - Verify form can be submitted multiple times', async ({ page }) => {
        // First submission
        await page.locator('#firstName').fill('First');
        await page.locator('#lastName').fill('User');
        await page.locator('#userEmail').fill('first@test.com');
        await page.locator('label[for="gender-radio-1"]').click();
        await page.locator('#userNumber').fill('1111111111');
        await page.locator('#submit').click();
        
        // Close modal
        await page.locator('#closeLargeModal').click();
        await page.waitForTimeout(500);
        
        // Second submission
        await page.locator('#firstName').clear();
        await page.locator('#firstName').fill('Second');
        await page.locator('#lastName').clear();
        await page.locator('#lastName').fill('User');
        await page.locator('#userEmail').clear();
        await page.locator('#userEmail').fill('second@test.com');
        await page.locator('#userNumber').clear();
        await page.locator('#userNumber').fill('2222222222');
        await page.locator('#submit').click();
        
        // Verify second submission
        await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
    });
});
