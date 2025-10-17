export const SaucedemoData = {
  urls: {
    base: 'https://www.saucedemo.com',
    inventory: 'https://www.saucedemo.com/inventory.html'
  },
  
  pageText: {
    productsTitle: 'Products'
  },
  
  credentials: {
    validUser: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    lockedUser: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    }
  },
  
  errorMessages: {
    lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
    usernameRequired: 'Epic sadface: Username is required',
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service'
  }
};