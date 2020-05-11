import { Pool } from "pg";
import { logger } from "../../config/logger";
import { Admin } from "./../../domain/admin";
import { Auth } from "./../../middleware/auth";
import { ExtractUpdatesForSQLv2 } from "./../../utils";

export class AdminRepository {
  private ADMIN_TABLE: string = "admins";
  private db: Pool;
  private auth: Auth;
  constructor(db: Pool) {
    this.db = db;
    this.auth = new Auth();
  }

  async createAdmin(username: string, password: string, name: string, mobile: string): Promise<any> {
    const client = await this.db.connect();
    try {
      const queryText = `
        INSERT INTO ${this.ADMIN_TABLE}
        (username,password,name,mobile_number)
        VALUES
        ($1,$2,$3,$4)
      `;
      const queryValue = [username, password, name, mobile];
      await client.query(queryText, queryValue);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }
  async getAllAdmins(): Promise<Admin[]> {
    const client = await this.db.connect();
    try {
      const queryText = `
            SELECT id, username, role, enabled, name, mobile_number FROM ${this.ADMIN_TABLE};
        `;
      const result = await client.query(queryText);
      const admins: Admin[] = [];
      for (const row of result.rows) {
        admins.push(this.extractAdminFromResult(row));
      }
      client.release();
      return admins;
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }
  async login(username: string, password: string) {
    const client = await this.db.connect();
    try {
      const queryText = `
        SELECT * FROM ${this.ADMIN_TABLE} WHERE username = '${username}'
      `;
      const result = await client.query(queryText);
      const admin = result.rows[0];
      const isValid = await this.auth.validPassword(password, admin.password!);
      if (!admin.username || !admin.enabled || !isValid) {
        throw new Error("invalid credentials");
      }

      const token = this.auth.createToken(admin.id as number, admin.name, admin.username, admin.role);
      client.release();
      return token;
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  async updateAdminByID(id: any, updates: any) {
    console.log({ id, updates });
    const client = await this.db.connect();
    if (updates.password) {
      updates.password = await this.auth.generateHashFromPassword(updates.password);
    }
    const result = ExtractUpdatesForSQLv2(updates);

    try {
      const queryText = `
        UPDATE ${this.ADMIN_TABLE} SET ${result}
        WHERE id = ${id};
      `;
      await client.query(queryText);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  deleteAdminByID(id: number) {
    throw new Error("Method not implemented.");
  }

  private extractAdminFromResult(row: any) {
    return new Admin(row.username, row.role, row.enabled, row.name, row.mobile_number, row.id);
  }
}
