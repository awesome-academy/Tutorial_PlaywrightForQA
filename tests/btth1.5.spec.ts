import { test, expect } from "@playwright/test";

test("test: Todo MVC", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");

  await page.fill(".new-todo", "task 1");

  await page.keyboard.press("Enter");

  await page.fill(".new-todo", "task 2");

  await page.keyboard.press("Enter");

  await page.fill(".new-todo", "task 3");

  await page.keyboard.press("Enter");

  await page.locator(".toggle").nth(1).check();

  // expectation
  await expect(page.locator('[data-testid="todo-title"]').first()).toHaveText(
    "task 1"
  );

  const lastItem = page
    .locator('[data-testid="todo-item"]')
    .filter({ hasText: "task 3" });

  await lastItem.locator(".toggle").check();
  await lastItem.hover();
  await lastItem.locator(".destroy").click();

  await expect(page.locator(".todo-list li")).toHaveCount(2);
});
