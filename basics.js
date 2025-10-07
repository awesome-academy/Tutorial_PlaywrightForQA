// Khai báo các biến cơ bản
var username = "Hoa Ly";
var age = 30;
var isActive = true;
var roles = ["Admin", "Editor", "User"];
// Khai báo biến kiểu object
var user = {
    name: "Hoa Ly ca nhan",
    email: "hoaly111295@gmail.com",
    isAdmin: false,
};
// In thông tin user theo format
console.log("User: ".concat(user.name, " (email: ").concat(user.email, "), Roles: ").concat(roles.join(", "), ", Active: ").concat(isActive));
// Nâng cao: Viết function check tuổi
function checkAge(userAge) {
    if (userAge >= 18) {
        console.log("Adult");
    }
    else {
        console.log("Under 18");
    }
}
// Gọi hàm để kiểm tra
console.log("\nChecking age for ".concat(username, " (age ").concat(age, "):"));
checkAge(age);
console.log("Checking age for a 16-year-old:");
checkAge(16);
