import {test, expect} from  './fixtures/login-fixture';

test.afterEach(async ({page})=>{
    page.close();
})
test('Check Dashboard displays', async({demoOrange})=>{
    await demoOrange.goto('https://www.saucedemo.com/cart.html');
    await expect(demoOrange.getByText('Your Cart')).toBeVisible();
    await demoOrange.getByRole('button', {name :'Checkout'}).click();
    await expect(demoOrange.getByText('Checkout: Your Information')).toBeVisible();
 }
)
