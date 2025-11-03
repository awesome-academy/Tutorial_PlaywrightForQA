# DemoQA Web Automation Project

A comprehensive Playwright automation testing framework for DemoQA website using TypeScript and the Page Object Model pattern.

## Project Overview

- **Project Type**: Single-Site No-Role
- **Project Name**: DemoQA Web
- **Base URL**: https://demoqa.com/links
- **Testing Framework**: Playwright with TypeScript
- **Pattern**: Page Object Model (POM)

## Project Structure

```
├── src/
│   ├── pages/           # Page Object classes
│   │   ├── BasePage.ts  # Base page with common functionality
│   │   ├── HomePage.ts  # DemoQA home page
│   │   ├── LinksPage.ts # DemoQA links page
│   │   └── PageManager.ts # Page object manager
│   ├── fixtures/        # Custom Playwright fixtures
│   │   └── baseFixtures.ts
│   ├── utils/           # Utility functions
│   │   └── helpers.ts
│   └── data/            # Test data
│       └── testData.ts
├── tests/               # Test files
│   ├── home.spec.ts     # Home page tests
│   └── links.spec.ts    # Links page tests
├── screenshots/         # Test screenshots
├── .env                 # Environment configuration
├── playwright.config.ts # Playwright configuration
└── README.md
```

## Features

### Core Features
- ✅ Page Object Model (POM) architecture
- ✅ TypeScript support with proper typing
- ✅ Custom Playwright fixtures
- ✅ Environment-based configuration
- ✅ Comprehensive utility functions
- ✅ Centralized test data management
- ✅ Screenshot and video capture on failures
- ✅ Multi-browser support (Chrome, Firefox, Safari)

### Test Coverage
- ✅ Home page navigation and category verification
- ✅ Links page functionality testing
- ✅ API response validation
- ✅ Cross-browser compatibility testing
- ✅ Responsive design validation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Base-mock-project
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and update the values as needed:

```env
BASE_URL=https://demoqa.com
LINKS_URL=https://demoqa.com/links
HOME_URL=https://demoqa.com/
TIMEOUT=30000
HEADLESS=true
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720
```

## Running Tests

### All Tests
```bash
npm test
```

### Specific Browser
```bash
npm run test:chrome    # Chrome only
npm run test:firefox   # Firefox only
npm run test:webkit    # Safari only
```

### Debug Mode
```bash
npm run test:debug     # Debug mode
npm run test:headed    # Headed mode (visible browser)
```

### UI Mode
```bash
npm run test:ui        # Interactive UI mode
```

### Test Reports
```bash
npm run report         # View HTML report
```

## Test Files

### Home Page Tests (`tests/home.spec.ts`)
- Home page loading verification
- Category cards display validation
- Navigation to different sections
- Page structure verification

### Links Page Tests (`tests/links.spec.ts`)
- Links page loading verification
- Simple link functionality (new tab navigation)
- API call links with response validation
- HTTP status code verification (201, 204, 301, 400, 401, 403, 404)

## Page Objects

### BasePage
Base class providing common functionality:
- Page navigation and loading
- Element interaction methods
- Wait and verification utilities
- Screenshot capabilities

### HomePage
DemoQA home page interactions:
- Category navigation
- Element visibility verification
- Page structure validation

### LinksPage
DemoQA links page interactions:
- Link clicking functionality
- API response handling
- Status code validation

### PageManager
Centralized page object management:
- Single point of access for all page objects
- Simplified page navigation
- Consistent page initialization

## Utilities

### helpers.ts
Common utility functions:
- Random data generation
- Date formatting
- Email validation
- Environment variable parsing
- String manipulation

### testData.ts
Centralized test data:
- User information
- URL configurations
- Expected values
- Test constants

## Custom Fixtures

### baseFixtures.ts
Custom Playwright fixtures:
- PageManager fixture for centralized page access
- HomePage fixture for direct home page access
- LinksPage fixture for direct links page access

## Browser Configuration

The project supports multiple browsers:
- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **WebKit** (Desktop Safari)

## Reporting

- HTML reports generated after test runs
- Screenshots captured on test failures
- Videos recorded for failed tests
- Trace files for debugging

## Best Practices

1. **Page Object Model**: All page interactions through page objects
2. **TypeScript**: Strong typing for better code quality
3. **Environment Configuration**: Externalized configuration
4. **Custom Fixtures**: Reusable test setup
5. **Utility Functions**: Common functionality extraction
6. **Centralized Data**: Test data management
7. **Error Handling**: Comprehensive error scenarios
8. **Cross-browser Testing**: Multi-browser validation

## Troubleshooting

### Common Issues

1. **Browser not installed**:
   ```bash
   npx playwright install
   ```

2. **Environment variables not loaded**:
   - Ensure `.env` file exists
   - Check environment variable names

3. **Test timeouts**:
   - Increase timeout values in `.env`
   - Check network connectivity

4. **Element not found**:
   - Verify selectors in page objects
   - Check if page structure changed

## Contributing

1. Follow the existing code structure
2. Add tests for new functionality
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

MIT License