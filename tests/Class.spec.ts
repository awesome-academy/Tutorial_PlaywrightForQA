import { test, expect } from '@playwright/test';
interface IUser {
    name: string;
    email: string;
    isAdmin: boolean;
}
class  User implements IUser{
    constructor(public name: string, public email: string, public isAdmin: boolean
    ){}
    getinFo():string {
        return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
    }
}
export class AdminUser extends User {
  deleteUser(user: User): string {
    return `Admin ${this.name} deleted user ${user.name}`;
  }
}
test('check class', async ({  }) => {
const user = new User('Lua', 'vuthilua96nb@gmail.com', true);
 console.log(user.getinFo());
}
);

test('AdminUser can delete users and list info', async () => {
// Tạo instance User và AdminUser
const user1 = new User('Lua', 'lua@example.com', false);
const user2 = new User('Vu', 'vu@example.com', false);
const admin = new AdminUser('Admin', 'admin@example.com', true);


// Tạo mảng users
const users: User[] = [user1, user2, admin];


// Duyệt mảng và lấy info
const infos = users.map(u => u.getinFo());
console.log(infos);


// Kiểm tra thông tin chính xác
expect(infos).toContain('User: Lua, Email: lua@example.com, Admin: false');
expect(infos).toContain('User: Vu, Email: vu@example.com, Admin: false');
expect(infos).toContain('User: Admin, Email: admin@example.com, Admin: true');


// Kiểm tra Admin xóa user
const deleteMessage = admin.deleteUser(user1);
console.log(deleteMessage);
expect(deleteMessage).toBe('Admin Admin deleted user Lua');
});