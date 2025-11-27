import { test, expect } from '@playwright/test';
const datainput =
{
itema:'Item A',
itemb:'Item B',
itemc: 'Item C'
};
test('locatorcachchonphantu', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  const vitrithe = page.locator('div.view');

  await page.fill('.new-todo',datainput.itema);
  await page.press('.new-todo','Enter');
  await page.fill('.new-todo',datainput.itemb);
  await page.press('.new-todo','Enter');
  await page.fill('.new-todo',datainput.itemc);
  await page.press('.new-todo','Enter');
  //Kiểm tra expect 3 item

  await expect(vitrithe.first()).toContainText(datainput.itema);
  await expect(vitrithe.nth(1)).toContainText(datainput.itemb);
  await expect(vitrithe.nth(2)).toContainText(datainput.itemc);
  // Tick chọn item thứ 2
  await vitrithe.nth(1).click();
  // Xóa item thứ 3
  const buttonthethu3 = vitrithe.nth(2)
  await buttonthethu3.hover();
  const xbuttonthu3 = buttonthethu3.locator('button.destroy');
  await xbuttonthu3.click();
});