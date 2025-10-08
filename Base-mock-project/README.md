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
│   │   ├── PracticeFormPage.ts # Practice form page object
│   │   └── PageManager.ts # Page object manager
│   ├── database/        # Database integration module
│   │   ├── index.ts     # Main exports
│   │   ├── DatabaseConnection.ts # Connection management
│   │   ├── DatabaseQuery.ts      # Query helpers
│   │   ├── DatabaseHelper.ts     # Main database interface
│   │   └── UserModel.ts          # User model definitions
│   ├── fixtures/        # Custom Playwright fixtures
│   │   └── baseFixtures.ts
│   ├── utils/           # Utility functions
│   │   └── helpers.ts
│   └── data/            # Test data
│       └── testData.ts
├── tests/               # Test files
│   ├── home.spec.ts     # Home page tests
│   ├── links.spec.ts    # Links page tests
│   ├── database.spec.ts # Database tests
│   ├── practice-pom/    # POM pattern examples
│   │   ├── use-pom.spec.ts           # Using POM pattern
│   │   └── no-use-pom-structure.spec.ts # Direct page interactions
│   ├── practice-fixture/ # Fixture examples
│   │   ├── example.spec.ts
│   │   └── refactor-fixture-example.spec.ts
│   └── practices/       # Practice exercises
│       └── register-form.spec.ts # Complete POM + Fixtures example
├── screenshots/         # Test screenshots
├── .env                 # Environment configuration
├── .env.example         # Environment template
├── playwright.config.ts # Playwright configuration
├── README.md            # Main project documentation
└── DATABASE_README.md   # Database module documentation
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
- ✅ Database integration with MySQL
- ✅ Connection pooling and query optimization

### Test Coverage
- ✅ Home page navigation and category verification
- ✅ Links page functionality testing
- ✅ API response validation
- ✅ Cross-browser compatibility testing
- ✅ Responsive design validation
- ✅ Database CRUD operations testing
- ✅ Practice form automation (POM vs Direct approach)
- ✅ Custom fixtures implementation examples
- ✅ Complete registration workflow testing

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
# Web Testing Configuration
BASE_URL=https://demoqa.com
LINKS_URL=https://demoqa.com/links
HOME_URL=https://demoqa.com/
TIMEOUT=30000
HEADLESS=true
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=wsm_auto
```

## Database Setup

For database testing capabilities, see detailed documentation in [`DATABASE_README.md`](./DATABASE_README.md).

**Quick Setup:**
1. Ensure MySQL server is running
2. Configure database credentials in `.env`
3. Run database tests: `npm run test:db`

## Running Tests

### All Tests
```bash
npm test                # All tests
```

### Specific Test Types
```bash
npm run test:database   # Database tests only
npm run test:db         # Database tests (alias)
```

### Specific Browser
```bash
npm run test:chrome     # Chrome only
npm run test:firefox    # Firefox only
npm run test:webkit     # Safari only
```

### Debug Mode
```bash
npm run test:debug      # Debug mode
npm run test:headed     # Headed mode (visible browser)
```

### UI Mode
```bash
npm run test:ui         # Interactive UI mode
```

### Test Reports
```bash
npm run report          # View HTML report
```

### Specific Test Files
```bash
# Run specific test files
npx playwright test tests/home.spec.ts
npx playwright test tests/practices/register-form.spec.ts --headed
npx playwright test tests/practice-pom/use-pom.spec.ts
```

## Test Files

### Web UI Tests

#### Basic Tests
- **`tests/home.spec.ts`** - Home page loading and category verification
- **`tests/links.spec.ts`** - Links functionality and API response validation

#### Practice Examples

##### POM Pattern Comparison (`tests/practice-pom/`)
- **`use-pom.spec.ts`** - Using Page Object Model pattern
- **`no-use-pom-structure.spec.ts`** - Direct page interactions (no POM)

##### Fixture Examples (`tests/practice-fixture/`)
- **`example.spec.ts`** - Basic fixture examples
- **`refactor-fixture-example.spec.ts`** - Advanced fixture usage

##### Complete Examples (`tests/practices/`)
- **`register-form.spec.ts`** - Complete POM + Fixtures implementation
  - Multiple test scenarios
  - Custom fixture usage
  - Best practices demonstration

### Database Tests

#### Database Tests (`tests/database.spec.ts`)
- Database connection verification
- CRUD operations testing
- User management functionality
- Data integrity validation
- Error handling scenarios

For detailed database testing documentation, see [`DATABASE_README.md`](./DATABASE_README.md).

## Kiến trúc hệ thống

### Page Objects (Đối tượng trang)

#### BasePage (Trang cơ sở)
Lớp cơ sở cung cấp các chức năng chung:
- Điều hướng và tải trang
- Các phương thức tương tác với element
- Utilities để chờ và xác minh
- Khả năng chụp ảnh màn hình

#### HomePage (Trang chủ)
Tương tác với trang chủ DemoQA:
- Điều hướng các danh mục
- Xác minh khả năng hiển thị element
- Xác thực cấu trúc trang

#### LinksPage (Trang liên kết)
Tương tác với trang liên kết DemoQA:
- Chức năng click vào link
- Xử lý phản hồi API
- Xác minh mã trạng thái

#### PageManager (Quản lý trang)
Quản lý tập trung các page object:
- Điểm truy cập duy nhất cho tất cả page object
- Đơn giản hóa việc khởi tạo trang

#### PracticeFormPage (Trang form thực hành)
Tự động hóa form thực hành:
- Tương tác với các trường form
- Lựa chọn giới tính và sở thích
- Quy trình gửi form
- Xác minh modal thành công

### Custom Fixtures (Fixtures tùy chỉnh)

#### baseFixtures.ts
Playwright fixtures tùy chỉnh:
- **pageManager** - Instance PageManager được khởi tạo sẵn
- **homePage** - Instance HomePage sẵn sàng sử dụng
- **linksPage** - Instance LinksPage sẵn sàng sử dụng
- **practiceFormPage** - Instance PracticeFormPage sẵn sàng sử dụng

Lợi ích:
- Tự động setup và teardown
- Sử dụng fixture type-safe
- Giảm boilerplate code
- Cấu trúc test nhất quán

### Module Database (Cơ sở dữ liệu)

#### DatabaseHelper (Trợ giúp database)
Giao diện database cấp cao:
- Các thao tác quản lý user
- Triển khai business logic
- Xử lý lỗi và validation

#### DatabaseQuery (Truy vấn database)
Các thao tác truy vấn cấp thấp:
- Thực thi SQL thô
- Truy vấn có tham số
- Quản lý transaction

#### DatabaseConnection
#### DatabaseConnection (Kết nối database)
Quản lý kết nối:
- MySQL connection pooling
- Xử lý cấu hình
- Vòng đời kết nối

Để biết thêm chi tiết về database, xem [`DATABASE_README.md`](./DATABASE_README.md).

## Tiện ích (Utilities)

### helpers.ts
Các hàm tiện ích chung:
- Tạo dữ liệu ngẫu nhiên
- Định dạng ngày tháng
- Xác thực email
- Phân tích biến môi trường
- Thao tác chuỗi

### testData.ts
Dữ liệu test tập trung:
- Thông tin người dùng
- Cấu hình URL
- Giá trị mong đợi
- Hằng số test

## Cấu hình trình duyệt

Dự án hỗ trợ nhiều trình duyệt:
- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **WebKit** (Desktop Safari)

## Báo cáo (Reporting)

- Báo cáo HTML được tạo sau khi chạy test
- Screenshots được chụp khi test failed
- Videos được ghi lại cho các test failed
- Trace files để debug

## Best Practices (Thực hành tốt nhất)

1. **Page Object Model**: Tất cả tương tác trang thông qua page objects
2. **Custom Fixtures**: Tự động setup/teardown với type safety
3. **TypeScript**: Strong typing để chất lượng code tốt hơn
4. **Environment Configuration**: Cấu hình được externalized
5. **Separation of Concerns**: Tests, page objects, và utilities được tách biệt
6. **Database Integration**: Module database testing riêng biệt
7. **Error Handling**: Các kịch bản lỗi toàn diện
8. **Cross-browser Testing**: Xác thực đa trình duyệt

## Ví dụ học tập (Learning Examples)

Dự án này bao gồm các ví dụ toàn diện để học Playwright automation:

- **`tests/practice-pom/`** - So sánh POM vs Direct approach
- **`tests/practice-fixture/`** - Học custom fixtures
- **`tests/practices/`** - Ví dụ implementation hoàn chỉnh
- **Database integration** - Kịch bản testing database thực tế

## Tài liệu liên quan

- [`DATABASE_README.md`](./DATABASE_README.md) - Tài liệu đầy đủ về database module
- [Playwright Documentation](https://playwright.dev/docs/intro) - Tài liệu chính thức Playwright

## Khắc phục sự cố

### Các vấn đề thường gặp

1. **Chưa cài đặt browser**:
   ```bash
   npx playwright install
   ```

2. **Không load được environment variables**:
   - Đảm bảo file `.env` tồn tại
   - Kiểm tra tên các biến môi trường

3. **Test bị timeout**:
   - Tăng giá trị timeout trong `.env`
   - Kiểm tra kết nối mạng

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