import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PracticeFormPage extends BasePage {
    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly mobileInput: Locator;
    private readonly submitButton: Locator;
    private readonly modalTitle: Locator;
    private readonly formTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.mobileInput = page.locator('#userNumber');
        this.submitButton = page.locator('#submit');
        this.modalTitle = page.locator('#example-modal-sizes-title-lg');
        this.formTitle = page.locator('.practice-form-wrapper h5');
    }

    // Navigation methods
    async goto() {
        await this.page.goto('https://demoqa.com/automation-practice-form');
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.firstNameInput).toBeVisible();
    }

    // Form filling methods
    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillMobileNumber(mobile: string) {
        await this.mobileInput.fill(mobile);
    }

    async fillPersonalInfo(firstName: string, lastName: string, email: string, mobile: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillMobileNumber(mobile);
    }

    // Gender selection methods
    async selectGender(gender: 'male' | 'female' | 'other') {
        const genderMap = {
            'male': 'label[for="gender-radio-1"]',
            'female': 'label[for="gender-radio-2"]',
            'other': 'label[for="gender-radio-3"]'
        };
        await this.page.click(genderMap[gender]);
    }

    // Hobbies selection methods
    async selectHobby(hobby: 'sports' | 'reading' | 'music') {
        const hobbyMap = {
            'sports': 'label[for="hobbies-checkbox-1"]',
            'reading': 'label[for="hobbies-checkbox-2"]',
            'music': 'label[for="hobbies-checkbox-3"]'
        };
        await this.page.click(hobbyMap[hobby]);
    }

    async selectMultipleHobbies(hobbies: Array<'sports' | 'reading' | 'music'>) {
        for (const hobby of hobbies) {
            await this.selectHobby(hobby);
        }
    }

    // Interaction methods
    async hoverOnTitle() {
        await this.formTitle.hover();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    // Verification methods
    async verifySuccessModal() {
        await expect(this.modalTitle).toHaveText('Thanks for submitting the form');
    }

    async verifyFormTitle() {
        await expect(this.formTitle).toBeVisible();
    }

    // Complete form submission workflow
    async fillAndSubmitForm(userData: {
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        gender: 'male' | 'female' | 'other';
        hobbies: Array<'sports' | 'reading' | 'music'>;
    }) {
        await this.fillPersonalInfo(userData.firstName, userData.lastName, userData.email, userData.mobile);
        await this.selectGender(userData.gender);
        await this.selectMultipleHobbies(userData.hobbies);
        await this.hoverOnTitle();
        await this.submitForm();
    }
}