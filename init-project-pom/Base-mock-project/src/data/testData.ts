/**
 * Test data for DemoQA Web automation tests
 */

export const TestData = {
  // User information
  users: {
    testUser: {
      name: 'Test User',
      email: 'test@example.com',
      currentAddress: '123 Test Street, Test City, TC 12345',
      permanentAddress: '456 Permanent Avenue, Permanent City, PC 67890'
    }
  },

  // URLs
  urls: {
    base: process.env.BASE_URL || 'https://demoqa.com',
    home: process.env.HOME_URL || 'https://demoqa.com/',
    links: process.env.LINKS_URL || 'https://demoqa.com/links',
    elements: 'https://demoqa.com/elements',
    forms: 'https://demoqa.com/forms',
    alerts: 'https://demoqa.com/alertsWindows',
    widgets: 'https://demoqa.com/widgets',
    interactions: 'https://demoqa.com/interaction',
    bookStore: 'https://demoqa.com/books'
  },

  // Expected page titles
  pageTitles: {
    home: 'DEMOQA',
    elements: 'DEMOQA',
    forms: 'DEMOQA',
    alerts: 'DEMOQA',
    widgets: 'DEMOQA',
    interactions: 'DEMOQA',
    bookStore: 'DEMOQA'
  },

  // Category names
  categories: {
    elements: 'Elements',
    forms: 'Forms',
    alertsFrameWindows: 'Alerts, Frame & Windows',
    widgets: 'Widgets',
    interactions: 'Interactions',
    bookStore: 'Book Store Application'
  },

  // Link test data
  links: {
    simple: {
      home: 'Home',
      dynamicHome: 'Home'
    },
    apiCalls: {
      created: 'Created',
      noContent: 'No Content',
      moved: 'Moved',
      badRequest: 'Bad Request',
      unauthorized: 'Unauthorized',
      forbidden: 'Forbidden',
      notFound: 'Not Found'
    }
  },

  // Expected HTTP status codes
  httpStatusCodes: {
    ok: 200,
    created: 201,
    noContent: 204,
    moved: 301,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404
  },

  // Test configuration
  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000
  },

  // Browser configurations
  browsers: {
    chrome: 'chromium',
    firefox: 'firefox',
    safari: 'webkit'
  }
};

export default TestData;