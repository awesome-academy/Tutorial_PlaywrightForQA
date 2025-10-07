interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
  getInfo(): string; // Thêm method vào interface để các class implement nó
}

// Tạo class User implements IUser
class User implements IUser {
  constructor(public name: string, public email: string, public isAdmin: boolean) {}

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}

// Tạo class AdminUser kế thừa User
class AdminUser extends User {
  constructor(name: string, email: string) {
    // Gọi constructor của class cha (User) và mặc định isAdmin là true
    super(name, email, true);
  }

  deleteUser(userToDelete: User): void {
    console.log(`Admin ${this.name} is deleting user ${userToDelete.name}.`);
  }
}

// --- Tạo instance và sử dụng ---
const normalUser = new User("Hoa Ly", "hoaly@gmail.com", false);
console.log(normalUser.getInfo()); 

const admin = new AdminUser("Super Admin", "SuperAdmin@gmail.com");
console.log(admin.getInfo()); 
admin.deleteUser(normalUser);

// Tạo mảng users và duyệt mảng
const users: IUser[] = [
  new User("Hoa Ly user 1", "user1@gmail.com", false),
  new AdminUser("Hoa Ly admin", "admin@gmail.com"),
  new User("Hoa Ly user 2", "user2@gmail.com", false),
];

console.log("\n--- User List ---");
users.forEach(u => {
  console.log(u.getInfo());
});