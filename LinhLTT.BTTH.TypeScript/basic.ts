let username: string = "Thuy Linh";
let age: number = 18; 
let isActive: boolean = true;
let roles: string[]=["QA","BE","FE"];
interface User {
    name: string;
    email: string;
    isAdmin: boolean;
}
let user: User = {
    name: username, // Sử dụng biến đã khai báo
    email: "le.thi.thuy.linh@sun-asterisk.com",
    isAdmin: true,
};
// ----------------------------------------------------
// Mong muốn: In ra thông tin user theo format
// User: <name> (email: <email>), Roles: <roles[]>, Active: <isActive>
// ----------------------------------------------------

console.log(
    `User: ${user.name} (email: ${user.email}), Roles: ${roles.join(
        ", "
    )}, Active: ${isActive}`
);

// ----------------------------------------------------
// 👉 Nâng cao: Viết function check age >= 18
// ----------------------------------------------------

/**
 * Function kiểm tra tuổi
 * @param userAge - Tuổi cần kiểm tra (number)
 * @returns void - Chỉ thực hiện in ra console
 */
function checkAgeStatus(userAge: number): void {
    if (userAge >= 18) {
        console.log(`Adult`);
    } else {
        console.log(`Under18`);
    }
}

