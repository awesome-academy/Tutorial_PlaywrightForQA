// Database Module Exports
export { DatabaseConnection } from './DatabaseConnection';
export { DatabaseQuery, QueryResult } from './DatabaseQuery';
export { DatabaseHelper, dbHelper } from './DatabaseHelper';
export { User, UserRole, UserSQL } from './UserModel';

// Type exports
export type { DatabaseConfig } from './DatabaseConnection';

/**
 * Database Module
 * 
 * Usage Examples:
 * 
 * 1. Initialize Database:
 * ```typescript
 * import { dbHelper } from './src/database';
 * await dbHelper.initialize();
 * await dbHelper.setupDatabase();
 * await dbHelper.seedDatabase();
 * ```
 * 
 * 2. Query Users:
 * ```typescript
 * const users = await dbHelper.getAllUsers();
 * const adminUsers = await dbHelper.getUsersByRole('admin');
 * const user = await dbHelper.getUserById(1);
 * ```
 * 
 * 3. CRUD Operations:
 * ```typescript
 * const userId = await dbHelper.createUser('New User', 'user');
 * await dbHelper.updateUser(userId, 'Updated Name', 'admin');
 * await dbHelper.deleteUser(userId);
 * ```
 * 
 * 4. Custom Queries:
 * ```typescript
 * const result = await dbHelper.executeQuery('SELECT * FROM users WHERE name LIKE ?', ['%test%']);
 * ```
 */