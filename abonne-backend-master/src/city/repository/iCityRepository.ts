import {ACity} from "../../domain/models/acity";

export interface ICityRepository {
    createCity(city: ACity): Promise<ACity>;
    getCityByID(ID: number): Promise<ACity>;
    getAllCities(): Promise<ACity[]>;
}
