import { Driver } from "../../domain/driver";

export interface IUserUsecase {
  deleteDriver(mobile: string): Promise<any>;
  createDriver(driver: Driver): Promise<Driver>;
  updateDriver(updates: any): Promise<any>;
  getAllDrivers(): Promise<Driver[]>;
  getDriverById(id: number): Promise<Driver>;
}
