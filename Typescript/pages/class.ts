interface IUser {
    name: string;
    email: string;
    isAdmin: boolean;
}

class User implements IUser {
    constructor(public name: string, public email: string, public isAdmin: boolean) {}
    
    public getinfo(): string {
        return `User: ${this.name} (email: ${this.email}), Admin: ${this.isAdmin}`;
    }
}

// Class AdminUser extends User
class AdminUser extends User {
    constructor(name: string, email: string) {
        super(name, email, true); 
    }
    
    public deleteUser(user: User): void {
        console.log(`[ADMIN] ${this.name} đã xóa user: ${user.name} (${user.email})`);
    }
}

// Create users and admin users
const user1 = new User("Nguyen Hoang Viet", "nguyen.hoang.viet@example.com", false);
const user2 = new User("Tran Van A", "tran.van.a@example.com", false);
const user3 = new User("Le Thi B", "le.thi.b@example.com", false);
const admin1 = new AdminUser("Admin Nguyen", "admin.nguyen@example.com");
const admin2 = new AdminUser("Super Admin", "super.admin@example.com");

// Create an array of users including User and AdminUser
const users: User[] = [user1, user2, user3, admin1, admin2];

// Print user information
console.log("=== LIST OF USERS ===");
users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.getinfo()}`);
});

// Demonstrate admin deleting users
console.log("\n=== DEMO DELETE ACTIONS ===");
admin1.deleteUser(user2);
admin2.deleteUser(user3);