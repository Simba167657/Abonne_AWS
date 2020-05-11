import {Pool, QueryResult} from "pg";
import {logger} from "../../config/logger";
import {City} from "../../domain/city";
import {ICityRepository} from "./iCityRepository";

export class CityRepository implements ICityRepository {
    private static CITIES_TABLE: string = "cities";
    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    public async createCity(city: City): Promise<City> {
        const client = await this.db.connect();
        return new Promise<City>((resolve, reject) => {
            const insertQueryText = `INSERT INTO ${CityRepository.CITIES_TABLE} (english_name, arabic_name) VALUES ($1,$2) RETURNING *`;
            const insertQueryValues = [
                city.englishName,
                city.arabicName,
            ];
            client.query(insertQueryText, insertQueryValues).then((res: QueryResult) => {
                client.release();
                resolve(this.extracatCityFromRes(res));
            }).catch((err) => {
                client.release();
                logger.error(err);
                reject(new Error("error creating city " + err.message));
            });
        });
    }

    public async getCityByID(ID: number): Promise<City> {
        const client = await this.db.connect();
        return new Promise<City>((resolve, reject) => {
            console.log(ID);
            const queryText = `SELECT * FROM ${CityRepository.CITIES_TABLE} WHERE id = $1`;
            const queryValues = [ID];
            client.query(queryText, queryValues).then((res: QueryResult) => {
                client.release();
                resolve(this.extracatCityFromRes(res));
            }).catch((err) => {
                client.release();
                logger.error(err);
                reject(new Error("error getting city " + err.message));
            });
        });
    }

    public async getAllCities(): Promise<City[]> {
        const client = await this.db.connect();
        return new Promise<City[]>((resolve, reject) => {
            const queryText = `SELECT * FROM ${CityRepository.CITIES_TABLE} ORDER BY arabic_name ASC`;
            client.query(queryText, []).then((res: QueryResult) => {
                client.release();
                resolve(this.extractCitiesArrayFromRes(res));
            }).catch((err) => {
                client.release();
                logger.error(err);
                reject(new Error("error getting cities" + err.message));
            });
        });
    }

    private extracatCityFromRes(res: QueryResult): City {
        const row = res.rows[0];
        const city = new City(
            row.id,
            row.created_at,
            row.deleted_at,
            row.updated_at,
            row.english_name,
            row.arabic_name,
        );
        return city;
    }

    private extractCitiesArrayFromRes(res: QueryResult): City[] {
        const cities: City[] = [];
        res.rows.forEach((row) => {
            const city = new City(
                row.id,
                row.created_at,
                row.deleted_at,
                row.updated_at,
                row.english_name,
                row.arabic_name,
            );
            cities.push(city);
        });
        return cities;
    }
}
