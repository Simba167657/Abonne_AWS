import { Request, Response } from "express";
export interface ITripAPI {
  handleCreateTrip(req: Request, res: Response): Promise<void>;
}
