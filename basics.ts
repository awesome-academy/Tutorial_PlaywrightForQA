// Khai báo các biến cơ bản
const username: string = "Hoa Ly";
const age: number = 30;
const isActive: boolean = true;
const roles: string[] = ["Admin", "Editor", "User"];

// Khai báo biến kiểu object
const user: { name: string; email: string; isAdmin: boolean } = {
  name: "Hoa Ly ca nhan",
  email: "hoaly111295@gmail.com",
  isAdmin: false,
};

// In thông tin user theo format
console.log(`User: ${user.name} (email: ${user.email}), Roles: ${roles.join(", ")}, Active: ${isActive}`);

// 👉 Nâng cao: Viết function check tuổi
function checkAge(userAge: number): void {
  if (userAge >= 18) {
    console.log("Adult");
  } else {
    console.log("Under 18");
  }
}

// Gọi hàm để kiểm tra
console.log(`\nChecking age for ${username} (age ${age}):`);
checkAge(age);

console.log(`Checking age for a 16-year-old:`);
checkAge(16);
