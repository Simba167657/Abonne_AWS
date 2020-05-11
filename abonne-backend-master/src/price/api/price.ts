import { Request, Response } from "express";
import { Pool } from "pg";
import { IPrice } from "./../repo/IPrice.interface";
import { PriceRepository } from "./../repo/price";

export class PriceAPI {
  private priceRepo: IPrice;

  constructor(db: Pool) {
    this.priceRepo = new PriceRepository(db);
  }

  async handleGetAllPrices(req: Request, res: Response): Promise<void> {
    try {
      const prices = await this.priceRepo.getAllPrices();
      res.status(200).send({ prices });
    } catch (error) {
      this.sendError(res, error, "error getting prices", 400);
    }
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
