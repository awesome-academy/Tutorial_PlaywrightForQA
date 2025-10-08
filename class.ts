interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

class User implements IUser {
  name: string;
  email: string;
  isAdmin: boolean;

  public constructor(name: string, email: string, isAdmin: boolean) {
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  }
  public getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}

const user = new User("Nhi", "tran.thi.thao.nhi@sun-asterisk.com", true);
console.log(user.getInfo());
