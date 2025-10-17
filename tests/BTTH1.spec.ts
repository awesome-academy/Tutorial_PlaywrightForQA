import { test, expect } from '@playwright/test';

test.describe('Register User Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
  });

  test('should register user with valid information', async ({ page }) => {
    // Fill form with user information
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#userEmail', 'john.doe@example.com');
    
    // Select gender
    await page.click('[for="gender-radio-1"]'); // Male
    
    // Fill mobile number
    await page.fill('#userNumber', '1234567890');
    
    // Select date of birth
    await page.click('#dateOfBirthInput');
    await page.selectOption('.react-datepicker__month-select', '0'); // January
    await page.selectOption('.react-datepicker__year-select', '1990');
    await page.click('.react-datepicker__day--001');
    
    // Fill subjects (autocomplete)
    await page.fill('#subjectsInput', 'Math');
    await page.keyboard.press('Enter');
    
    // Select hobbies
    await page.click('[for="hobbies-checkbox-1"]'); // Sports
    
    // Fill current address
    await page.fill('#currentAddress', '123 Main Street, City, Country');
    
    // Select state and city
    await page.click('#state');
    await page.click('text=NCR');
    await page.click('#city');
    await page.click('text=Delhi');
    
    // Submit form
    await page.click('#submit');
    
    // Verify successful registration
    await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
    
    // Verify submitted data
    await expect(page.locator('tbody')).toContainText('John Doe');
    await expect(page.locator('tbody')).toContainText('john.doe@example.com');
    await expect(page.locator('tbody')).toContainText('Male');
    await expect(page.locator('tbody')).toContainText('1234567890');
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('#submit');
    
    // Check for field validation (borders should turn red/invalid)
    await expect(page.locator('#firstName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('#lastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('#userNumber')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('should validate email format', async ({ page }) => {
    // Fill invalid email
    await page.fill('#userEmail', 'invalid-email');
    await page.click('#submit');
    
    // Check email field validation
    await expect(page.locator('#userEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});