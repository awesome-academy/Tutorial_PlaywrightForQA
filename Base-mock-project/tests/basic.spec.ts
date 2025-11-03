import { test, expect } from '../src/fixtures/baseFixtures';
import { TestData } from '../src/data/testData';
test.describe('DemoQA Basic Smoke Tests', () => {
type users = {
    userName: string,
    age: number,
    isActive: boolean,
    role: string[] 
};


function printUserInfo(user: users): void {
  const rolesFormatted = user.role.join(', ');
  console.log(
    `User: ${user.userName} (email: ${user.age}), Roles: [${user.role}], Active: ${user.isActive}`
  );
}

//function checkAge(user: users): boolean {
 // if (user.age > 18) return false
 // else return true;
//}

function checkAge(user: users): void {
 if (user.age > 18) 
  console.log('Adult')
 else console.log('Under 18');
}

test('Print user info example', async ({ page }) => {
  // Giả lập dữ liệu user (có thể lấy từ UI hoặc API)
  const user: users = {
    userName: 'Thanh Tra',
    age: 25,
    isActive: false,
    role: ['Team Leader', 'Member'],
};
  printUserInfo(user);
})

test('Print age', async ({ page }) => {
  // Giả lập dữ liệu user (có thể lấy từ UI hoặc API)
  const user1: users = {
    userName: 'Thanh Tra',
    age: 25,
    isActive: false,
    role: ['Team Leader', 'Member'],
};
  checkAge(user1);

    const user2: users = {
    userName: 'Thanh Tra',
    age: 17,
    isActive: false,
    role: ['Team Leader', 'Member'],
};
  checkAge(user2);
})

});