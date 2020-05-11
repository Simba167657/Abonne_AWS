import { Pool, QueryResult } from "pg";
import { logger } from "../../config/logger";
import { ICarModel } from "../../domain/models/icarModel";
import { Vehicle } from "../../domain/models/vehicle";
import { ICarRepository } from "./repository";

export class CarRepository implements ICarRepository {
  private static CARS_TABLE: string = "cars";
  private static CASR_DRIVER_REF: string = "driver_id";

  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async getColors(): Promise<any> {
    const client = await this.db.connect();
    try {
      const queryText = `SELECT * FROM colors;`;
      const result = await client.query(queryText);
      client.release();
      return result.rows;
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  public async addCar(make: string, model: string, minimumYears: string): Promise<any> {
    const client = await this.db.connect();
    try {
      const queryText = `
      INSERT INTO car_models (make,model,minimum_year)
      VALUES ('${make}', '${model}','${minimumYears}');
      `;
      console.log(queryText);
      await client.query(queryText);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  /**
   * createCar creates a new car db record.
   * @param {Vehicle}
   * @param {number} id of the owner driver
   * @returns {Promise<number>} the id of the newly created record.
   */
  public async createCar(car: Vehicle, driverID: number): Promise<number> {
    const client = await this.db.connect();
    return new Promise<number>((resolve, reject) => {
      client
        .query(
          `INSERT INTO ${CarRepository.CARS_TABLE} (make,model,color,license_number,license_expire_date,year_of_manufacture, ${CarRepository.CASR_DRIVER_REF}) values (
                    ${car.make}, ${car.model}, ${car.color}, ${car.licenseNumber}, ${car.licenseExpiryDate}, ${car.yearOfManufacture}, ${driverID}
                )`
        )
        .then((res: QueryResult) => {
          if (res.rowCount < 1) {
            client.release();
            reject(new Error("failed to insert record"));
          } else {
            client.release();
            resolve(res.rows[0].id);
          }
        })
        .catch(err => {
          client.release();
          logger.error(err);
          reject(err);
        });
    });
  }

  public async getCarMakes(): Promise<string[]> {
    const client = await this.db.connect();
    return new Promise<string[]>((resolve, reject) => {
      client
        .query("SELECT DISTINCT make FROM car_models ORDER BY make ASC")
        .then(res => {
          const makes: string[] = [];
          res.rows.forEach(row => {
            makes.push(row.make);
          });
          client.release();
          resolve(makes);
        })
        .catch(err => {
          client.release();
          logger.error(err);
          reject(err);
        });
    });
  }

  public async getCarModels(make: string): Promise<ICarModel[]> {
    const client = await this.db.connect();
    return new Promise<ICarModel[]>((resolve, reject) => {
      client
        .query(`SELECT model, minimum_year FROM car_models WHERE make = '${make}' AND deleted_at IS NULL;`)
        .then(res => {
          const models: ICarModel[] = [];
          res.rows.forEach(row => {
            models.push({
              model: row.model,
              years: this.getYears(String(row.minimum_year))
            });
          });
          client.release();
          resolve(models);
        })
        .catch(err => {
          client.release();
          logger.error(err.message);
          reject(err);
        });
    });
  }

  private getYears(year: string): number[] {
    const currentYear: number = new Date().getUTCFullYear();
    const givenYear = parseInt(year, 10);
    const years: number[] = [];
    for (let i = currentYear; i >= givenYear; i--) {
      years.push(i);
    }
    return years;
  }
}
