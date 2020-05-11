import { Pool, QueryResult } from "pg";
import { Storage } from "../../asset/repository/storage";
import { logger } from "../../config/logger";
import { Car } from "../../domain/car";
import { City } from "../../domain/city";
import { Driver } from "../../domain/driver";
import { Image } from "../../domain/image";
import { User } from "../../domain/models/user";
import { ExtractFilesForSQL, ExtractUpdatesForSQLv2 } from "../../utils";
import { IUserRepository } from "./repository";

/**
 * UserRepository has the methods to interact with a database about users.
 */
export class UserRepository implements IUserRepository {
  private static USERS_TABLE: string = "users";
  private static DRIVERS_TABLE: string = "drivers";
  private static DRIVERS_USER_REF: string = "user_id";
  private static DRIVERS_FAVROURITE_DESTINATION_REF: string = "favourite_destination_id";
  private static DRIVERS_CITY_OF_RESIDENCE_REF: string = "city_of_residence_id";
  private static DRIVER_LICENSES_TABLE: string = "driver_licenses";
  private static DRIVER_PHOTOS_TABLE: string = "driver_photos";
  private static NATIONAL_IDS_TABLE: string = "national_id_images";
  private static CAR_FRONT_PHOTOS_TABLE: string = "car_front_photos";
  private static CAR_LICENSE_BACK_IMAGES_TABLE: string = "car_license_back_images";
  private static CAR_LICENSE_FRONT_IMAGES_TABLE: string = "car_license_front_images";
  private static DRIVER_PHOTOS_OWNER_REF: string = "driver_id";
  private static DRIVER_LICENSES_OWNER_REF: string = "driver_id";
  private static NATIONAL_IDS_OWNERE_REF: string = "driver_id";
  private static CAR_FRONT_PHOTOS_REF: string = "car_id";
  private static CAR_LICENSE_BACK_PHOTOS_REF: string = "car_id";
  private static CAR_LICENSE_FRONT_PHOTOS_REF: string = "car_id";
  private static CARS_TABLE: string = "cars";
  private static CASR_DRIVER_REF: string = "driver_id";

  private db: Pool;
  private storage: Storage;
  constructor(db: Pool) {
    this.db = db;
    this.storage = new Storage();
  }

  /**
   * delete driver
   */
  public async deleteDriver(mobile: string): Promise<any> {
    const client = await this.db.connect();
    try {
      const queryText = `DELETE FROM users WHERE mobile_number ~ ${mobile}::text;`;
      const result = await client.query(queryText);
      client.release();
      return result.rows[0];
    } catch (error) {
      client.release();
      logger.error(error.message);
      throw error;
    }
  }

  /**
   * Get driver by ID
   * @param user
   */
  public async getDriverById(id: number): Promise<Driver> {
    const client = await this.db.connect();
    try {
      const queryText = `
      SELECT 
            u.id AS user_id,u.created_at AS user_created_at,u.deleted_at AS user_deleted_at,u.first_name AS user_first_name,u.last_name AS user_last_name,u.date_of_birth AS user_date_of_birth,u.whatsapp_number AS user_whatsapp_number,u.mobile_number AS user_mobile_number,u.user_type AS user_user_type,
            ds.id AS driver_id, ds.created_at AS driver_created_at,ds.deleted_at AS driver_deleted_at,ds.updatedat AS driver_updated_at,ds.user_id AS driver_user_id,ds.city_of_residence_id AS driver_city_of_residence_id,ds.favourite_destination_id AS driver_favourite_destination_id,
            dp.id AS driver_photo_id,dp.created_at AS driver_photo_created_at,dp.updatedat AS driver_photo_updated_at,dp.deleted_at AS driver_photo_deleted_at,dp.key AS driver_photo_key,dp.url AS driver_photo_url,dp.driver_id AS driver_photo_driver_id,
            nati.id AS driver_national_id_id,
            nati.created_at AS driver_national_id_created_at,
            nati.updatedat AS driver_national_id_updated_at,
            nati.deleted_at AS driver_national_id_deleted_at,
            nati.key AS driver_national_id_key,
            nati.url AS driver_national_id_url,
            nati.driver_id AS driver_national_id_driver_id,
            dli.id AS driver_licenses_id,
            dli.created_at AS driver_licenses_created_at,
            dli.updatedat AS driver_licenses_updated_at,
            dli.deleted_at AS driver_licenses_deleted_at,
            dli.key AS driver_licenses_key,
            dli.url AS driver_licenses_url,
            dli.driver_id AS driver_licenses_driver_id,
            c.id as city_of_residence_id,
            c.created_at AS city_of_residence_created_at,
            c.updatedat AS city_of_residence_updated_at,
            c.deleted_at AS city_of_residence_deleted_at,
            c.arabic_name AS city_of_residence_arabic_name,
            c.english_name AS city_of_residence_english_name,
            cd.id AS favourite_destination_id,
            cd.created_at AS favourite_destination_created_at,
            cd.deleted_at favourite_destination_deleted_at,
            cd.updatedat AS favourite_destination_updated_at,
            cd.arabic_name AS favourite_destination_arabic_name,
            cd.english_name AS favourite_destination_english_name,
            ca.id AS car_id,
            ca.created_at AS car_created_at,
            ca.updatedat AS car_updated_at,
            ca.deleted_at AS car_deleted_at,
            ca.make AS car_make,
            ca.model AS car_model,
            ca.color AS car_color,
            ca.license_number AS car_license_number,
            ca.license_expire_date AS car_license_expire_date,
            ca.year_of_manufacture AS car_year_of_manufacture,
            ca.driver_id AS car_driver_id,
            cfp.id AS car_front_photo_id,
            cfp.created_at AS car_front_photo_created_at,
            cfp.updatedat AS car_front_photo_updated_at,
            cfp.deleted_at AS car_front_photo_deleted_at,
            cfp.key AS car_front_photo_key,
            cfp.url AS car_front_photo_url,
            cfp.car_id AS car_front_photo_car_id,
            clf.id AS car_license_front_id,
            clf.created_at AS car_license_front_created_at,
            clf.updatedat AS car_license_front_updated_at,
            clf.deleted_at AS car_license_front_deleted_at,
            clf.key AS car_license_front_key,
            clf.url AS car_license_front_url,
            clf.car_id AS car_license_front_car_id,
            clb.id AS car_license_back_id,
            clb.created_at AS car_license_back_created_at,
            clb.updatedat AS car_license_back_updated_at,
            clb.deleted_at AS car_license_back_deleted_at,
            clb.key AS car_license_back_key,
            clb.url AS car_license_back_url,
            clb.car_id AS car_license_back_car_id
        FROM users AS u
        INNER JOIN drivers AS ds ON u.id = ds.user_id
        INNER JOIN driver_photos AS dp ON ds.id = dp.driver_id
        INNER JOIN national_id_images AS nati ON ds.id = nati.driver_id
        INNER JOIN driver_licenses AS dli ON ds.id = dli.driver_id
        INNER JOIN cities AS c ON ds.city_of_residence_id = c.id
        INNER JOIN cities AS cd ON ds.favourite_destination_id = cd.id
        INNER JOIN cars AS ca ON u.id = ca.driver_id
        INNER JOIN car_front_photos AS cfp ON ca.id = cfp.id
        INNER JOIN car_license_back_images AS clb ON ca.id = clb.car_id
        INNER JOIN car_license_front_images AS clf ON ca.id = clf.car_id
        WHERE ds.id = ${id};
      `;

      const result = await client.query(queryText);
      const driver = this.mapDriverRow(result.rows[0]);
      client.release();
      return driver;
    } catch (error) {
      client.release();
      logger.error(error.message);
      throw error;
    }
  }

  /**
   * createUser creates db records of the given userin the
   * respective table
   * @Param {User}
   * @Returns {Promise<number>} promise with the id of the created user.
   */
  public async createUser(user: User): Promise<number> {
    const client = await this.db.connect();
    return new Promise<number>((resolve, reject) => {
      const query = `INSERT INTO ${UserRepository.USERS_TABLE} (
                first_name,last_name,date_of_birth,whatsapp_number,mobile_number,user_type) VALUES (
                '${user.firstName}','${user.lastName}','${user.dateOfBirth.toISOString()}','${user.whatsAppNumber}','${
        user.whatsAppNumber
      }','${user.mobileNumber}'
                ) RETURNING *;`;
      client
        .query(query)
        .then((res: QueryResult) => {
          if (res.rowCount < 1) {
            client.release();
            reject(new Error("error inserting record"));
          } else {
            client.release();
            resolve(res.rows[0].id);
          }
        })
        .catch((err: Error) => {
          logger.error(err.message);
          client.release();
          reject(err);
        });
    });
  }

  /**
   * addDriver creates db records of the given driver in the
   * respective tables
   * @Param {Driver} driver
   * @Returns {Promise<boolean>} promise
   */
  public async createDriver(driver: Driver): Promise<Driver> {
    const client = await this.db.connect();
    try {
      await client.query("BEGIN");
      const insertUserText = `INSERT INTO ${UserRepository.USERS_TABLE} (first_name, last_name, date_of_birth,whatsapp_number,mobile_number,user_type) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
      const insertUserValues = [
        driver.firstName,
        driver.lastName,
        driver.dateOfBirth.toISOString(),
        driver.whatsAppNumber,
        driver.mobileNumber,
        "driver"
      ];
      const userRes = await client.query(insertUserText, insertUserValues);
      const insertDriverText = `INSERT INTO ${UserRepository.DRIVERS_TABLE}(${UserRepository.DRIVERS_USER_REF}, ${UserRepository.DRIVERS_CITY_OF_RESIDENCE_REF}, ${UserRepository.DRIVERS_FAVROURITE_DESTINATION_REF}) VALUES ($1, $2, $3) RETURNING *`;
      const insertDriverValues = [userRes.rows[0].id, driver.cityOfResidence.id, driver.favoriteDestinateion.id];
      const driverRes = await client.query(insertDriverText, insertDriverValues);
      const insertDriverPhotoText = `INSERT INTO ${UserRepository.DRIVER_PHOTOS_TABLE} (key,url,${UserRepository.DRIVER_PHOTOS_OWNER_REF}) VALUES($1,$2,$3) RETURNING *`;
      const insertDriverPhotoValues = [driver.photo.key, driver.photo.url, driverRes.rows[0].id];
      const driverPhotoRes = await client.query(insertDriverPhotoText, insertDriverPhotoValues);
      const driverPhoto = this.mapImageRes(driverPhotoRes);
      const insertDriverNationalIDText = `INSERT INTO ${UserRepository.NATIONAL_IDS_TABLE} (key,url,${UserRepository.NATIONAL_IDS_OWNERE_REF}) VALUES($1,$2,$3) RETURNING *`;
      const insertDriverNationalIDValues = [driver.nationalId.key, driver.nationalId.url, driverRes.rows[0].id];
      const driverNationalIDRes = await client.query(insertDriverNationalIDText, insertDriverNationalIDValues);
      const driverNationalID = this.mapImageRes(driverNationalIDRes);
      const insertDriverLicenseText = `INSERT INTO ${UserRepository.DRIVER_LICENSES_TABLE} (key,url,${UserRepository.DRIVER_LICENSES_OWNER_REF}) VALUES ($1,$2,$3) RETURNING *`;
      const insertDriverLicenseValues = [driver.license.key, driver.license.url, driverRes.rows[0].id];
      const driverLicenseRes = await client.query(insertDriverLicenseText, insertDriverLicenseValues);
      const driverLicense = this.mapImageRes(driverLicenseRes);
      const insertCarText = `INSERT INTO ${UserRepository.CARS_TABLE} (make,model,color,license_number,license_expire_date,year_of_manufacture, ${UserRepository.CASR_DRIVER_REF}) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
      const insertCarValues = [
        driver.car.make,
        driver.car.model,
        driver.car.color,
        driver.car.licenseNumber,
        driver.car.licenseExpiryDate.toISOString(),
        driver.car.yearOfManufacture.toISOString(),
        userRes.rows[0].id
      ];
      const carRes = await client.query(insertCarText, insertCarValues);
      const insertCarPhotoText = `INSERT INTO ${UserRepository.CAR_FRONT_PHOTOS_TABLE} (key,url,${UserRepository.CAR_FRONT_PHOTOS_REF}) VALUES($1,$2,$3) RETURNING *`;
      const inserCarPhotoValues = [driver.car.frontPhoto.key, driver.car.frontPhoto.url, carRes.rows[0].id];
      const carPhotoRes = await client.query(insertCarPhotoText, inserCarPhotoValues);
      const carPhoto = this.mapImageRes(carPhotoRes);
      const insertCarLicenseFrontText = `INSERT INTO ${UserRepository.CAR_LICENSE_FRONT_IMAGES_TABLE} (key,url,${UserRepository.CAR_LICENSE_FRONT_PHOTOS_REF}) VALUES($1,$2,$3) RETURNING *`;
      const inserCarLicenseFrontPhotoValues = [
        driver.car.licenseFront.key,
        driver.car.licenseFront.url,
        carRes.rows[0].id
      ];
      const carLicenseFrontRes = await client.query(insertCarLicenseFrontText, inserCarLicenseFrontPhotoValues);
      const carLicenseFront = this.mapImageRes(carLicenseFrontRes);
      const insertCarLicenseBackText = `INSERT INTO ${UserRepository.CAR_LICENSE_BACK_IMAGES_TABLE} (key,url,${UserRepository.CAR_LICENSE_BACK_PHOTOS_REF}) VALUES ($1,$2,$3) RETURNING *`;
      const insertCarLicenseBackValues = [driver.car.licenseBack.key, driver.car.licenseBack.url, carRes.rows[0].id];
      const carLicenseBackRes = await client.query(insertCarLicenseBackText, insertCarLicenseBackValues);
      const carLicenseBack = this.mapImageRes(carLicenseBackRes);
      await client.query("COMMIT");
      const car = this.mapCarRes(carRes, carLicenseBack, carLicenseFront, carPhoto);
      const driverRow = driverRes.rows[0];
      const userRow = userRes.rows[0];
      const newDriver = new Driver(
        driverRow.id,
        new Date(driverRow.created_at),
        new Date(driverRow.deleted_at),
        new Date(driverRow.updated_at),
        userRow.first_name,
        userRow.last_name,
        new Date(userRow.date_of_birth),
        userRow.whatsapp_number,
        userRow.mobile_number,
        driver.cityOfResidence,
        driver.favoriteDestinateion,
        driverPhoto,
        driverNationalID,
        car,
        driverLicense
      );
      client.release();
      return newDriver;
    } catch (err) {
      await client.query("ROLLBACK");
      client.release();
      throw err;
    }
  }

  /**
   * Update driver
   */
  public async updateDriver(updates: any) {
    const client = await this.db.connect();

    const ids = { user: updates.userId, driver: updates.driverId, car: updates.carId };

    // fields
    const userUpdates = ExtractUpdatesForSQLv2({
      first_name: updates.firstName,
      last_name: updates.lastName,
      date_of_birth: updates.dateOfBirth,
      whatsapp_number: updates.whatsappNumber,
      mobile_number: updates.phone
    });
    if (userUpdates.length) {
      // apply updates to the user
      const queryText = `UPDATE users SET ${userUpdates} WHERE id = ${ids.user}`;
      try {
        await client.query(queryText);
      } catch (error) {
        client.release();
        logger.error(error.message);
        throw error;
      }
    }

    const driverUpdates = ExtractUpdatesForSQLv2({
      city_of_residence_id: updates.cityOfResidence,
      favourite_destination_id: updates.favouriteDestination
    });
    if (driverUpdates.length) {
      // apply updates
      const queryText = `UPDATE drivers SET ${driverUpdates} WHERE id = ${ids.driver}`;
      try {
        await client.query(queryText);
      } catch (error) {
        client.release();
        logger.error(error.message);
        throw error;
      }
    }

    const carUpdates = ExtractUpdatesForSQLv2({
      make: updates.carMake,
      model: updates.carModel,
      license_number: updates.carLicenseNumber,
      color: updates.carColor,
      year_of_manufacture: updates.carYearOfManufacture,
      license_expire_date: updates.carLicenseExpire
    });
    if (carUpdates.length) {
      // apply updates
      const queryText = `UPDATE cars SET ${carUpdates} WHERE driver_id = ${ids.user}`;
      try {
        await client.query(queryText);
      } catch (error) {
        client.release();
        logger.error(error.message);
        throw error;
      }
    }

    // files
    const photos = ExtractFilesForSQL({
      driver_photos: updates.driverPhoto,
      national_id_images: updates.nationalID,
      car_front_photos: updates.carFrontPhoto,
      driver_licenses: updates.driverLicensePhoto,
      car_license_front_images: updates.carLicenseFront,
      car_license_back_images: updates.carLicenseBack
    });

    for (const photo of photos) {
      try {
        const condition = photo[0].includes("car") ? `car_id = ${ids.car}` : `driver_id = ${ids.driver}`;
        const { url, key } = await this.storage.store(photo[1].path);
        const queryText = `UPDATE ${photo[0]} SET key = '${key}', url = '${url}' WHERE ${condition}`;
        await client.query(queryText);
      } catch (error) {
        client.release();
        logger.error(error.message);
        throw error;
      }
    }

    client.release();
  }

  public async getAllDrivers(): Promise<Driver[]> {
    const client = await this.db.connect();
    return new Promise<Driver[]>((resolve, reject) => {
      client
        .query(
          `
            SELECT u.id AS user_id, u.created_at AS user_created_at, u.deleted_at AS user_deleted_at, u.first_name AS user_first_name,u.last_name AS user_last_name,u.date_of_birth AS user_date_of_birth,u.whatsapp_number AS user_whatsapp_number,u.mobile_number AS user_mobile_number, u.user_type AS user_user_type,
            ds.id AS driver_id, ds.created_at AS driver_created_at,ds.deleted_at AS driver_deleted_at,ds.updatedat AS driver_updated_at,ds.user_id AS driver_user_id,ds.city_of_residence_id AS driver_city_of_residence_id, ds.favourite_destination_id AS driver_favourite_destination_id,
            dp.id AS driver_photo_id,dp.created_at AS driver_photo_created_at,dp.updatedat AS driver_photo_updated_at,dp.deleted_at AS driver_photo_deleted_at,dp.key AS driver_photo_key, dp.url AS driver_photo_url,dp.driver_id AS driver_photo_driver_id,
            nati.id AS driver_national_id_id, nati.created_at AS driver_national_id_created_at, nati.updatedat AS driver_national_id_updated_at, nati.deleted_at AS driver_national_id_deleted_at, nati.key AS driver_national_id_key,
            nati.url AS driver_national_id_url, nati.driver_id AS driver_national_id_driver_id,
            dli.id AS driver_licenses_id,dli.created_at AS driver_licenses_created_at,dli.updatedat AS driver_licenses_updated_at, dli.deleted_at AS driver_licenses_deleted_at,dli.key AS driver_licenses_key, dli.url AS driver_licenses_url,dli.driver_id AS driver_licenses_driver_id,
            c.id as city_of_residence_id, c.created_at AS city_of_residence_created_at, c.updatedat AS city_of_residence_updated_at, c.deleted_at AS city_of_residence_deleted_at, c.arabic_name AS city_of_residence_arabic_name, c.english_name AS city_of_residence_english_name,
            cd.id AS favourite_destination_id, cd.created_at AS favourite_destination_created_at, cd.deleted_at favourite_destination_deleted_at, cd.updatedat AS favourite_destination_updated_at, cd.arabic_name AS favourite_destination_arabic_name, cd.english_name AS favourite_destination_english_name,
            ca.id AS car_id ,ca.created_at AS car_created_at, ca.updatedat AS car_updated_at,ca.deleted_at AS car_deleted_at,ca.make AS car_make, ca.model AS car_model,ca.color AS car_color, ca.license_number AS car_license_number,ca.license_expire_date AS car_license_expire_date, ca.year_of_manufacture AS car_year_of_manufacture,ca.driver_id AS car_driver_id,
            cfp.id AS car_front_photo_id,cfp.created_at AS car_front_photo_created_at,cfp.updatedat AS car_front_photo_updated_at,cfp.deleted_at AS car_front_photo_deleted_at,cfp.key AS car_front_photo_key,cfp.url AS car_front_photo_url,cfp.car_id AS car_front_photo_car_id,
            clf.id AS car_license_front_id, clf.created_at AS car_license_front_created_at , clf.updatedat AS car_license_front_updated_at,clf.deleted_at AS car_license_front_deleted_at, clf.key AS car_license_front_key, clf.url AS car_license_front_url ,clf.car_id AS car_license_front_car_id,
            clb.id AS car_license_back_id, clb.created_at AS car_license_back_created_at , clb.updatedat AS car_license_back_updated_at, clb.deleted_at AS car_license_back_deleted_at , clb.key AS car_license_back_key, clb.url AS car_license_back_url , clb.car_id AS car_license_back_car_id
            FROM users AS u
            INNER JOIN drivers AS ds ON u.id = ds.user_id
            INNER JOIN driver_photos AS dp ON ds.id = dp.driver_id
            INNER JOIN national_id_images AS nati ON ds.id = nati.driver_id
            INNER JOIN driver_licenses AS dli ON ds.id = dli.driver_id
            INNER JOIN cities AS c ON ds.city_of_residence_id = c.id
            INNER JOIN cities AS cd ON ds.favourite_destination_id = cd.id
            INNER JOIN cars AS ca ON u.id = ca.driver_id
            INNER JOIN car_front_photos AS cfp ON ca.id = cfp.id
            INNER JOIN car_license_back_images AS clb ON ca.id = clb.car_id
            INNER JOIN car_license_front_images AS clf ON ca.id = clf.car_id
            ORDER BY ds.user_id
            ;
            `
        )
        .then(res => {
          const drivers: Driver[] = [];
          res.rows.forEach(row => {
            drivers.push(this.mapDriverRow(row));
          });
          client.release();
          resolve(drivers);
        })
        .catch(err => {
          client.release();
          reject(err);
        });
    });
  }

  private mapImageRes(res: QueryResult): Image {
    const row = res.rows[0];
    const image = new Image(row.id, row.created_at, row.updated_at, row.deleted_at, row.key, row.url);
    return image;
  }

  private mapCarRes(res: QueryResult, licenseBack: Image, licenseFront: Image, frontPhoto: Image): Car {
    const row = res.rows[0];
    const car = new Car(
      row.id,
      new Date(row.created_at),
      new Date(row.deleted_at),
      new Date(row.updated_at),
      row.make,
      row.model,
      row.color,
      row.license_number,
      row.license_expire_date,
      new Date(row.year_of_manufacture),
      licenseBack,
      licenseFront,
      frontPhoto
    );
    return car;
  }

  private mapDriverRow(row: any): Driver {
    const driverPhoto = new Image(
      row.driver_photo_id,
      new Date(row.driver_photo_created_at),
      new Date(row.driver_photo_updated_at),
      new Date(row.driver_licenses_deleted_at),
      row.driver_photo_key,
      row.driver_photo_url
    );
    const driverNationalID = new Image(
      row.driver_national_id_id,
      new Date(row.driver_national_id_created_at),
      new Date(row.driver_national_id_updated_at),
      new Date(row.driver_national_id_deleted_at),
      row.driver_national_id_key,
      row.driver_national_id_url
    );
    const driverLicense = new Image(
      row.driver_licenses_id,
      new Date(row.driver_licenses_created_at),
      new Date(row.driver_licenses_updated_at),
      new Date(row.driver_licenses_deleted_at),
      row.driver_licenses_key,
      row.driver_licenses_url
    );
    const carFront = new Image(
      row.car_front_photo_id,
      new Date(row.car_front_photo_created_at),
      new Date(row.car_front_photo_updated_at),
      new Date(row.car_front_photo_deleted_at),
      row.car_front_photo_key,
      row.car_front_photo_url
    );
    const carLicenseBack = new Image(
      row.car_license_back_id,
      new Date(row.car_license_back_created_at),
      new Date(row.car_license_back_updated_at),
      new Date(row.car_license_back_deleted_at),
      row.car_license_back_key,
      row.car_license_back_url
    );
    const carLicenseFront = new Image(
      row.car_license_front_id,
      new Date(row.car_license_front_created_at),
      new Date(row.car_license_front_updated_at),
      new Date(row.car_license_front_deleted_at),
      row.car_license_front_key,
      row.car_license_front_url
    );
    const car = new Car(
      row.car_id,
      new Date(row.car_created_at),
      new Date(row.car_deleted_at),
      new Date(row.car_updated_at),
      row.car_make,
      row.car_model,
      row.car_color,
      row.car_license_number,
      new Date(row.car_license_expire_date),
      new Date(row.car_year_of_manufacture),
      carLicenseBack,
      carLicenseFront,
      carFront
    );
    const cityOfResidence = new City(
      row.city_of_residence_id,
      row.city_of_residence_created_at,
      row.city_of_residence_deleted_at,
      row.city_of_residence_updated_at,
      row.city_of_residence_english_name,
      row.city_of_residence_arabic_name
    );
    const favoriteDestinateion = new City(
      row.favourite_destination_id,
      row.favourite_destination_created_at,
      row.favourite_destination_deleted_at,
      row.favourite_destination_updated_at,
      row.favourite_destination_english_name,
      row.favourite_destination_arabic_name
    );
    const driver = new Driver(
      row.driver_id,
      new Date(row.driver_created_at),
      new Date(row.driver_deleted_at),
      new Date(row.driver_updated_at),
      row.user_first_name,
      row.user_last_name,
      new Date(row.user_date_of_birth),
      row.user_whatsapp_number,
      row.user_mobile_number,
      cityOfResidence,
      favoriteDestinateion,
      driverPhoto,
      driverNationalID,
      car,
      driverLicense,
      row.user_id
    );
    return driver;
  }
}
