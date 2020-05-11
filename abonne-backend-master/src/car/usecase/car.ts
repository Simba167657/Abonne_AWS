import { ICarModel } from "../../domain/models/icarModel";
import { ICarRepository } from "../repository/repository";
import { ICarUsecase } from "./usecase";

export class CarUsecase implements ICarUsecase {
  private carRepo: ICarRepository;

  constructor(carRepo: ICarRepository) {
    this.carRepo = carRepo;
  }

  public getCarMakes(): Promise<string[]> {
    return this.carRepo.getCarMakes();
  }

  public getCarModels(make: string): Promise<ICarModel[]> {
    return this.carRepo.getCarModels(make);
  }

  public getColors(): Promise<any[]> {
    return this.carRepo.getColors();
  }
  public addCar(make: string, model: string, minimumYears: string): Promise<any[]> {
    return this.carRepo.addCar(make, model, minimumYears);
  }
}
