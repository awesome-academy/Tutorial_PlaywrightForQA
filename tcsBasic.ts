let username: string = 'Trang';
let age: number = 25;
let isActive: boolean = true;
let roles: string[] = ["Tester", "QA", "Automation"];

let user: {
  name: string;
  email: string;
  isAdmin: boolean;
} = {
  name: "Trang Nguyen",
  email: "trang.nguyen@example.com",
  isAdmin: true,
};

console.log(
  `User: ${user.name} (email: ${user.email}), Roles: ${roles.join(
    ", "
  )}, Active: ${isActive}`
);

function checkAge(age: number): void {
  if (age >= 18) {
    console.log("Adult");
  } else {
    console.log("Under 18");
  }
}

checkAge(age);