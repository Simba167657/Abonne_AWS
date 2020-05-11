import { Request, Response } from "express";
import { Pool } from "pg";
import { ICarModel } from "../../domain/models/icarModel";
import { CarRepository } from "../repository/car";
import { ICarRepository } from "../repository/repository";
import { CarUsecase } from "../usecase/car";
import { ICarUsecase } from "../usecase/usecase";
import { ICarAPI } from "./iCarAPI";

export class CarAPI implements ICarAPI {
  private carUsecase: ICarUsecase;
  private carRepo: ICarRepository;

  constructor(db: Pool) {
    this.carRepo = new CarRepository(db);
    this.carUsecase = new CarUsecase(this.carRepo);
  }

  public async handleGetColors(req: Request, res: Response) {
    try {
      const colors = await this.carUsecase.getColors();
      res.status(200).send({ colors });
    } catch (error) {
      this.sendError(res, error, "error getting colors", 400);
    }
  }

  public async handleAddCar(req: Request, res: Response) {
    try {
      const { make, model, minimumYears } = req.body;
      await this.carUsecase.addCar(make, model, minimumYears);
      res.status(200).send({ success: "car added successfully" });
    } catch (error) {
      this.sendError(res, error, "error adding new car", 400);
    }
  }

  public handleGetCarMakes(req: Request, res: Response) {
    this.carUsecase
      .getCarMakes()
      .then(makes => {
        res.send({
          makes
        });
      })
      .catch(err => {
        this.sendError(res, err, "error getting car makes", 400);
      });
  }

  public handleGetCarModels(req: Request, res: Response) {
    this.carUsecase
      .getCarModels(req.query.make)
      .then((models: ICarModel[]) => {
        res.send({
          models
        });
      })
      .catch(err => {
        this.sendError(res, err, "error getting car models", 400);
      });
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
