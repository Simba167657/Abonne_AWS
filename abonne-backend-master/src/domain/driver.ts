import { ACity } from "./models/acity";
import { Asset } from "./models/asset";
import { User } from "./models/user";
import { Vehicle } from "./models/vehicle";

export class Driver extends User {
  private _cityOfResidence: ACity;
  private _favoriteDestinateion: ACity;
  private _photo: Asset;
  private _nationalId: Asset;
  private _car: Vehicle;
  private _license: Asset;
  private _userId: number | undefined;

  constructor(
    id: number,
    createdAt: Date,
    deletedAt: Date,
    updatedAt: Date,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    whatsAppNumber: string,
    mobileNumber: string,
    cityOfResidence: ACity,
    favoriteDestinateion: ACity,
    photo: Asset,
    nationalId: Asset,
    car: Vehicle,
    license: Asset,
    userId?: number
  ) {
    super(id, createdAt, deletedAt, updatedAt, firstName, lastName, dateOfBirth, whatsAppNumber, mobileNumber);
    this._cityOfResidence = cityOfResidence;
    this._favoriteDestinateion = favoriteDestinateion;
    this._photo = photo;
    this._nationalId = nationalId;
    this._car = car;
    this._license = license;
    this._userId = userId;
  }

  get cityOfResidence() {
    return this._cityOfResidence;
  }

  set cityOfResidence(city: ACity) {
    this._cityOfResidence = city;
  }

  get favoriteDestinateion() {
    return this._favoriteDestinateion;
  }

  set favoriteDestinateion(destination: ACity) {
    this._favoriteDestinateion = destination;
  }

  get photo() {
    return this._photo;
  }

  set photo(photo: Asset) {
    this._photo = photo;
  }

  get nationalId() {
    return this._nationalId;
  }

  get car() {
    return this._car;
  }

  get license() {
    return this._license;
  }

  public toJSON(): object {
    return {
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      id: this.id,
      userId: this._userId,
      updatedAt: this.updatedAt,
      firstName: super.firstName,
      lastName: super.lastName,
      dateOfBirth: super.dateOfBirth,
      mobileNumber: super.mobileNumber,
      whatsAppNumber: super.whatsAppNumber,
      cityOfResidence: this.cityOfResidence.toJSON(),
      favoriteDestinateion: this.favoriteDestinateion.toJSON(),
      photo: this.photo.toJSON(),
      nationalId: this.nationalId.toJSON(),
      license: this.license.toJSON(),
      car: this.car.toJSON()
    };
  }
}
