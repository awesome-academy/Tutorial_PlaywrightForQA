/**
 * interface IUser với name, email, isAdmin.
 */
interface IUser {
    name: string;
    email: string;
    isAdmin: boolean;
}

/**
 * Tạo class User implements IUser:
 * Constructor nhận giá trị 
 */
class User implements IUser {
    // Thuộc tính phải khớp với interface
    name: string;
    email: string;
    isAdmin: boolean;
    constructor(name: string, email: string, isAdmin: boolean) {
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
        console.log(`Init normal User: ${name}`);
     }
/**
 * Method getInfo() → "User: <name>, Email: <email>, Admin: <true/false>".
 */
        getInfo(): string {
        return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
    }
}
/**
 * Tạo instance và gọi getInfo().
 *  */
const normalUser = new User("Linh","le.thi.thuy.linh@sun-asterisk.com","false");
console.log(normalUser.getInfo());



/**
👉 Nâng cao:
Tạo class AdminUser kế thừa User, thêm method deleteUser(user: User).
Tạo mảng users gồm User và AdminUser, duyệt mảng và in info.
 */

class AdminUser extends User{
    private adminID:string;

    constructor(name: string, email: string){
        super(name, email, true); 
        this.adminID = "ADMIN_";

    }

    deleteUser(user: User): void {
        console.log(`\n🚨 Admin (${this.name}) delete : ${user.name}`);
        // Logic xóa thực tế sẽ nằm ở đây
    }
    // ghi đè getinfo 
    getInfo(): string {
        // Gọi phương thức của lớp cha và thêm thông tin mới
        return `${super.getInfo()} (Admin ID: ${this.adminId})`;
    }
}
//// Tạo instance AdminUser và gọi method deleteUser
const superAdmin = new AdminUser("Hoang", "hoang@admin.com");
console.log(superAdmin.getInfo()); // In thông tin AdminUser

superAdmin.deleteUser(normalUser);

//Tạo mảng users gồm User và AdminUser, duyệt mảng và in info.

const users: User[] = [
    normalUser,
    superAdmin,
    new User("AAAAA", "nguyen.thi.A@test.com", false),
];

console.log("Duyệt mảng users và in thông tin:");

users.forEach((userInstance) => {
    console.log(userInstance.getInfo());
});