import {Asset} from "./asset";

/**
 * Vehicle (Abstract) represents a basic implementation of a vehicle.
 */
export abstract class Vehicle {
    protected _id: number;
    protected _createdAt: Date;
    protected _deletedAt: Date;
    protected _updatedAt: Date;
    protected _make: string;
    protected _model: string;
    protected _color: string;
    protected _licenseNumber: string;
    protected _licenseExpiryDate: Date;
    protected _yearOfManufacture: Date;
    protected _licenseBack: Asset;
    protected _licenseFront: Asset;
    protected _frontPhoto: Asset;

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
        this._id = id;
        this._createdAt = createdAt;
        this._deletedAt = deletedAt;
        this._updatedAt = updatedAt;
        this._make = make;
        this._model = model;
        this._color = color;
        this._licenseFront = licenseFront;
        this._licenseBack = licenseBack;
        this._licenseNumber = licenseNumber;
        this._licenseExpiryDate = licenseExpiryDate;
        this._yearOfManufacture = yearOfManufacture;
        this._frontPhoto = frontPhoto;
    }

    public get id(): number {
        return this._id;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get deletedAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public get make(): string {
        return this._make;
    }

    public get model(): string {
        return this._model;
    }

    public get color(): string {
        return this._color;
    }

    public get licenseNumber(): string {
        return this._licenseNumber;
    }

    public get licenseBack(): Asset {
        return this._licenseBack;
    }

    public get licenseFront(): Asset {
        return this._licenseFront;
    }

    public get licenseExpiryDate(): Date {
        return this._licenseExpiryDate;
    }

    public get yearOfManufacture(): Date {
        return this._yearOfManufacture;
    }

    public get frontPhoto(): Asset {
        return this._frontPhoto;
    }

    public toJSON(): object {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            make: this.make,
            model: this.model,
            color: this.color,
            yearOfManufacture: this.yearOfManufacture,
            licenseExpiryDate: this.licenseExpiryDate,
            licenseNumber: this.licenseNumber,
            frontPhoto: this.frontPhoto.toJSON(),
            licenseBack: this.licenseBack.toJSON(),
            licenseFront: this.licenseFront.toJSON(),
        };
    }
}
