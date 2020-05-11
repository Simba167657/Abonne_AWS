/**
 * Class User represents a user of the service.
 */
export abstract class User {
    protected _id: number;
    protected _createdAt: Date;
    protected _updatedAt: Date;
    protected _deletedAt: Date;
    protected _firstName: string;
    protected _lastName: string;
    protected _dateOfBirth: Date;
    protected _whatsAppNumber: string;
    protected _mobileNumber: string;

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
    ) {
        this._id = id;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
        this._firstName = firstName;
        this._lastName = lastName;
        this._dateOfBirth = dateOfBirth;
        this._whatsAppNumber = whatsAppNumber;
        this._mobileNumber = mobileNumber;
    }

    public get id() {
        return this._id;
    }
    // Getters
    public get createdAt() {
        return this._createdAt;
    }

    public get updatedAt() {
        return this._updatedAt;
    }

    public get deletedAt() {
        return this._deletedAt;
    }

    public get firstName() {
        return this._firstName;
    }

    public get lastName() {
        return this._lastName;
    }

    public get dateOfBirth() {
        return this._dateOfBirth;
    }

    public get whatsAppNumber() {
        return this._whatsAppNumber;
    }

    public get mobileNumber() {
        return this._mobileNumber;
    }

    // Setters
    protected setUpdatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }

    protected setDeletedAt(deletedAt: Date) {
        this._deletedAt = deletedAt;
    }

    protected setFirstName(firstName: string) {
        this._firstName = firstName;
    }

    protected setLastName(lastName: string) {
        this._lastName = lastName;
    }

    protected setDeteOfBirth(dateOfBirth: Date) {
        this._dateOfBirth = dateOfBirth;
    }

    protected setWhatsAppNumber(whatsAppNumber: string) {
        this._whatsAppNumber = whatsAppNumber;
    }

    protected setMobileNumber(mobileNumber: string) {
        this._mobileNumber = mobileNumber;
    }
}
