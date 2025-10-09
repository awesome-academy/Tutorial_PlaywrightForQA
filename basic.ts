const username: string = "Huong";
const age: number = 28;
const isActive: boolean = true
const roles: string[] = ["Admin", "Member"];
interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}
const user: User = {
  name: "huonng",
  email: "abc@gmail.com",
  isAdmin: false,
};
function checkAge(age: number) {
  if (age >= 18) {
    console.log("Adult");
  } else {
    console.log("Under 18");
  }
}
console.log(`User: ${user.name} (email: ${user.email})`);
console.log(`Roles: ${roles}`);
console.log(`Active: ${isActive}`);



