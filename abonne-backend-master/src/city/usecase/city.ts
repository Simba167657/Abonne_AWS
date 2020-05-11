import {City} from "../../domain/city";
import {ICityRepository} from "../repository/iCityRepository";
import {ICityUsecase} from "./usecase";

export class CityUsecase implements ICityUsecase {
    private cityRepo: ICityRepository;

    constructor(cityRepo: ICityRepository) {
        this.cityRepo = cityRepo;
    }

    public createCity(city: City) {
        return this.cityRepo.createCity(city);
    }

    public getCityByID(ID: number) {
        return this.cityRepo.getCityByID(ID);
    }

    public getAllCities() {
        return this.cityRepo.getAllCities();
    }
}
