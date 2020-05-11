import {Asset} from "./models/asset";
import {Vehicle} from "./models/vehicle";

export class Car extends Vehicle {
    constructor(
        id: number,
        createdAt: Date,
        deletedAt: Date,
        updatedAt: Date,
        make: string,
        model: string,
        color: string,
        licenseNumber: string,
        licenseExpiryDate: Date,
        yearOfManufacture: Date,
        licenseBack: Asset,
        licenseFront: Asset,
        frontPhoto: Asset,
    ) {
        super(
            id,
            createdAt ,
            deletedAt ,
            updatedAt ,
            make,
            model,
            color,
            licenseNumber,
            licenseExpiryDate,
            yearOfManufacture,
            licenseBack,
            licenseFront,
            frontPhoto,
        );
    }
    public toJSON(): object {
        return super.toJSON();
    }
}

