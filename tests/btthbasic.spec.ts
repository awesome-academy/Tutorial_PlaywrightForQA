import { test, expect } from "@playwright/test";

test("test: Todo List", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/03-xpath-todo-list.html");
  await page.getByRole("textbox", { name: "Enter a new task" }).fill("toan456");
  await page.getByRole("button", { name: "Add Task" }).click();
  await expect(page.locator("#task-list")).toHaveCount(1);

  const firstTask = page.locator("#task-list li").first();
  await expect(firstTask.locator("span")).toHaveText("toan456");
});
