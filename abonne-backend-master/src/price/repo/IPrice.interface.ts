import { Price } from "./../../domain/price";

export interface IPrice {
  createPrice(price: Price): Promise<Price>;
  getAllPrices(): Promise<Price[]>;
  updatePriceByID(id: number, updates: {}): any;
  deletePriceByID(id: number): any;
}
