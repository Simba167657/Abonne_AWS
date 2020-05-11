import {Pool, QueryResult} from "pg";
import {logger} from "../../config/logger";
import {Asset} from "../../domain/models/asset";
import {IAssetRepository} from "./repository";

export class ImageRepository implements IAssetRepository {

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

    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    /**
     * CreateDriverPhoto creates a new Driver Photo record in the database.
     * @param {Asset} asset object that holds a url ,key.
     * @param {number} id of the owner driver.
     * @returns {Promise<number>} the id of the newly created record.
     */
    public createDriverPhoto(photo: Asset, driverID: number): Promise<number> {
        return this.createAsset(
            photo,
            driverID,
            ImageRepository.DRIVER_PHOTOS_TABLE,
            ImageRepository.DRIVER_PHOTOS_OWNER_REF,
        );
    }

    /**
     * CreateDriverLicenseImage creates a new Driver License Image record in the database.
     * @param {Asset} asset object that holds a url ,key
     * @param {number} id of the owner driver
     * @returns {Promise<number>} the id of the newly created record.
     */
    public createDriverLicenseImage(image: Asset, driverID: number): Promise<number> {
        return this.createAsset(
            image,
            driverID,
            ImageRepository.DRIVER_LICENSES_TABLE,
            ImageRepository.DRIVER_LICENSES_OWNER_REF,
        );
    }

    /**
     * CreateDriverNationalIDImage creates a new Driver National ID Image record in the database.
     * @param {Asset} asset object that holds a url ,key
     * @param {number} id of the owner driver
     * @returns {Promise<number>} the id of the newly created record.
     */
    public createDriverNationalIDImage(image: Asset, driverID: number): Promise<number> {
        return this.createAsset(
            image,
            driverID,
            ImageRepository.NATIONAL_IDS_TABLE,
            ImageRepository.NATIONAL_IDS_OWNERE_REF,
        );
    }
    /**
     * createCarFrontPhoto creates a new car front photo record.
     * @param {Asset} asset object that holds a url , key.
     * @param {carID} id of the owner car.
     * @returns {Promise<number>} the id of the newly created record.
     */
    public createCarFrontPhoto(image: Asset, carID: number): Promise<number> {
        return this.createAsset(
            image,
            carID,
            ImageRepository.CAR_FRONT_PHOTOS_TABLE,
            ImageRepository.CAR_FRONT_PHOTOS_REF,
        );
    }

    /**
     * createCarFrontPhoto creates a new car license back photo record.
     * @param {Asset} asset object that holds a url, key.
     * @param {carID} id of the owner car.
     * @returns {Promise<number>} the id of the newly created record.
     */
    public createCarLicenseBackPhoto(image: Asset, carID: number): Promise<number> {
        return this.createAsset(
            image,
            carID,
            ImageRepository.CAR_LICENSE_BACK_IMAGES_TABLE,
            ImageRepository.CAR_LICENSE_BACK_PHOTOS_REF,
        );
    }

    /**
     * createCarLicenseFrontPhoto creates a new car license front record.
     * @param {Asset} asset object that holds a url, key.
     * @param {carID} id of the owner car.
     * @returns {Promise<number>} the id of the newly created record.
     */
    public createCarLicenseFrontPhoto(image: Asset, carID: number): Promise<number> {
        return this.createAsset(
            image,
            carID,
            ImageRepository.CAR_LICENSE_FRONT_IMAGES_TABLE,
            ImageRepository.CAR_LICENSE_FRONT_PHOTOS_REF,
        );
    }

    /**
     *
     * createsAsset creates a new Asset database record
     * @param {Asset} asset object that holds a url , key.
     * @param {number} id of the owner.
     * @param {tableName} table of the asset.
     */
    private async createAsset(asset: Asset, ownerID: number, tableName: string, ownerRefName: string): Promise<number> {
        const client = await this.db.connect();
        return new Promise<number>((resolve, reject) => {
            client.query(
                `INSERT INTO ${ tableName }(key,url,${ownerRefName})
                VALUES (${asset.key}, ${asset.url}, ${ownerID});`,
            ).then((res: QueryResult) => {
                if (res.rowCount !== 1) {
                    client.release();
                    reject(new Error("insert failed , affected rows count = 1"));
                    return;
                }
                client.release();
                resolve(res.rows[0].id);
            }).catch((err: Error) => {
                client.release();
                logger.error(err.message);
                reject(err);
            });
        });
    }

}

