import { ICarModel } from "../../domain/models/icarModel";

export interface ICarUsecase {
  getCarMakes(): Promise<string[]>;
  getCarModels(make: string): Promise<ICarModel[]>;
  getColors(): Promise<any[]>;
  addCar(make: string, model: string, minimumYears: string): Promise<any[]>;
}
