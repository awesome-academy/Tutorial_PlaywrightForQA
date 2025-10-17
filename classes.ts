interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}
class User implements IUser {
  constructor(public name: string, public email: string, public isAdmin: boolean) { }

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}
class AdminUser extends User {
  constructor(name: string, email: string) {
    super(name, email, true);
  }
}
const users: User[] = [
  new User("Hoang1", "phan.chinh.hoang@sun-asterisk.com", false),
  new User("Hoang2", "phan.chinh.hoang2@sun-asterisk.com", false),
  new AdminUser("Hoang3", "phan.chinh.hoang3@sun-asterisk.com"),
  new AdminUser("Hoang4", "phan.chinh.hoang4@sun-asterisk.com"),
];
for (const u of users) {
  console.log(u.getInfo());
}
