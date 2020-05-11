import {City} from "../../domain/city";

export interface ICityUsecase {
    getCityByID(ID: number): Promise<City>;
    getAllCities(): Promise<City[]>;
    createCity(city: City): Promise<City>;
}
