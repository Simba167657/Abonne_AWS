import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Done } from "mocha";
import { Car } from "../../../src/domain/car";
import { City } from "../../../src/domain/city";
import { Driver } from "../../../src/domain/driver";
import { Image } from "../../../src/domain/image";
import { UserRepository } from "../../../src/driver/repository/driver";
import { db } from "./setup";


after(() => {
    db.end();
});
describe("Test Create User", () => {
    it("Should create a new user record in the databae", (done: Done) => {
        db.query("DELETE FROM users");
        const repo = new UserRepository(db);
        const date = new Date();
        const image = new Image(0, date, date, date, "key", "url");
        const car = new Car(0, date, date, date, "make", "model", "tst", "test", date, date, image, image, image);
        const city = new City(1, date, date, date, "test city", "test city");
        const testUser = new Driver(0, date, date, date, "test", "user", date,
            "number", "number", city, city, image, image, car, image);
        // return chai.expect(repo.createUser(testUser)).to.eventually.gt(1);
        repo.createUser(testUser).then((res: number) => {
            chai.assert(res > 1);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});

describe("Test Create Driver", () => {
    it("Should create a new driver record in the test db", (done: Done) => {
        db.query("DELETE FROM users");
        db.query("DELETE FROM drivers");
        db.query("DELETE FROM cars");
        db.query("DELETE FROM cities");
        db.query("INSERT INTO cities (english_name,arabic_name) values('test city', 'test city') RETURNING id", (err, res) => {
            if (err) { done(err); }
            const cityID = res.rows[0].id;
            const repo = new UserRepository(db);
            const date = new Date();
            const image = new Image(0, date, date, date, "key", "url");
            const car = new Car(0, date, date, date, "make", "model", "tst", "test", date, date, image, image, image);
            const city = new City(cityID, date, date, date, "test city", "test City");
            const testUser = new Driver(0, date, date, date, "test", "user", date,
                "number", "number", city, city, image, image, car, image);
            // return chai.expect(repo.createUser(testUser)).to.eventually.gt(1);
            repo.createDriver(testUser).then(() => {
                done();
                db.query(`SELECT users.*, drivers.*, driver_photos.*,
                national_id_images.*,driver_licenses.*,
                cities.*, cars.*,car_front_photos.*,
                car_license_front_images.*,
                car_license_back_images.* FROM users
                INNER JOIN drivers ON users.id = drivers.user_id
                INNER JOIN driver_photos ON drivers.id = driver_photos.driver_id
                INNER JOIN national_id_images ON drivers.id = national_id_images.driver_id
                INNER JOIN driver_licenses ON drivers.id = driver_licenses.driver_id
                INNER JOIN cities ON drivers.favourite_destination_id = cities.id
                INNER JOIN cars ON drivers.id = cars.driver_id
                INNER JOIN car_front_photos ON cars.id = car_front_photos.id
                INNER JOIN car_license_back_images ON cars.id = car_license_back_images.car_id
                INNER JOIN car_license_front_images ON cars.id = car_license_front_images.car_id;
                `).then((driverRes) => {
                    console.log(driverRes);
                });
            }).catch((err: Error) => {
                done(err);
            });

        });
    });
});
