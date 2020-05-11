import {Request, Response} from "express";

export interface ICarAPI {
    handleGetCarMakes(req: Request, res: Response): void;
    handleGetCarModels(req: Request, res: Response): void;
}
