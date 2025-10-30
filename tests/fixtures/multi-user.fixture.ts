import { test as base, expect } from '@playwright/test';

export type UserType = 'standard_user' | 'problem_user' | 'performance_glitch_user' | 'visual_user';

const userCredentials: Record<UserType, { username: string; password: string }> = {
  standard_user: {
    username: 'standard_user', 
    password: 'secret_sauce' 
  },
  problem_user: { 
    username: 'problem_user', 
    password: 'secret_sauce' 
  },
  performance_glitch_user: { 
    username: 'performance_glitch_user', 
    password: 'secret_sauce' 
  },
  visual_user: { 
    username: 'visual_user', 
    password: 'secret_sauce' 
  }
};

type MultiUserFixtures = {
  loginAs: (userType: UserType) => Promise<void>;
  authenticatedUser: (userType: UserType) => Promise<any>; 
};

export const test = base.extend<MultiUserFixtures>({
  loginAs: async ({ page }, use) => {
    const loginAs = async (userType: UserType) => {
      console.log(`🔐 Logging in as ${userType}`);
      const credentials = userCredentials[userType];
      
      await page.goto('https://www.saucedemo.com/');
      await page.fill('[data-test="username"]', credentials.username);
      await page.fill('[data-test="password"]', credentials.password);
      await page.click('[data-test="login-button"]');
      await page.waitForURL('**/inventory.html', { timeout: 10000 });
      
      console.log(`✅ Successfully logged in as ${userType}`);
    };

    await use(loginAs);
  },

  authenticatedUser: async ({ browser }, use) => {
    const authenticatedUser = async (userType: UserType) => {
      console.log(`🔐 Creating authenticated context for ${userType}`);
      const credentials = userCredentials[userType];
      
      const context = await browser.newContext();
      const page = await context.newPage();
      
      await page.goto('https://www.saucedemo.com/');
      await page.fill('[data-test="username"]', credentials.username);
      await page.fill('[data-test="password"]', credentials.password);
      await page.click('[data-test="login-button"]');
      await page.waitForURL('**/inventory.html', { timeout: 10000 });
      
      console.log(`✅ Authenticated context created for ${userType}`);
      await page.close();
      return context;
    };

    await use(authenticatedUser);
  }
});

export { expect };
