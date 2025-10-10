interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

class User implements IUser {
  constructor(public name: string, public email: string, public isAdmin: boolean) {}

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}

class AdminUser extends User {
  deleteUser(user: User): void {
    console.log(`User ${user.name} has been deleted by Admin ${this.name}`);
  }
}

const users: User[] = [
  new User("Lan", "lan@example.com", false),
  new AdminUser("Huong", "huong@example.com", true),
  new User("Minh", "minh@example.com", false)
];

for (const user of users) {
  console.log(user.getInfo());
  if (user instanceof AdminUser) {
    user.deleteUser(users[0]);
  }
}
