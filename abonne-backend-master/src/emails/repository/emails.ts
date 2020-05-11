import { Pool } from "pg";
import { logger } from "../../config/logger";

export class EmailsRepository {
  private db: Pool;
  constructor(db: Pool) {
    this.db = db;
  }

  async createEmail(email: string) {
    const client = await this.db.connect();
    try {
      const queryText = `INSERT INTO emails (email) VALUES ('${email}')`;
      await client.query(queryText);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  async getAllEmails() {
    const client = await this.db.connect();
    try {
      const queryText = `SELECT * FROM emails`;
      const result = await client.query(queryText);
      client.release();
      return result.rows;
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }
}
