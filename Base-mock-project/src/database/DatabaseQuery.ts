import mysql from 'mysql2/promise';
import { DatabaseConnection } from './DatabaseConnection';

/**
 * Query Result Interface
 */
export interface QueryResult<T = any> {
  data: T[];
  affectedRows?: number;
  insertId?: number;
  fieldCount?: number;
}

/**
 * Database Query Helper Class
 */
export class DatabaseQuery {
  private dbConnection: DatabaseConnection;

  constructor() {
    this.dbConnection = DatabaseConnection.getInstance();
  }

  /**
   * Execute SELECT query
   */
  public async select<T = any>(
    query: string, 
    params: any[] = []
  ): Promise<QueryResult<T>> {
    try {
      const pool = this.dbConnection.getPool();
      const [rows, fields] = await pool.execute(query, params);
      
      return {
        data: rows as T[],
        fieldCount: (fields as mysql.FieldPacket[]).length
      };
    } catch (error) {
      console.error('❌ SELECT query failed:', error);
      throw new Error(`Database SELECT error: ${error}`);
    }
  }

  /**
   * Execute INSERT query
   */
  public async insert(
    query: string, 
    params: any[] = []
  ): Promise<QueryResult> {
    try {
      const pool = this.dbConnection.getPool();
      const [result] = await pool.execute(query, params);
      const insertResult = result as mysql.ResultSetHeader;
      
      return {
        data: [],
        affectedRows: insertResult.affectedRows,
        insertId: insertResult.insertId
      };
    } catch (error) {
      console.error('❌ INSERT query failed:', error);
      throw new Error(`Database INSERT error: ${error}`);
    }
  }

  /**
   * Execute UPDATE query
   */
  public async update(
    query: string, 
    params: any[] = []
  ): Promise<QueryResult> {
    try {
      const pool = this.dbConnection.getPool();
      const [result] = await pool.execute(query, params);
      const updateResult = result as mysql.ResultSetHeader;
      
      return {
        data: [],
        affectedRows: updateResult.affectedRows
      };
    } catch (error) {
      console.error('❌ UPDATE query failed:', error);
      throw new Error(`Database UPDATE error: ${error}`);
    }
  }

  /**
   * Execute DELETE query
   */
  public async delete(
    query: string, 
    params: any[] = []
  ): Promise<QueryResult> {
    try {
      const pool = this.dbConnection.getPool();
      const [result] = await pool.execute(query, params);
      const deleteResult = result as mysql.ResultSetHeader;
      
      return {
        data: [],
        affectedRows: deleteResult.affectedRows
      };
    } catch (error) {
      console.error('❌ DELETE query failed:', error);
      throw new Error(`Database DELETE error: ${error}`);
    }
  }

  /**
   * Execute custom query (DDL, etc.)
   */
  public async execute(
    query: string, 
    params: any[] = []
  ): Promise<QueryResult> {
    try {
      const pool = this.dbConnection.getPool();
      const [result] = await pool.execute(query, params);
      
      // Handle different result types
      if (Array.isArray(result)) {
        return { data: result };
      } else {
        const execResult = result as mysql.ResultSetHeader;
        return {
          data: [],
          affectedRows: execResult.affectedRows,
          insertId: execResult.insertId
        };
      }
    } catch (error) {
      console.error('❌ Execute query failed:', error);
      throw new Error(`Database execute error: ${error}`);
    }
  }

  /**
   * Execute transaction
   */
  public async transaction(queries: Array<{ query: string; params?: any[] }>): Promise<QueryResult[]> {
    const pool = this.dbConnection.getPool();
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const results: QueryResult[] = [];
      
      for (const { query, params = [] } of queries) {
        const [result] = await connection.execute(query, params);
        
        if (Array.isArray(result)) {
          results.push({ data: result });
        } else {
          const execResult = result as mysql.ResultSetHeader;
          results.push({
            data: [],
            affectedRows: execResult.affectedRows,
            insertId: execResult.insertId
          });
        }
      }
      
      await connection.commit();
      console.log('✅ Transaction completed successfully');
      return results;
      
    } catch (error) {
      await connection.rollback();
      console.error('❌ Transaction failed, rolled back:', error);
      throw new Error(`Transaction error: ${error}`);
    } finally {
      connection.release();
    }
  }

  /**
   * Get single record
   */
  public async findOne<T = any>(
    query: string, 
    params: any[] = []
  ): Promise<T | null> {
    const result = await this.select<T>(query, params);
    return result.data.length > 0 ? result.data[0] : null;
  }

  /**
   * Check if record exists
   */
  public async exists(
    query: string, 
    params: any[] = []
  ): Promise<boolean> {
    const result = await this.select(query, params);
    return result.data.length > 0;
  }

  /**
   * Get record count
   */
  public async count(
    tableName: string, 
    whereClause: string = '', 
    params: any[] = []
  ): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM ${tableName} ${whereClause}`;
    const result = await this.select<{ count: number }>(query, params);
    return result.data[0]?.count || 0;
  }
}