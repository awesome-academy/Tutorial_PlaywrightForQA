import mysql from 'mysql2/promise';

/**
 * Database Configuration Interface
 */
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  connectionLimit?: number;
}

/**
 * Database Connection Configuration
 */
export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: mysql.Pool | null = null;
  private config: DatabaseConfig;

  private constructor() {
    this.config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      database: process.env.DB_NAME || 'wsm_auto',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '123456',
      connectionLimit: 10
    };
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  /**
   * Create connection pool
   */
  public async createPool(): Promise<mysql.Pool> {
    if (!this.pool) {
      try {
        this.pool = mysql.createPool(this.config);
        console.log('✅ Database connection pool created successfully');
        
        // Test connection
        const connection = await this.pool.getConnection();
        await connection.ping();
        connection.release();
        console.log('✅ Database connection test successful');
        
      } catch (error) {
        console.error('❌ Failed to create database connection:', error);
        throw error;
      }
    }
    return this.pool;
  }

  /**
   * Get connection pool
   */
  public getPool(): mysql.Pool {
    if (!this.pool) {
      throw new Error('Database pool not initialized. Call createPool() first.');
    }
    return this.pool;
  }

  /**
   * Close all connections
   */
  public async closePool(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log('✅ Database connection pool closed');
    }
  }

  /**
   * Test database connection
   */
  public async testConnection(): Promise<boolean> {
    try {
      if (!this.pool) {
        await this.createPool();
      }
      
      const connection = await this.pool!.getConnection();
      await connection.ping();
      connection.release();
      return true;
    } catch (error) {
      console.error('❌ Database connection test failed:', error);
      return false;
    }
  }

  /**
   * Get database configuration (without password)
   */
  public getConfig(): Omit<DatabaseConfig, 'password'> {
    const { password, ...configWithoutPassword } = this.config;
    return configWithoutPassword;
  }
}