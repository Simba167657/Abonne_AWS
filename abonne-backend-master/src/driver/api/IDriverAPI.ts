import { Request, Response } from "express";
export interface IDriverAPI {
    handleCreateDriver(req: Request, res: Response): void;
    handleGetAllDrivers(req: Request, res: Response): void;
}
