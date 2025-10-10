const username: string = "Huong";
const age: number = 28;
const isActive: boolean = true;
const roles: string[] = ["Admin", "Member"];

const user: { name: string; email: string; isAdmin: boolean } = {
  name: "Huong",
  email: "huong@example.com",
  isAdmin: false
};

console.log(`User: ${user.name} (email: ${user.email}), Roles: ${roles}, Active: ${isActive}`);

function checkAge(age: number): void {
  if (age >= 18) {
    console.log("Adult");
  } else {
    console.log("Under 18");
  }
}

checkAge(age);
