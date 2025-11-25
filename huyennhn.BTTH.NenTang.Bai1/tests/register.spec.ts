import { test, expect } from '@playwright/test';

test('register user', async ({ page }) => {
    //Access
    await page.goto('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register');
     //Check display: 'Register' 
    await expect(page.locator('h2')).toHaveText('Register');

    //Register account
     //Define field
    const firstname = page.locator('#firstName');
    const lastname = page.locator('#Text1');
    const username = page.getByRole('textbox',{name:'Username'});
    const password = page.getByRole('textbox',{name:'Password'});
    const btnregister = page.getByRole('button',{name:'Register'});
     // Check visible fields
    await expect(firstname).toBeVisible();
    await expect(lastname).toBeVisible();
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
     //Define data
     const ten = 'Huyen';
     const ho = 'Nguyen';
     const us = 'huyennhn';
     const pwd = '123456';
     //Input data
    await firstname.fill(ten);
    await lastname.fill(ho);
    await username.fill(us);
    await password.fill(pwd);
    await btnregister.click();

     //Register successfully: display msg & open login screen          
        //Check display exact url - print url.
    await page.waitForURL(/login/);
    console.log(`Current url:`,page.url());
        //Check display msg
    const msg = page.getByText('Registration successful');
    await msg.waitFor({state: 'visible'});
    await expect(msg).toBeVisible();
        //Display 'Login'
    await expect(page.locator('h2')).toHaveText('Login');
     //Reload and check no display msg
    await page.reload();
    await expect(page).toHaveURL(/login/);
        //Check hide msg
    await msg.waitFor({state:'detached'});
    await expect(page.getByText('Registration successful')).not.toBeVisible();
    


    //Login
     //Define field
    const loguser = page.getByRole('textbox',{name:'Username'});
    const logpwd = page.getByRole('textbox',{name:'Password'});
    const btnlog = page.getByRole('button',{name:'Login'});
     // Check visible fields
    await expect(loguser).toBeVisible();
    await expect(logpwd).toBeVisible();
     // Input account
    await loguser.fill(us);
    await logpwd.fill(pwd);
    await btnlog.click();
     //Login successfully
        //Check Url
    await page.waitForURL('**/registration-login-example/#/');
    await expect(page).toHaveURL('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/');
        //Check info
    await expect(page.locator('h1')).toHaveText(`Hi ${ten}!`);
    await expect(page.getByText("You're logged in!!")).toBeVisible();
    await expect(page.locator('h3')).toHaveText('All registered users:');
        //Check display item on list
    const item = page.getByText(new RegExp(`${us} \\(${ten} ${ho}\\)`)); //matching: username firstname lastname - skip " - "
    await expect(item).toBeVisible();
                //Check text link Delete of item
    await expect(item.getByRole('link',{name: 'Delete'})).toBeVisible();
            //Check btn Logout
    const btnlogout = page.locator('a',{hasText: 'Logout' });
    await expect(btnlogout).toBeVisible();


    //Logout
    await btnlogout.click();
        //Check display exact url - print url.
    await page.waitForURL(/login/);
    console.log(`Current url:`,page.url());
        //Display 'Login'
    await expect(page.locator('h2')).toHaveText('Login');
        //No msg
    await expect(page.getByText('Registration successful')).not.toBeVisible();
});