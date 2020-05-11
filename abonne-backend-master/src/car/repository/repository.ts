import { ICarModel } from "../../domain/models/icarModel";
import { Vehicle } from "../../domain/models/vehicle";

/**
 * ICarRepository has the methods to interact with the database regarding cars.
 */
export interface ICarRepository {
  /**
   * createCar creates a new car db record.
   * @param {Vehicle}
   * @param {number} id of the owner driver
   * @returns {Promise<number>} the id of the newly created record.
   */
  createCar(car: Vehicle, driverID: number): Promise<number>;

  getCarMakes(): Promise<string[]>;

  getCarModels(make: string): Promise<ICarModel[]>;
  getColors(): Promise<any>;
  addCar(make: string, model: string, minimumYears: string): Promise<any>;
}
