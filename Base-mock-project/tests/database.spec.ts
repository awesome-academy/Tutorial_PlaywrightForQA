import { test, expect } from '@playwright/test';
import { dbHelper, User, UserRole } from '../src/database';

test.describe('Database Tests - Users Table', () => {
  
  // Setup before all tests
  test.beforeAll(async () => {
    console.log('🔄 Connecting to existing database...');
    
    try {
      // Initialize database connection
      await dbHelper.initialize();
      
      // Test connection
      const isConnected = await dbHelper.testConnection();
      if (!isConnected) {
        throw new Error('Cannot connect to database. Please ensure MySQL is running and credentials are correct.');
      }
      
      console.log('✅ Database connection established');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  });

  // Cleanup after all tests
  test.afterAll(async () => {
    console.log('🔄 Cleaning up database...');
    await dbHelper.close();
    console.log('✅ Database cleanup completed');
  });

  test('should connect to database successfully', async () => {
    // Test database connection
    const isConnected = await dbHelper.testConnection();
    expect(isConnected).toBeTruthy();
    
    // Verify database info
    const dbInfo = dbHelper.getDatabaseInfo();
    expect(dbInfo.host).toBe('localhost');
    expect(dbInfo.database).toBe('wsm_auto');
    expect(dbInfo.user).toBe('root');
  });

  test('should select all users from users table', async () => {
    // Get all users
    const users = await dbHelper.getAllUsers();
    
    // Verify we have users
    expect(users.length).toBeGreaterThan(0);
    
    // Log results
    console.log(`📊 Found ${users.length} users in database`);
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.role})`);
    });
    
    // Verify user structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('role');
  });

  test('should select users by role', async () => {
    // Test different roles
    const adminUsers = await dbHelper.getUsersByRole(UserRole.ADMIN);
    const regularUsers = await dbHelper.getUsersByRole(UserRole.USER);
    
    // Verify we have users (may not have all roles in existing DB)
    console.log(`📊 User distribution by role:`);
    console.log(`  - Admins: ${adminUsers.length}`);
    console.log(`  - Users: ${regularUsers.length}`);
    
    // At least verify we have some users
    const totalUsers = adminUsers.length + regularUsers.length;
    expect(totalUsers).toBeGreaterThan(0);
    
    // If we have admin users, verify they have admin role
    if (adminUsers.length > 0) {
      adminUsers.forEach(user => {
        expect(user.role).toBe(UserRole.ADMIN);
      });
    }
  });

  test('should get user by ID', async () => {
    // First get all users to get a valid ID
    const users = await dbHelper.getAllUsers();
    expect(users.length).toBeGreaterThan(0);
    
    const firstUserId = users[0].id!;
    
    // Get user by ID
    const user = await dbHelper.getUserById(firstUserId);
    
    // Verify user found
    expect(user).not.toBeNull();
    expect(user!.id).toBe(firstUserId);
    expect(user!.name).toBe(users[0].name);
    expect(user!.role).toBe(users[0].role);
    
    console.log(`✅ Found user by ID ${firstUserId}: ${user!.name} (${user!.role})`);
  });

  test('should create new user', async () => {
    const testUserName = 'Test User Created';
    const testUserRole = UserRole.USER;
    
    // Create new user
    const userId = await dbHelper.createUser(testUserName, testUserRole);
    
    // Verify user ID returned
    expect(userId).toBeGreaterThan(0);
    
    // Verify user was created
    const createdUser = await dbHelper.getUserById(userId);
    expect(createdUser).not.toBeNull();
    expect(createdUser!.name).toBe(testUserName);
    expect(createdUser!.role).toBe(testUserRole);
    
    console.log(`✅ Created user with ID ${userId}: ${testUserName} (${testUserRole})`);
  });

  test('should update existing user', async () => {
    // Create a user to update
    const userId = await dbHelper.createUser('User To Update', UserRole.USER);
    
    // Update user
    const updatedName = 'Updated User Name';
    const updatedRole = UserRole.ADMIN;
    
    const updateSuccess = await dbHelper.updateUser(userId, updatedName, updatedRole);
    expect(updateSuccess).toBeTruthy();
    
    // Verify update
    const updatedUser = await dbHelper.getUserById(userId);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.name).toBe(updatedName);
    expect(updatedUser!.role).toBe(updatedRole);
    
    console.log(`✅ Updated user ID ${userId}: ${updatedName} (${updatedRole})`);
  });

  test('should delete user', async () => {
    // Create a user to delete
    const userId = await dbHelper.createUser('User To Delete', UserRole.USER);
    
    // Verify user exists
    let user = await dbHelper.getUserById(userId);
    expect(user).not.toBeNull();
    
    // Delete user
    const deleteSuccess = await dbHelper.deleteUser(userId);
    expect(deleteSuccess).toBeTruthy();
    
    // Verify user no longer exists
    user = await dbHelper.getUserById(userId);
    expect(user).toBeNull();
    
    console.log(`✅ Deleted user ID ${userId}`);
  });

  test('should search users by name', async () => {
    // Get all users first to see what's available
    const allUsers = await dbHelper.getAllUsers();
    console.log('Available users:', allUsers.map(u => u.name));
    
    if (allUsers.length === 0) {
      console.log('⚠️ No users found in database for search test');
      return;
    }
    
    // Search for users using part of an existing name
    const firstUserName = allUsers[0].name;
    const searchTerm = firstUserName.split(' ')[0]; // Use first word of name
    const searchResults = await dbHelper.searchUsersByName(searchTerm);
    
    console.log(`📊 Search results for "${searchTerm}": ${searchResults.length} users found`);
    searchResults.forEach(user => {
      console.log(`  - ${user.name} (${user.role})`);
    });
    
    // Verify results contain the search term (case insensitive)
    searchResults.forEach(user => {
      expect(user.name.toLowerCase()).toContain(searchTerm.toLowerCase());
    });
  });

  test('should get user count and statistics', async () => {
    // Get total user count
    const totalUsers = await dbHelper.getUserCount();
    expect(totalUsers).toBeGreaterThan(0);
    
    // Get count by role
    const roleStats = await dbHelper.getUserCountByRole();
    expect(roleStats.length).toBeGreaterThan(0);
    
    // Verify stats
    const totalFromStats = roleStats.reduce((sum, stat) => sum + stat.count, 0);
    expect(totalFromStats).toBeLessThanOrEqual(totalUsers); // May be less due to test user creations
    
    console.log(`📊 User Statistics:`);
    console.log(`  - Total Users: ${totalUsers}`);
    roleStats.forEach(stat => {
      console.log(`  - ${stat.role}: ${stat.count} users`);
    });
  });

  test('should execute custom query', async () => {
    // Execute custom query to get admin users
    const customQuery = 'SELECT * FROM users WHERE role = ? ORDER BY name LIMIT 3';
    const results = await dbHelper.executeQuery<User>(customQuery, ['admin']);
    
    // Verify results
    expect(Array.isArray(results)).toBeTruthy();
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(3);
    
    // Verify all results are admin users
    results.forEach(user => {
      expect(user.role).toBe('admin');
    });
    
    console.log(`✅ Custom query executed successfully, found ${results.length} admin users`);
  });

  test('should handle non-existent user operations', async () => {
    const nonExistentId = 99999;
    
    // Try to get non-existent user
    const user = await dbHelper.getUserById(nonExistentId);
    expect(user).toBeNull();
    
    // Try to update non-existent user
    const updateSuccess = await dbHelper.updateUser(nonExistentId, 'Name', 'role');
    expect(updateSuccess).toBeFalsy();
    
    // Try to delete non-existent user
    const deleteSuccess = await dbHelper.deleteUser(nonExistentId);
    expect(deleteSuccess).toBeFalsy();
    
    // Check if user exists
    const exists = await dbHelper.userExists(nonExistentId);
    expect(exists).toBeFalsy();
    
    console.log(`✅ Non-existent user operations handled correctly`);
  });
});