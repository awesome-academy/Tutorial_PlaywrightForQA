import { test, expect } from '../src/fixtures/baseFixtures';
test.describe('DemoQA Basic Smoke Tests', () => {

interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
    };

class User implements IUser {
  constructor(public name: string, public email: string, public isAdmin: boolean)  {
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  };

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  };
};

class AdminUser extends User {
    constructor(public name: string,  public email: string, public isAdmin: boolean)  {
    super(name, email, isAdmin);

  };
  
  deleteUser(user: User): void {
    console.log(`Admin ${this.name} deleted user ${user.name}`);
  }
};

test('Test User class getInfo()', async () => {
  const user1 = new User('Tra', 'tra@example.com', true);
  const user2 = new User('Hoa', 'hoa@example.com', false);

  console.log(user1.getInfo()); 
  console.log(user2.getInfo());
})

test('Test Delete User', async () => {
  const user1 = new User('Tra', 'tra@example.com', false);
  const user2 = new User('Hoa', 'hoa@example.com', false);
  const admin1 = new AdminUser('Admin1', 'admin1@example.com', true);
  const users: User[] = [user1, user2, admin1]; //Tạo mảng User

  // Duyệt mảng và in thông tin
  for (const u of users) {
    console.log(u.getInfo());
  }

  // Admin xóa user
  admin1.deleteUser(user2);
})

})
