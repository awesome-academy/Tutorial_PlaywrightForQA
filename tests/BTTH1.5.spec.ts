import {test, expect} from '@playwright/test';
import { todosPage } from '../pages/page';

test.describe('BTTH1.5 Tests', () => {
    test('Add new todo items', async ({ page }) => {
        const todoPage = new todosPage(page);
    // Go to Todo page
        await todoPage.gotoTodoPage();
    // Add new todo items
        await todoPage.addNewTodoItems();
        await expect(todoPage.todoList).toHaveCount(3);
    // Click on Todo item second checkbox
        await todoPage.clickOnTodoItemCheckbox(1);
        await expect(todoPage.todoCheckbox.nth(1)).toBeChecked();
    // Delete Todo item with text 'Task C'
        await todoPage.deleteTodoItem('Task C');
        await expect(todoPage.todoList).toHaveCount(2);
    });
});
