import { Request, Response } from "express";
import * as Formidable from "formidable";
import { Pool } from "pg";
import * as validator from "validator";
import { Storage } from "../../asset/repository/storage";
import { CityRepository } from "../../city/repository/city";
import { CityUsecase } from "../../city/usecase/city";
import { ICityUsecase } from "../../city/usecase/usecase";
import { Car } from "../../domain/car";
import { Driver } from "../../domain/driver";
import { UserRepository } from "../repository/driver";
import { UserUsecase } from "../usecase/driver";
import { IUserUsecase } from "../usecase/usecase";
import { IDriverAPI } from "./IDriverAPI";

interface IFormData {
  fields: Formidable.Fields;
  files: Formidable.Files;
}
export class DriverAPI implements IDriverAPI {
  private userUsecase: IUserUsecase;
  private cityUsecase: ICityUsecase;
  private storage: Storage;
  constructor(db: Pool) {
    const userRepo = new UserRepository(db);
    const cityRepo = new CityRepository(db);
    this.userUsecase = new UserUsecase(userRepo);
    this.cityUsecase = new CityUsecase(cityRepo);
    this.storage = new Storage();
  }

  public async handleUpdateDriver(req: Request, res: Response) {
    try {
      const data = await this.parseUpdateData(req);
      await this.userUsecase.updateDriver({ ...data.fields, ...data.files });
      res.send({ success: "driver updated successfully" });
    } catch (error) {
      this.sendError(req, res, error, "error updating driver", 400);
    }
  }

  public handleCreateDriver(req: Request, res: Response) {
    this.parseData(req)
      .then((data: IFormData) => {
        if (data.files.driverPhoto == null) {
          console.error(data);
          this.sendError(req, res, new Error("null driver photo"), "driver photo is invalid", 400);
          return;
        }
        if (data.files.nationalID == null) {
          console.error(data);
          this.sendError(req, res, new Error("null national ID image"), "national id image is invalid", 400);
          return;
        }
        if (data.files.driverLicensePhoto == null) {
          console.error(data);
          this.sendError(req, res, new Error("null driver license photo"), "driver license photo is invalid", 400);
        }
        if (data.files.carFrontPhoto == null) {
          console.error(data);
          this.sendError(req, res, new Error("null car front photo"), "car front photo is invalid", 400);
        }
        if (data.files.carLicenseFront == null) {
          console.error(data);
          this.sendError(
            req,
            res,
            new Error("null car license front photo"),
            "car license front photo is invalid",
            400
          );
        }
        if (data.files.carLicenseBack == null) {
          console.error(data);
          this.sendError(req, res, new Error("null car license back photo"), "car license back photo is invalid", 400);
        }
        // upload driver photo
        const uploadDriverPhoto = this.storage.store(data.files.driverPhoto.path);
        // upload driver ID
        const uploadDriverID = this.storage.store(data.files.nationalID.path);
        // upload driver license
        const uploadDriverLicense = this.storage.store(data.files.driverLicensePhoto.path);
        // upload car front photo
        const uploadCarFrontPhoto = this.storage.store(data.files.carFrontPhoto.path);
        // upload car license front
        const uploadCarLicenseFront = this.storage.store(data.files.carLicenseFront.path);
        // upload car license back
        const uploadCarLicenseBack = this.storage.store(data.files.carLicenseBack.path);
        Promise.all([
          uploadDriverPhoto,
          uploadDriverID,
          uploadDriverLicense,
          uploadCarFrontPhoto,
          uploadCarLicenseFront,
          uploadCarLicenseBack
        ])
          .then(images => {
            const dumDate = new Date();
            const cityOfResidence = this.cityUsecase.getCityByID(parseInt(String(data.fields.cityOfResidence), 10));
            const favouriteDestination = this.cityUsecase.getCityByID(
              parseInt(String(data.fields.favouriteDestination), 10)
            );
            Promise.all([cityOfResidence, favouriteDestination])
              .then(cities => {
                const car = new Car(
                  0,
                  dumDate,
                  dumDate,
                  dumDate,
                  String(data.fields.carMake),
                  String(data.fields.carModel),
                  String(data.fields.carColor),
                  String(data.fields.carLicenseNumber),
                  new Date(String(data.fields.carLicenseExpire)),
                  new Date(parseInt(String(data.fields.carYearOfManufacture), 10), 0, 1),
                  images[3],
                  images[4],
                  images[5]
                );
                const driver = new Driver(
                  0,
                  dumDate,
                  dumDate,
                  dumDate,
                  String(data.fields.firstName),
                  String(data.fields.lastName),
                  new Date(String(data.fields.dateOfBirth)),
                  String(data.fields.whatsappNumber),
                  String(data.fields.phone),
                  cities[0],
                  cities[1],
                  images[0],
                  images[1],
                  car,
                  images[2]
                );
                this.userUsecase
                  .createDriver(driver)
                  .then(newDriver => {
                    console.log(newDriver);
                    res.status(201).send({
                      success: "driver created successfully"
                    });
                  })
                  .catch(err => {
                    this.sendError(req, res, err, "this mobile number is already registered", 400);
                  });
              })
              .catch(err => {
                this.sendError(req, res, err, "error processing your request, please try again", 400);
              });
          })
          .catch(err => {
            this.sendError(req, res, err, "error uploading images to the server , please try again", 400);
          });
      })
      .catch(err => {
        this.sendError(req, res, err, err.message, 400);
      });
  }

  public handleGetAllDrivers(req: Request, res: Response) {
    this.userUsecase
      .getAllDrivers()
      .then((drivers: Driver[]) => {
        const driverObjects: any[] = [];
        drivers.forEach(driver => {
          driverObjects.push(driver.toJSON());
        });
        res.send({
          drivers: driverObjects
        });
      })
      .catch(err => {
        this.sendError(req, res, err, "error getting drivers", 400);
      });
  }

  public async handleGetDriverById(req: Request, res: Response) {
    try {
      const driver = await this.userUsecase.getDriverById(parseInt(req.params.id, 10));
      res.status(200).send(driver);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  public async handleDeleteDriver(req: Request, res: Response) {
    if (validator.default.isEmpty(String(req.body.mobile))) {
      return res.status(400).send("Please provide a phone number");
    }
    try {
      const result = await this.userUsecase.deleteDriver(req.body.mobile);
      res.status(200).send({ success: "Driver removed successfully", data: result });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  private parseData(req: Request): Promise<IFormData> {
    return new Promise<IFormData>((resolve, reject) => {
      const form = new Formidable.IncomingForm();
      form.parse(req, (err, fields: Formidable.Fields, files: Formidable.Files) => {
        if (err) {
          reject(err);
        } else {
          const data: IFormData = {
            fields,
            files
          };
          // validate fields
          if (!data.fields.firstName || validator.default.isEmpty(String(data.fields.firstName))) {
            reject(new Error("driver first name must exist"));
          }
          if (!data.fields.lastName || validator.default.isEmpty(String(data.fields.lastName))) {
            reject(new Error("driver last name must exist"));
          }
          if (!data.fields.dateOfBirth || validator.default.isEmpty(String(data.fields.dateOfBirth))) {
            reject(new Error("driver date of birth is invalid"));
          }
          if (!validator.default.isMobilePhone(String(data.fields.phone), "ar-EG")) {
            reject(new Error("mobile phone must be a valid egyptian phone number"));
          }
          if (!validator.default.isMobilePhone(String(data.fields.whatsappNumber), "ar-EG")) {
            reject(new Error("whatsapp number must be a valid egyptian phone number"));
          }
          if (!data.fields.carMake || validator.default.isEmpty(String(data.fields.carMake))) {
            reject(new Error("car make cannot be blank"));
          }
          if (!data.fields.carModel || validator.default.isEmpty(String(data.fields.carModel))) {
            reject(new Error("car model cannot be blank"));
          }
          if (!data.fields.carLicenseNumber || validator.default.isEmpty(String(data.fields.carLicenseNumber))) {
            reject(new Error("car license number cannot be blank"));
          }
          if (!data.fields.carColor || validator.default.isEmpty(String(data.fields.carColor))) {
            reject(new Error("car color cannot be blank"));
          }
          if (!data.fields.carLicenseNumber || validator.default.isEmpty(String(data.fields.carLicenseNumber))) {
            reject(new Error("car license number cannot be empty"));
          }
          if (
            !data.fields.carYearOfManufacture ||
            validator.default.isEmpty(String(data.fields.carYearOfManufacture))
          ) {
            reject(new Error("car year of manufacture is invalid"));
          }
          if (!data.fields.carLicenseExpire || validator.default.isEmpty(String(data.fields.carLicenseExpire))) {
            reject(new Error("car license expiry date is invalid"));
          }
          if (!data.fields.cityOfResidence || validator.default.isEmpty(String(data.fields.cityOfResidence))) {
            reject(new Error("city Of Residence is missing"));
          }
          if (!data.fields.cityOfResidence || validator.default.isEmpty(String(data.fields.cityOfResidence))) {
            reject(new Error("city Of Residence is missing"));
          }
          if (
            !data.fields.favouriteDestination ||
            validator.default.isEmpty(String(data.fields.favouriteDestination))
          ) {
            reject(new Error("favourite Destination is missing"));
          }
          resolve(data);
        }
      });
    });
  }

  private async parseUpdateData(req: Request): Promise<IFormData> {
    return new Promise<IFormData>((resolve, reject) => {
      const form = new Formidable.IncomingForm();
      form.parse(req, (err, fields: Formidable.Fields, files: Formidable.Files) => {
        if (err) reject(err);

        const data: IFormData = { fields, files };

        resolve(data);
      });
    });
  }

  private sendError(req: Request, res: Response, err: Error, message: string, code: number) {
    console.log(req.body);
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
