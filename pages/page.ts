import {Page, Locator} from '@playwright/test';
import { todosData } from '../data/data';

export class todosPage {
    readonly page: Page
    readonly newTodoInput: Locator
    readonly todoList: Locator
    readonly todoCheckbox: Locator


    constructor(page: Page) {
        this.page = page
        this.newTodoInput = page.locator('input[class="new-todo"]')
        this.todoList = page.locator('ul[class="todo-list"] li')
        this.todoCheckbox = this.todoList.locator('input[class="toggle"]')
    }
    async gotoTodoPage(): Promise<void> {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/', { waitUntil: 'domcontentloaded',timeout: 6000 });
    }
    async addNewTodoItems(): Promise<void> {
        for (const todo of todosData.todoItems) {
            await this.newTodoInput.fill(todo);
            await this.newTodoInput.press('Enter');
        }
    }
    async clickOnTodoItemCheckbox(index: number): Promise<void> {
        await this.todoCheckbox.nth(index).check();
    }
    async deleteTodoItem(todoText: string): Promise<void> {
        const todoItem = this.todoList.filter({ hasText: todoText });
        await todoItem.hover();
        await todoItem.locator('button[class="destroy"]').click();
    }
}
