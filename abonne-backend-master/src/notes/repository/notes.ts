import { Pool } from "pg";
import { logger } from "../../config/logger";

export class NotesRepository {
  private db: Pool;
  constructor(db: Pool) {
    this.db = db;
  }

  async createNote(note: string, driver: number, trip: number, customer: string) {
    const client = await this.db.connect();
    try {
      const queryText = `
        INSERT INTO notes (note, driver, trip, customer) VALUES ($1,$2,$3,$4) RETURNING *
        `;
      const queryValues = [note, driver, trip, customer];
      await client.query(queryText, queryValues);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  async getNotesById(query: any) {
    const entries = Object.entries(query);
    const client = await this.db.connect();
    try {
      const queryText = `SELECT * FROM notes WHERE ${entries[0][0]} = '${entries[0][1]}'`;
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
