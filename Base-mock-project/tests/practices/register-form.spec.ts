import { test, expect } from '../../src/fixtures/baseFixtures';

test.describe('Register Form Tests with POM & Fixtures', () => {
    // Set timeout for all tests in this describe block
    // test.setTimeout(60000); // 60 seconds

    test('Register Form: Complete user registration flow', async ({ practiceFormPage }) => {
        // Navigate to practice form (now using fixture)
        await practiceFormPage.goto();

        // Fill out registration form using POM methods
        await practiceFormPage.fillPersonalInfo(
            'Tra',
            'Pham',
            'tra.pham@example.com',
            '0912345678'
        );

        // Select gender
        await practiceFormPage.selectGender('female');

        // Select hobbies
        await practiceFormPage.selectMultipleHobbies(['reading', 'music']);

        // Hover on title for interaction demonstration
        await practiceFormPage.hoverOnTitle();

        // Submit the form
        await practiceFormPage.submitForm();

        // Verify successful registration
        await practiceFormPage.verifySuccessModal();
    });

    test('Register Form: Comprehensive registration with all fields', async ({ practiceFormPage }) => {
        // Navigate to form
        await practiceFormPage.goto();

        // Comprehensive registration flow
        await practiceFormPage.fillAndSubmitForm({
            firstName: 'Sarah',
            lastName: 'Wilson',
            email: 'sarah.wilson@company.com',
            mobile: '0555444333',
            gender: 'female',
            hobbies: ['reading', 'music']
        });

        // Verify successful registration
        await practiceFormPage.verifySuccessModal();
    });
});