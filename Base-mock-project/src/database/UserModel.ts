/**
 * User Interface - simplified for existing database
 */
export interface User {
  id?: number;
  name: string;
  role: string;
}

/**
 * User Role Enum
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  GUEST = 'guest'
}

/**
 * SQL Scripts for Users table queries
 */
export class UserSQL {

  /**
   * Select all users SQL (without created_at order)
   */
  public static readonly SELECT_ALL = `SELECT * FROM users ORDER BY id DESC;`;

  /**
   * Select user by ID SQL
   */
  public static readonly SELECT_BY_ID = `SELECT * FROM users WHERE id = ?;`;

  /**
   * Select users by role SQL
   */
  public static readonly SELECT_BY_ROLE = `SELECT * FROM users WHERE role = ? ORDER BY name;`;

  /**
   * Insert new user SQL
   */
  public static readonly INSERT_USER = `INSERT INTO users (name, role) VALUES (?, ?);`;

  /**
   * Update user SQL
   */
  public static readonly UPDATE_USER = `UPDATE users SET name = ?, role = ? WHERE id = ?;`;

  /**
   * Delete user SQL
   */
  public static readonly DELETE_USER = `DELETE FROM users WHERE id = ?;`;

  /**
   * Count users by role SQL
   */
  public static readonly COUNT_BY_ROLE = `SELECT role, COUNT(*) as count FROM users GROUP BY role;`;

  /**
   * Search users by name SQL
   */
  public static readonly SEARCH_BY_NAME = `SELECT * FROM users WHERE name LIKE ? ORDER BY name;`;
}