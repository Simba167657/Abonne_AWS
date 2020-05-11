import {Request, Response} from "express";

export interface ICityAPI {
    // createCity(req: Request, res: Response): void;
    handleGetCities(req: Request, res: Response): void;
}
