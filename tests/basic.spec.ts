import { test, expect } from '@playwright/test';


interface IUser {
    name: string;
    email: string;
    isAdmin: boolean;
}



  function checkAge(age: number): void {
    if (age >= 18) {
        console.log("Adult");
    }
    else {
        console.log("under 18");
    }
}




test('has title', async ({ page }) => {
  let username: string = "vũ thị lụa";
  let age: number = 30;
  let isActive: boolean = true;
  let roles: string[] = ["admin", "editor"];

  let user: {
    name: string;
    email: string;
    isAdmin: boolean;
  } = {
    name: username,
    email: "vu.thi.lua@sun-asterisk.com", isAdmin: true,
  };

  console.log(`User: ${user.name} (email: ${user.email}) , roles: ${roles.join(
    " , "
  )}, Active: ${isActive}`
  );
}
);


// check age
test('check age', async ({  }) => {
  checkAge(16);
});







