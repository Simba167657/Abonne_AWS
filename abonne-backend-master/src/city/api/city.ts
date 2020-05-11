import { Request, Response } from "express";
import { Pool } from "pg";
import * as validator from "validator";
import { City } from "../../domain/city";
import { CityRepository } from "../repository/city";
import { ICityRepository } from "../repository/iCityRepository";
import { ICityUsecase } from "../usecase/usecase";
import { ICityAPI } from "./ICityAPI";

export class CityAPI implements ICityAPI {
  private cityUsecae: ICityUsecase;
  private cityRepo: ICityRepository;

  constructor(db: Pool) {
    this.cityRepo = new CityRepository(db);
    this.cityUsecae = this.cityRepo;
  }

  public handleGetCities(req: Request, res: Response) {
    this.cityUsecae.getAllCities().then((cities: City[]) => {
      const citiesRes: object[] = [];
      cities.forEach(city => {
        citiesRes.push({
          arabicName: city.arabicName,
          englishName: city.englishName,
          id: city.id
        });
      });
      res.send({
        cities: citiesRes
      });
    });
  }

  public handleCreateCity(req: Request, res: Response) {
    // validate requeste body
    if (validator.default.isEmpty(req.body.englishName)) {
      this.sendError(res, new Error("english name cannot be empty"), "english name cannot be empty", 400);
      return;
    }
    if (validator.default.isEmpty(req.body.arabicName)) {
      this.sendError(res, new Error("arabic name cannot be empty"), "arabic name cannot be empty", 400);
      return;
    }
    const date = new Date();
    const newCity = new City(0, date, date, date, req.body.englishName, req.body.arabicName);
    this.cityUsecae
      .createCity(newCity)
      .then(city => {
        res.status(201).send({
          city: {
            arabicName: city.arabicName,
            englishName: city.englishName,
            id: city.englishName
          },
          message: "city created succesfully"
        });
      })
      .catch(err => {
        this.sendError(res, err, "an error occured while creating city, please try again", 400);
      });
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
