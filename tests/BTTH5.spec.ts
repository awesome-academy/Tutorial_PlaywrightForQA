import { test, expect } from '@playwright/test';

test('BTTH5', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByPlaceholder('What needs to be done?').fill('Task A');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Task B');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('Task C');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.getByTestId('todo-title').first()).toContainText('Task A');
    await expect(page.getByTestId('todo-title').nth(1)).toContainText('Task B');
    await expect(page.getByTestId('todo-title').nth(2)).toContainText('Task C');
    await page.getByTestId('todo-title').filter({hasText: 'Task B'}).hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByTestId('todo-title').filter({hasText: 'Task C'}).hover();
    await page.locator('//label[text()="Task C"]/preceding-sibling::input').click();
    await page.close();
});
