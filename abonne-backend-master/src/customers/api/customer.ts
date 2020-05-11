import { Request, Response } from "express";
import { Pool } from "pg";
import { CustomerRepository } from "../repository/customer";

export class CustomerAPI {
  private CustomerRepo: CustomerRepository;

  constructor(db: Pool) {
    this.CustomerRepo = new CustomerRepository(db);
  }

  async handleGetAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      const Customers = await this.CustomerRepo.getAllCustomers();
      res.status(200).send({ Customers });
    } catch (error) {
      this, this.sendError(res, error, "error getting customers", 400);
    }
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
