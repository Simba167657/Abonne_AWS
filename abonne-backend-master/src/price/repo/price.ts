import { IPrice } from "./IPrice.interface";
import { Price } from "../../domain/price";
import { Pool } from "pg";
import { logger } from "../../config/logger";

export class PriceRepository implements IPrice {
  private PRICES_TABLE: string = "prices";
  private db: Pool;
  constructor(db: Pool) {
    this.db = db;
  }

  createPrice(price: Price): Promise<Price> {
    throw new Error("Method not implemented.");
  }
  async getAllPrices(): Promise<Price[]> {
    const client = await this.db.connect();
    try {
      const queryText = `
            SELECT * FROM ${this.PRICES_TABLE};
        `;
      const result = await client.query(queryText);
      const prices: Price[] = [];
      for (const row of result.rows) {
        prices.push(row);
      }
      client.release();
      return prices;
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }
  updatePriceByID(id: number, updates: {}) {
    throw new Error("Method not implemented.");
  }
  deletePriceByID(id: number) {
    throw new Error("Method not implemented.");
  }

  private extractPriceFromResult(row: any) {
    return new Price(row.price, row.duration, row.from_city, row.to_city);
  }
}
