export abstract class ACity {
    protected _id: number;
    protected _createdAt: Date;
    protected _deletedAt: Date;
    protected _updatedAt: Date;
    protected _englishName: string;
    protected _arabicName: string;

    constructor(
        id: number,
        createdAt: Date,
        deletedAt: Date,
        updatedAt: Date,
        englishName: string,
        arabicName: string,
    ) {
        this._id = id;
        this._createdAt = createdAt;
        this._deletedAt = deletedAt;
        this._updatedAt = updatedAt;
        this._englishName = englishName;
        this._arabicName = arabicName;
    }

    public get id() {
        return this._id;
    }

    public get createdAt() {
        return this._id;
    }

    public get deletedAt() {
        return this._deletedAt;
    }

    public get updatedAt() {
        return this._updatedAt;
    }

    public get englishName() {
        return this._englishName;
    }

    public get arabicName() {
        return this._arabicName;
    }

    public toJSON(): object {
        return {
            id: this.id,
            createdAt: this.createdAt,
            deletedAt: this.deletedAt,
            updatedAt: this.updatedAt,
            englishName: this.englishName,
            arabicName: this.arabicName,
        };
    }
}
