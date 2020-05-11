import {Asset} from "./models/asset";

export class Image extends Asset {
    constructor(id: number, createdAt: Date, updatedAt: Date, deletedAt: Date, key: string, url: string) {
        super(id, createdAt, updatedAt, deletedAt, key, url);
    }

    public toJSON(): object {
        return super.toJSON();
    }
}
