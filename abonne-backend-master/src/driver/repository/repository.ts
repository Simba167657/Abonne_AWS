import { Driver } from "../../domain/driver";
import { User } from "../../domain/models/user";

export interface IUserRepository {
  deleteDriver(mobile: string): Promise<Driver>;
  getDriverById(id: number): Promise<Driver>;
  createDriver(driver: Driver): Promise<Driver>;
  updateDriver(updates: {}): Promise<any>;
  createUser(user: User): Promise<number>;
  getAllDrivers(): Promise<Driver[]>;
}
