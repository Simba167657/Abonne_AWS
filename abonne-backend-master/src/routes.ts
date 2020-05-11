import * as express from "express";
import { NextFunction, Response } from "express";
import * as morgan from "morgan";
import { AdminAPI } from "./admins/api/admin";
import { CarAPI } from "./car/api/car";
import { CityAPI } from "./city/api/city";
import { db } from "./config/db";
import { logger } from "./config/logger";
import { CustomerAPI } from "./customers/api/customer";
import { DriverAPI } from "./driver/api/driver";
import { EmailsAPI } from "./emails/api/emails";
import { Auth, IPayload } from "./middleware/auth";
import { NotesAPI } from "./notes/api/notes";
import { PriceAPI } from "./price/api/price";
import { TripAPI } from "./trips/api/trip";

export class Routes {
  private env: string;
  private driverAPI: DriverAPI;
  private cityAPI: CityAPI;
  private carAPI: CarAPI;
  private tripAPI: TripAPI;
  private priceAPI: PriceAPI;
  private customerAPI: CustomerAPI;
  private adminAPI: AdminAPI;
  private auth: Auth;
  private emailsAPI: EmailsAPI;
  private notesAPI: NotesAPI;

  constructor() {
    this.env = process.env.ENV ? process.env.ENV : "dev";
    this.driverAPI = new DriverAPI(db);
    this.cityAPI = new CityAPI(db);
    this.carAPI = new CarAPI(db);
    this.tripAPI = new TripAPI(db);
    this.priceAPI = new PriceAPI(db);
    this.customerAPI = new CustomerAPI(db);
    this.adminAPI = new AdminAPI(db);
    this.auth = new Auth();
    this.emailsAPI = new EmailsAPI(db);
    this.notesAPI = new NotesAPI(db);
  }

  private async validTokenClaims(payload: IPayload) {
    const client = await db.connect();
    try {
      const queryText = `
        SELECT * FROM admins WHERE id = ${payload.id}
      `;
      const result = await client.query(queryText);
      return result.rows[0].role === payload.role;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public paths(app: express.Application) {
    switch (this.env) {
      case "prod":
        app.use((req, _, next) => {
          logger.info(new Date().toISOString + " | " + req.ip + " | " + req.statusCode + " | " + req.route + " | ");
          next();
        });
      case "staging":
        app.use((req, _, next) => {
          logger.info(new Date().toISOString + " | " + req.ip + " | " + req.statusCode + " | " + req.route + " | ");
          next();
        });
      default:
        app.use(morgan.default("combined"));
    }
    app.use(express.static("abonee"));
    app.get("/", express.static("abonee"));
    app.get("/", (req, res) => res.send("live..."));

    app.post("/api/v1/notes", async (req: express.Request, res: express.Response) => {
      await this.notesAPI.handleAddNote(req, res);
    });

    app.get("/api/v1/notes", async (req: express.Request, res: express.Response) => {
      await this.notesAPI.handleGetNotes(req, res);
    });

    app.post("/api/v1/emails", async (req: express.Request, res: express.Response) => {
      await this.emailsAPI.handleAddEmail(req, res);
    });

    app.get("/api/v1/emails", async (req: express.Request, res: express.Response) => {
      await this.emailsAPI.handleGetAllEmails(req, res);
    });

    /**
     * Create new car model
     * @route POST /car
     * @group cars
     * @param {string} make.body.required
     * @param {string} model.body.required
     * @param {string} minimumYears.body.required
     * @returns {object} 201 - "success": "car created successfully"
     */
    app.post("/api/v1/car", async (req: express.Request, res: express.Response) => {
      await this.carAPI.handleAddCar(req, res);
    });

    /**
     * Create new driver - Headers : Content-Type : multipart/form-data
     * @route POST /driver
     * @group drivers
     * @param {string} firstName.form.required
     * @param {string} lastName.form.required
     * @param {date} dateOfBirth.form.required - Date in ISO format
     * @param {string} cityOfResidence.form.required - ID of a city
     * @param {string} favouriteDestination.form.required - ID of a city
     * @param {string} phone.form.required - valid egyptian phone number
     * @param {string} whatsappNumber.form.required - valid egyptian phone number
     * @param {file} driverPhoto.form.required
     * @param {file} nationalID.form.required
     * @param {string} carMake.form.required
     * @param {string} carModel.form.required
     * @param {string} carLicenseNumber.form.required
     * @param {string} carColor.form.required
     * @param {string} carYearOfManufacture.form.required
     * @param {string} carLicenseExpire.form.required
     * @param {file} carFrontPhoto.form.required
     * @param {file} driverLicensePhoto.form.required
     * @param {file} carLicenseFront.form.required
     * @param {file} carLicenseBack.form.required
     * @returns {object} 201 - "success": "driver created successfully"
     * @returns {object} 400 - "success": "driver created successfully"
     */
    app.post("/api/v1/driver", (req: express.Request, res: express.Response) => {
      this.driverAPI.handleCreateDriver(req, res);
    });
    /**
     * @returns {object} 201 - "success": "driver updated successfully"
     * @returns {object} 400 - "success": "driver updated successfully"
     */
    app.put("/api/v1/driver", this.auth.isAuthenticated, async (req: express.Request, res: express.Response) => {
      await this.driverAPI.handleUpdateDriver(req, res);
    });

    /**
     * Delete driver
     * @route DELETE /driver
     * @group drivers
     * @param {string} mobile.body.required
     * @returns {object} 200 - "success": "driver removed successfully"
     */
    app.delete("/api/v1/driver", this.auth.isAuthenticated, async (req: express.Request, res: express.Response) => {
      await this.driverAPI.handleDeleteDriver(req, res);
    });

    /**
     * Get driver by ID
     * @route GET /driver/:id
     * @group drivers
     * @param {string} id.param.required
     * @returns {object} 200 - driver
     */
    app.get("/api/v1/driver/:id", async (req: express.Request, res: express.Response) => {
      await this.driverAPI.handleGetDriverById(req, res);
    });

    /**
     * Get all drivers
     * @route GET /drivers
     * @group drivers
     * @returns {object} 200 - []
     */
    app.get("/api/v1/drivers", (req: express.Request, res: express.Response) => {
      this.driverAPI.handleGetAllDrivers(req, res);
    });

    /**
     * Create new city
     * @route POST /city
     * @group cities
     * @param {string} englishName.body.required
     * @param {string} arabicName.body.required
     * @returns {object} 201 - "success": "city created successfully"
     */
    app.post("/api/v1/city", (req: express.Request, res: express.Response) => {
      this.cityAPI.handleCreateCity(req, res);
    });

    /**
     * Get all cities
     * @route GET /cities
     * @group cities
     * @returns {object} 200 - []
     */
    app.get("/api/v1/cities", (req: express.Request, res: express.Response) => {
      this.cityAPI.handleGetCities(req, res);
    });

    /**
     * Get all car makes
     * @route GET /cars/makes
     * @group cars
     * @returns {object} 200 - []
     */
    app.get("/api/v1/cars/makes", (req: express.Request, res: express.Response) => {
      this.carAPI.handleGetCarMakes(req, res);
    });

    /**
     * Get all car colors
     * @route GET /cars/colors
     * @group cars
     * @returns {object} 200 - []
     */
    app.get("/api/v1/cars/colors", async (req: express.Request, res: express.Response) => {
      await this.carAPI.handleGetColors(req, res);
    });

    /**
     * Get all car models
     * @route GET /cars/models
     * @group cars
     * @param {string} make.query.required
     * @returns {object} 200 - []
     */
    app.get("/api/v1/cars/models", (req: express.Request, res: express.Response) => {
      this.carAPI.handleGetCarModels(req, res);
    });

    /**
     * Create new trip
     * @route POST /trip
     * @group trips
     * @param {string} customerName.body.required
     * @param {string} whatsAppNumber.body.required
     * @param {string} startDate.body.required
     * @param {string} startTime.body.required
     * @param {string} fromAddress.body.required
     * @param {string} toAddress.body.required
     * @param {number} waitingHours.body.required
     * @param {boolean} oneWay.body.required
     * @returns {object} 201 - "success": "trip created successfully"
     * @returns {object} 400 - "error" : "an error occurred while creating trip, please try again"
     */
    app.post("/api/v1/trip", async (req: express.Request, res: express.Response) => {
      await this.tripAPI.handleCreateTrip(req, res);
    });

    /**
     * Get trips
     * @route GET /trips
     * @group trips
     * @param {string} status.query.required
     * @returns {object} 200 []
     */
    app.get("/api/v1/trips", async (req: express.Request, res: express.Response) => {
      await this.tripAPI.handleGetAllTrips(req, res);
    });

    /**
     * Update trip
     * @route PUT /trip
     * @group trips
     * @param {string} tripId.body.required
     * @param {object} updates.body.required
     * @returns {object} 200 []
     */
    app.put("/api/v1/trip", this.auth.isAuthenticated, async (req: express.Request, res: express.Response) => {
      await this.tripAPI.handleUpdateTripByID(req, res);
    });

    /**
     * Get All Prices
     * @route GET /prices
     * @group prices
     *
     * @returns {object} 200 prices:[]
     */
    app.get("/api/v1/prices", async (req: express.Request, res: express.Response) => {
      await this.priceAPI.handleGetAllPrices(req, res);
    });
    /**
     * Get All Customers
     * @route GET /customers
     * @group customers
     *
     * @returns {object} 200 customers:[]
     */
    app.get("/api/v1/customers", async (req: express.Request, res: express.Response) => {
      await this.customerAPI.handleGetAllCustomers(req, res);
    });

    /**
     * Create Admin
     * @route POST /admin/create
     * @group admins
     *
     * @param {string} username.body.required
     * @param {string} password.body.required
     *
     * @returns {object} 200 - "success":"admin created successfully"
     * @returns {object} 400 - "error":"username is taken"
     */
    app.post("/api/v1/admin/create", this.auth.isAuthenticated, async (req: any, res: express.Response) => {
      const roles = ["OWNER"];
      if (!roles.includes(req.user.role)) {
        return res.sendStatus(401);
      }
      await this.adminAPI.handleCreateAdmin(req, res);
    });

    app.put("/api/v1/admin/:id", this.auth.isAuthenticated, async (req: any, res: express.Response) => {
      const roles = ["OWNER"];
      if (!roles.includes(req.user.role)) {
        return res.sendStatus(401);
      }
      await this.adminAPI.handleUpdateAdmin(req, res);
    });

    /**
     * Login Admin
     * @route POST /admin/login
     * @group admins
     *
     * @param {string} username.body.required
     * @param {string} password.body.required
     *
     * @returns {object} 200 - "success":"admin created successfully"
     * @returns {object} 400 - "error":"invalid username or password"
     */
    app.post("/api/v1/admin/login", async (req: express.Request, res: express.Response) => {
      await this.adminAPI.handleLogin(req, res);
    });

    /**
     * Get all Admins
     * @route GET /admins
     * @group admins
     *
     * @returns {object} 200 - admins []
     * @returns {object} 401 - "error":"Unauthorized"
     */
    app.get("/api/v1/admins", this.auth.isAuthenticated, async (req: any, res: Response, next: NextFunction) => {
      const roles = ["OWNER"];
      if (!roles.includes(req.user.role)) {
        return res.sendStatus(401);
      }
      await this.adminAPI.handleGetAllAdmins(req, res);
    });

    app.get("*", (req: express.Request, res: express.Response) => {
      res.sendStatus(404);
    });
  }
}
