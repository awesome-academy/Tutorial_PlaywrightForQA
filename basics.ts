let username: string = "HoangPC";
let age: number = 29;
let isActive: boolean = true;
let roles: string[] = ["admin", "user"];
let user: {
  name: string;
  email: string;
  isAdmin: boolean;
} = {
  name: "Phan Chính Hoàng",
  email: "phan.chinh.hoang@sun-asterisk.com",
  isAdmin: true
};
console.log(`User: ${user.name} (email: ${user.email}), Roles: ${roles.join(", ")}, Active: ${isActive}`);
function checkAge(age: number): void {
  if (age >= 18) {
    console.log("Adult");
  } else {
    console.log("Under 18");
  }
}
checkAge(age);
