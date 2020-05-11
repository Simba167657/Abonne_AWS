/**
 * Asset represents an asset that is saved remotely and kept as links
 * AbstractClass
 */
export abstract class Asset {
    protected _id: number;
    protected _createdAt: Date;
    protected _updatedAt: Date;
    protected _deletedAt: Date;
    protected _key: string;
    protected _url: string;

    constructor(id: number, createdAt: Date, updatedAt: Date, deletedAt: Date, key: string, url: string) {
        this._id = id;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._deletedAt = deletedAt;
        this._key = key;
        this._url = url;
    }

    public get id() {
        return this._id;
    }
    public get createdAt() {
        return this._createdAt;
    }
    public get updatedAt() {
        return this._updatedAt;
    }
    public get deletedAt() {
        return this._deletedAt;
    }
    public get key() {
        return this._key;
    }
    public get url() {
        return this._url;
    }

    public toJSON(): object {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            key: this.key,
            url: this.url,
        };
    }
}
