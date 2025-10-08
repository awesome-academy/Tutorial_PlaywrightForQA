# Database Module Documentation

## 📊 Database Integration for DemoQA Web Automation

This document provides detailed information about the database module implementation, specifically designed for testing database operations with existing MySQL databases.

### 🔧 Configuration

#### Database Connection Settings:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=wsm_auto
DB_USER=root
DB_PASSWORD=123456
```

**Note**: This module is designed to work with **existing databases** and does not include database setup or table creation scripts.

### 📁 File Structure

```
src/database/
├── index.ts              # Main exports
├── DatabaseConnection.ts # Connection management
├── DatabaseQuery.ts      # Query helpers
├── DatabaseHelper.ts     # Main database interface
└── UserModel.ts          # User model definitions

tests/
└── database.spec.ts      # Database test cases (11 tests)
```

**Note**: SQL setup scripts and database creation logic have been removed. This module only handles connections to existing databases.

### 🏗️ Kiến trúc và Mối quan hệ

```
DatabaseHelper (High-level)
    ↓ sử dụng
DatabaseQuery (Low-level)
    ↓ sử dụng  
DatabaseConnection (Connection Pool)
    ↓ kết nối
MySQL Database
```

#### Phân chia trách nhiệm:

**1. DatabaseHelper (Business Logic Layer)**
- ✅ User-friendly interface methods
- ✅ Business logic validation
- ✅ High-level error handling
- ✅ CRUD operations cho User management
- ✅ Search và statistics functions

**2. DatabaseQuery (Data Access Layer)** 
- ✅ Raw SQL query execution
- ✅ Low-level database operations
- ✅ Transaction management
- ✅ Parameterized query support
- ✅ Connection pool utilization

**3. DatabaseConnection (Connection Layer)**
- ✅ MySQL connection pool management
- ✅ Connection lifecycle control
- ✅ Database driver interface
- ✅ Configuration management

#### Luồng hoạt động:
1. **Application** → gọi `DatabaseHelper` methods
2. **DatabaseHelper** → xử lý business logic → gọi `DatabaseQuery` 
3. **DatabaseQuery** → tạo SQL → sử dụng `DatabaseConnection`
4. **DatabaseConnection** → thực thi trên MySQL database
5. **Results** ← trả về qua các layers

### 🗄️ Users Table Schema

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_role (role),
    INDEX idx_name (name)
);
```

#### Roles:
- `admin` - Administrator
- `user` - Regular user
- `moderator` - Content moderator
- `guest` - Guest user

### 🚀 Quick Start

#### Run Database Tests
```bash
# Run all database tests (11 tests)
npm run test:database
# or using alias
npm run test:db

# Run with browser visible
npm run test:database -- --headed
```

#### Initialize Database Connection
```typescript
import { dbHelper } from './src/database';

// Initialize database connection
await dbHelper.initialize();

// Test connection
const isConnected = await dbHelper.testConnection();
if (isConnected) {
  console.log('✅ Database connected successfully');
}
```

### 💻 Usage Examples

#### Basic Connection
```typescript
import { dbHelper } from './src/database';

// Initialize database connection
await dbHelper.initialize();

// Test connection
const isConnected = await dbHelper.testConnection();
```

#### User Operations
```typescript
// Get all users
const users = await dbHelper.getAllUsers();

// Get user by ID
const user = await dbHelper.getUserById(1);

// Get users by role
const adminUsers = await dbHelper.getUsersByRole('admin');

// Create new user
const userId = await dbHelper.createUser('New User', 'user');

// Update user
await dbHelper.updateUser(userId, 'Updated Name', 'admin');

// Delete user
await dbHelper.deleteUser(userId);

// Search users
const searchResults = await dbHelper.searchUsersByName('admin');
```

#### Custom Queries
```typescript
// Execute custom SELECT query
const results = await dbHelper.executeQuery<User>(
  'SELECT * FROM users WHERE role = ? LIMIT ?', 
  ['admin', 5]
);

// Execute custom non-SELECT query
const result = await dbHelper.executeNonQuery(
  'UPDATE users SET role = ? WHERE id = ?', 
  ['moderator', 1]
);
```

### 🧪 Test Cases Overview

The database test suite (`tests/database.spec.ts`) includes:

1. **Connection Tests**
   - Database connectivity
   - Configuration verification

2. **CRUD Operations**
   - Create users
   - Read/Select users
   - Update users
   - Delete users

3. **Query Tests**
   - Select all users
   - Select by role
   - Select by ID
   - Search by name
   - Custom queries

4. **Data Validation**
   - User count verification
   - Role distribution
   - Error handling

### 📋 Available NPM Scripts

```bash
# Database testing
npm run test:database   # Run database tests
npm run test:db         # Alias for database tests

# General testing
npm test               # Run all tests
npm run test:headed    # Run tests with browser UI
```

### 🔍 Sample Data

After setup, the database will contain sample users:

| ID | Name | Role | 
|----|------|------|
| 1 | Admin User | admin |
| 2 | John Doe | user |
| 3 | Jane Smith | moderator |
| 4 | Guest User | guest |
| ... | ... | ... |

### 🛠️ Troubleshooting

#### Common Issues:

1. **Connection Error**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:3306
   ```
   - Check if MySQL is running
   - Verify connection credentials in `.env`

2. **Authentication Error**
   ```
   Error: Access denied for user 'root'@'localhost'
   ```
   - Check username/password in `.env`
   - Ensure user has necessary privileges

3. **Database Not Found**
   ```
   Error: Unknown database 'wsm_auto'
   ```
   - Create database manually: `CREATE DATABASE wsm_auto;`
   - Or run the SQL script that includes database creation

#### Solutions:

1. **Ensure MySQL is running**
   ```bash
   # On Windows
   net start mysql
   
   # On macOS
   brew services start mysql
   
   # On Linux
   sudo systemctl start mysql
   ```

2. **Create database manually**
   ```sql
   CREATE DATABASE wsm_auto CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Grant permissions**
   ```sql
   GRANT ALL PRIVILEGES ON wsm_auto.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 🎯 Best Practices

1. **Always use environment variables** for database credentials
2. **Use connection pooling** for better performance
3. **Handle errors gracefully** in production
4. **Clean up test data** after tests
5. **Use transactions** for multiple related operations
6. **Index frequently queried columns**
7. **Validate data** before database operations

### 🔐 Security Notes

- Never commit `.env` file with real credentials
- Use different credentials for test and production
- Implement proper error handling
- Sanitize user inputs to prevent SQL injection
- Use parameterized queries (already implemented)

---

## Summary

✅ **Database configuration completed:**
- MySQL2 connection with pooling
- Complete CRUD operations
- User management with roles
- Comprehensive test suite
- SQL scripts for manual setup
- TypeScript integration
- Error handling and validation

The database module is now ready for use in your automation testing! 🎉