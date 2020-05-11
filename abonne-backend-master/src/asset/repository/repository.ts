import {Asset} from "../../domain/models/asset";

export interface IAssetRepository {

    /**
     * CreateDriverPhoto creates a new Driver Photo record in the database.
     * @param {Asset} asset object that holds a url ,key
     * @param {number} id of the owner driver
     * @returns {Promise<number>} the id of the newly created record.
     */
    createDriverPhoto(asset: Asset, driverID: number): Promise<number>;

    /**
     * CreateDriverLicenseImage creates a new Driver License Image record in the database.
     * @param {Asset} asset object that holds a url ,key.
     * @param {number} id of the owner driver.
     * @returns {Promise<number>} the id of the newly created record.
     */
    createDriverLicenseImage(asset: Asset, driverID: number): Promise<number>;

    /**
     * CreateDriverNationalIDImage creates a new Driver National ID Image record in the database.
     * @param {Asset} asset object that holds a url ,key
     * @param {number} id of the owner driver
     * @returns {Promise<number>} the id of the newly created record.
     */
    createDriverNationalIDImage(image: Asset, driverID: number): Promise<number>;

    /**
     * createCarFrontPhoto creates a new car front photo record.
     * @param {Asset} asset object that holds a url , key.
     * @param {carID} id of the owner car.
     * @returns {Promise<number>} the id of the newly created record.
     */
    createCarFrontPhoto(image: Asset, carID: number): Promise<number>;

    /**
     * createCarFrontPhoto creates a new car license back photo record.
     * @param {Asset} asset object that holds a url, key.
     * @param {carID} id of the owner car.
     * @returns {Promise<number>} the id of the newly created record.
     */
    createCarLicenseBackPhoto(image: Asset, carID: number): Promise<number>;

    /**
     * createCarLicenseFrontPhoto creates a new car license front record.
     * @param {Asset} asset object that holds a url, key.
     * @param {carID} id of the owner car.
     * @returns {Promise<number>} the id of the newly created record.
     */
    createCarLicenseFrontPhoto(image: Asset, carID: number): Promise<number>;

}
