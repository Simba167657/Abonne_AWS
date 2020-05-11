import { Request, Response } from "express";
import { Pool } from "pg";
import * as validator from "validator";
import { TripRepository } from "../repository/trip";
import { CustomerRepository } from "./../../customers/repository/customer";
import { Trip } from "./../../domain/trip";
import { ITripAPI } from "./ITripAPI";

export class TripAPI implements ITripAPI {
  private tripRepo: TripRepository;
  private customerRepo: CustomerRepository;

  constructor(db: Pool) {
    this.tripRepo = new TripRepository(db);
    this.customerRepo = new CustomerRepository(db);
  }
  async handleCreateTrip(req: Request, res: Response): Promise<void> {
    const validationErrors = [];
    if (!req.body.customerName || validator.default.isEmpty(req.body.customerName)) {
      validationErrors.push("customer name cannot be empty");
    }
    if (!req.body.whatsAppNumber || !validator.default.isMobilePhone(req.body.whatsAppNumber, "ar-EG")) {
      validationErrors.push("whatsApp number cannot be empty and must be a valid egyptian number ");
    }
    if (!req.body.startDate || validator.default.isEmpty(req.body.startDate)) {
      validationErrors.push("start date cannot be empty");
    }
    if (!req.body.startTime || validator.default.isEmpty(req.body.startTime)) {
      validationErrors.push("start time cannot be empty");
    }
    if (!req.body.fromAddress || validator.default.isEmpty(req.body.fromAddress)) {
      validationErrors.push("from address cannot be empty");
    }
    if (!req.body.toAddress || validator.default.isEmpty(req.body.toAddress)) {
      validationErrors.push("to address cannot be empty");
    }
    if (!validator.default.isBoolean(String(req.body.oneWay))) {
      validationErrors.push("one way cannot be empty and must be a boolean");
    }

    if (validationErrors.length > 0) {
      res.status(400).send({ errors: validationErrors });
    } else {
      try {
        const date = new Date(req.body.startDate.split("T")[0]);
        const time = req.body.startTime.split(":");
        date.setHours(time[0]);
        date.setMinutes(time[1]);

        const newTrip = new Trip(
          req.body.customerName,
          req.body.whatsAppNumber,
          date,
          req.body.fromAddress,
          req.body.toAddress,
          req.body.waitingHours,
          req.body.oneWay
        );

        await this.tripRepo.createTrip(newTrip);
        await this.customerRepo.createCustomer(req.body.customerName, req.body.whatsAppNumber);
        res.status(201).send({ success: "trip created successfully" });
      } catch (error) {
        this.sendError(res, error, "an error occurred while creating trip, please try again", 400);
      }
    }
  }
  async handleGetAllTrips(req: Request, res: Response): Promise<void> {
    try {
      const status = req.query.status || "NEW";
      const trips = await this.tripRepo.getAllTrips(status);
      res.status(200).send({ trips });
    } catch (error) {
      this.sendError(res, error, "error getting trips", 400);
    }
  }
  async handleUpdateTripByID(req: Request, res: Response): Promise<void> {
    try {
      await this.tripRepo.updateTripByID(req.body.tripId, req.body.updates);
      res.status(200).send({ success: "trip updated successfully" });
    } catch (error) {
      this.sendError(res, error, "error updating trip", 400);
    }
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
