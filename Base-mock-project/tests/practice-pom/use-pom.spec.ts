import { test, expect } from '@playwright/test';
import { PageManager } from '../../src/pages/PageManager';

test.describe('Practice Form with POM Pattern', () => {
    test('Practice Form: Interact with all input types (Using POM)', async ({ page }) => {
        // Initialize Page Manager
        const pageManager = new PageManager(page);
        const practiceFormPage = pageManager.getPracticeFormPage();

        // 1. Navigate to Practice Form
        await practiceFormPage.goto();

        // 2. Fill personal information using POM methods
        await practiceFormPage.fillPersonalInfo(
            'Tra',
            'Pham', 
            'tra.pham@example.com',
            '0912345678'
        );

        // 3. Select gender using POM method
        await practiceFormPage.selectGender('female');

        // 4. Select hobbies using POM method
        await practiceFormPage.selectMultipleHobbies(['reading', 'music']);

        // 5. Hover on title using POM method
        await practiceFormPage.hoverOnTitle();

        // 6. Submit form using POM method
        await practiceFormPage.submitForm();

        // 7. Verify success modal using POM method
        await practiceFormPage.verifySuccessModal();
    });

    test('Practice Form: Step by step verification', async ({ page }) => {
        // Initialize Page Manager
        const pageManager = new PageManager(page);
        const practiceFormPage = pageManager.getPracticeFormPage();

        // 1. Navigate and verify form loads
        await practiceFormPage.goto();
        await practiceFormPage.verifyFormTitle();

        // 2. Fill form step by step
        await practiceFormPage.fillFirstName('Alice');
        await practiceFormPage.fillLastName('Johnson');
        await practiceFormPage.fillEmail('alice.johnson@example.com');
        await practiceFormPage.fillMobileNumber('0123456789');

        // 3. Select options
        await practiceFormPage.selectGender('other');
        await practiceFormPage.selectHobby('music');

        // 4. Interact and submit
        await practiceFormPage.hoverOnTitle();
        await practiceFormPage.submitForm();

        // 5. Verify result
        await practiceFormPage.verifySuccessModal();
    });

    test('Practice Form: Complete workflow using single method', async ({ page }) => {
        // Initialize Page Manager
        const pageManager = new PageManager(page);
        const practiceFormPage = pageManager.getPracticeFormPage();

        // Navigate to form
        await practiceFormPage.goto();

        // Use the complete workflow method (without verification)
        await practiceFormPage.fillAndSubmitForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            mobile: '0987654321',
            gender: 'male',
            hobbies: ['sports', 'reading']
        });

        // Verify result separately
        await practiceFormPage.verifySuccessModal();
    });
});