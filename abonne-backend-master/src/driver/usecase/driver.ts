import { Driver } from "../../domain/driver";
import { IUserRepository } from "../repository/repository";
import { IUserUsecase } from "./usecase";

export class UserUsecase implements IUserUsecase {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public createDriver(driver: Driver): Promise<Driver> {
    return this.userRepo.createDriver(driver);
  }

  public updateDriver(updates: any): Promise<any> {
    return this.userRepo.updateDriver(updates);
  }

  public getAllDrivers(): Promise<Driver[]> {
    return this.userRepo.getAllDrivers();
  }

  public async deleteDriver(mobile: string) {
    return await this.userRepo.deleteDriver(mobile);
  }

  public async getDriverById(id: number) {
    return await this.userRepo.getDriverById(id);
  }
}
