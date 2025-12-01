import { test, expect } from '@playwright/test';

test('task management', async ({ page }) => {
    //access page
    await page.goto('https://demo.playwright.dev/todomvc');

    //Check access and display page
        //url
    await expect(page).toHaveURL('https://demo.playwright.dev/todomvc/#/');
        //check element on screen
            //banner
    await expect(page.getByText('This is just a demo of TodoMVC for testing, not the ')).toBeVisible();
            //text link on banner
    const link = page.locator('a',{hasText: 'real TodoMVC app.'});
    await expect(link).toBeVisible();
    //await link.click();

    //Create task
    const task1 = 'Task A';
    const task2 = 'Task B';
    const task3 = 'Task C';
    const txt = page.getByRole('textbox',{name: 'What needs to be done?'});
    await expect(txt).toBeVisible();
    await txt.fill(task1);
    await txt.press('Enter');
    await txt.fill(task2);
    await txt.press('Enter');
    await txt.fill(task3);
    await txt.press('Enter');  

    //Check display 
    const todolist = page.locator('.todo-list li');
    await expect(todolist).toHaveCount(3); //total 3 bản ghi
    await expect(todolist.first()).toHaveText(task1);
    await expect(todolist.nth(1)).toHaveText(task2);
    await expect(todolist.last()).toHaveText(task3);

    // Tick the 2nd task
    const ticktask2 = todolist.nth(1).getByRole('checkbox',{name: 'Toggle Todo'});
    await ticktask2.check();
    await expect(ticktask2).toBeChecked();

    //Find Task C
    const deletetask = todolist.filter({hasText: `${task3}`});
    await deletetask.hover();
    await deletetask.getByRole('button',{name: 'Delete'}).click();
        //delete successfully
    await expect(todolist).toHaveCount(2); 
    await expect(todolist.first()).toHaveText(task1);
    await expect(todolist.nth(1)).toHaveText(task2);
});