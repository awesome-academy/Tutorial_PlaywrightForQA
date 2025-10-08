import { DatabaseConnection } from './DatabaseConnection';
import { DatabaseQuery } from './DatabaseQuery';
import { User, UserRole, UserSQL } from './UserModel';

/**
 * Database Helper Class - Main interface for database operations
 */
export class DatabaseHelper {
  private static instance: DatabaseHelper;
  private dbConnection: DatabaseConnection;
  private query: DatabaseQuery;

  private constructor() {
    this.dbConnection = DatabaseConnection.getInstance();
    this.query = new DatabaseQuery();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): DatabaseHelper {
    if (!DatabaseHelper.instance) {
      DatabaseHelper.instance = new DatabaseHelper();
    }
    return DatabaseHelper.instance;
  }

  /**
   * Initialize database connection
   */
  public async initialize(): Promise<void> {
    try {
      await this.dbConnection.createPool();
      console.log('✅ Database Helper initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Database Helper:', error);
      throw error;
    }
  }

  /**
   * Close database connection
   */
  public async close(): Promise<void> {
    await this.dbConnection.closePool();
  }

  /**
   * Test database connection
   */
  public async testConnection(): Promise<boolean> {
    return await this.dbConnection.testConnection();
  }

  // =============================================================================
  // USER OPERATIONS
  // =============================================================================

  /**
   * Get all users
   */
  public async getAllUsers(): Promise<User[]> {
    const result = await this.query.select<User>(UserSQL.SELECT_ALL);
    return result.data;
  }

  /**
   * Get user by ID
   */
  public async getUserById(id: number): Promise<User | null> {
    return await this.query.findOne<User>(UserSQL.SELECT_BY_ID, [id]);
  }

  /**
   * Get users by role
   */
  public async getUsersByRole(role: string | UserRole): Promise<User[]> {
    const result = await this.query.select<User>(UserSQL.SELECT_BY_ROLE, [role]);
    return result.data;
  }

  /**
   * Create new user
   */
  public async createUser(name: string, role: string | UserRole): Promise<number> {
    const result = await this.query.insert(UserSQL.INSERT_USER, [name, role]);
    return result.insertId || 0;
  }

  /**
   * Update user
   */
  public async updateUser(id: number, name: string, role: string | UserRole): Promise<boolean> {
    const result = await this.query.update(UserSQL.UPDATE_USER, [name, role, id]);
    return (result.affectedRows || 0) > 0;
  }

  /**
   * Delete user
   */
  public async deleteUser(id: number): Promise<boolean> {
    const result = await this.query.delete(UserSQL.DELETE_USER, [id]);
    return (result.affectedRows || 0) > 0;
  }

  /**
   * Search users by name
   */
  public async searchUsersByName(searchTerm: string): Promise<User[]> {
    const result = await this.query.select<User>(UserSQL.SEARCH_BY_NAME, [`%${searchTerm}%`]);
    return result.data;
  }

  /**
   * Get user count
   */
  public async getUserCount(): Promise<number> {
    return await this.query.count('users');
  }

  /**
   * Get user count by role
   */
  public async getUserCountByRole(): Promise<Array<{ role: string; count: number }>> {
    const result = await this.query.select<{ role: string; count: number }>(UserSQL.COUNT_BY_ROLE);
    return result.data;
  }

  /**
   * Check if user exists
   */
  public async userExists(id: number): Promise<boolean> {
    return await this.query.exists(UserSQL.SELECT_BY_ID, [id]);
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  /**
   * Execute custom query
   */
  public async executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
    const result = await this.query.select<T>(query, params);
    return result.data;
  }

  /**
   * Execute custom non-select query
   */
  public async executeNonQuery(query: string, params: any[] = []): Promise<{ affectedRows: number; insertId?: number }> {
    const result = await this.query.execute(query, params);
    return {
      affectedRows: result.affectedRows || 0,
      insertId: result.insertId
    };
  }

  /**
   * Get database info
   */
  public getDatabaseInfo(): any {
    return this.dbConnection.getConfig();
  }
}

// Export singleton instance
export const dbHelper = DatabaseHelper.getInstance();