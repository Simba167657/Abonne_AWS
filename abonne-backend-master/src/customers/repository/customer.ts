import { Pool } from "pg";
import { logger } from "../../config/logger";
import { Customer } from "../../domain/customer";

export class CustomerRepository {
  private CUSTOMERS_TABLE: string = "customers";
  private db: Pool;
  constructor(db: Pool) {
    this.db = db;
  }

  async createCustomer(name: string, number: string): Promise<any> {
    const whatsAppNumber = number.replace("+2", "");
    const client = await this.db.connect();
    try {
      const queryText = `
        INSERT INTO ${this.CUSTOMERS_TABLE} (name,whatsapp_number)
        VALUES ($1,$2) 
        RETURNING *;
      `;
      const queryValues = [name, whatsAppNumber];
      await client.query(queryText, queryValues);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
    }
  }
  async getAllCustomers(): Promise<Customer[]> {
    const client = await this.db.connect();
    try {
      const queryText = `
            SELECT * FROM ${this.CUSTOMERS_TABLE};
        `;
      const result = await client.query(queryText);
      const customers: Customer[] = [];
      for (const row of result.rows) {
        customers.push(this.extractCustomerFromResult(row));
      }
      client.release();
      return customers;
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  private extractCustomerFromResult = (row: any) => {
    return new Customer(row.name, row.whatsapp_number);
  };
}
