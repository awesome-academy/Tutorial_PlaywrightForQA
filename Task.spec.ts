import { expect, test } from '@playwright/test';
test('task', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  const input = page.locator('.new-todo');
  await input.fill('Task A');
  await input.press('Enter');
  await input.fill('Task B');
  await input.press('Enter');
  await input.fill('Task C');
  await input.press('Enter');
  await page.locator('.toggle').nth(1).check();
  await expect(page.locator('.todo-list li label').first()).toHaveText('Task A');
  const taskC = page.locator('.todo-list li').filter({ hasText: 'Task C' });
  await taskC.hover();
  await taskC.locator('.destroy').click();
  await expect(page.locator('.todo-list li label').filter({ hasText: 'Task C' })).toHaveCount(0);
});
