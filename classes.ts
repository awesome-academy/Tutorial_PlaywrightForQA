
export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}
export class User implements IUser {
  constructor(
    public name: string,
    public email: string,
    public isAdmin: boolean = false
  ) {}

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}
const u1 = new User("Trang Nguyen", "trang@example.com");
console.log(u1.getInfo()); 
export class AdminUser extends User {
  constructor(name: string, email: string) {
    super(name, email, true);
  }
  deleteUser(user: User, users: Array<User | AdminUser>): Array<User | AdminUser> {
    console.log(`Admin ${this.name} is deleting ${user.name}...`);
    return users.filter(u => u !== user);
  }
}
const admin = new AdminUser("Leader QA", "leader.qa@example.com");
const u2 = new User("Loki", "loki@example.com");
const u3 = new User("Dino", "dino@example.com");

let users: Array<User | AdminUser> = [admin, u1, u2, u3];

console.log("\nAll users:");
for (const u of users) {
  console.log(u.getInfo());
}
users = admin.deleteUser(u2, users);
console.log("\nAfter delete:");
for (const u of users) {
  console.log(u.getInfo());
}
