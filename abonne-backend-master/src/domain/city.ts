import {ACity} from "./models/acity";

/**
 * City represents a city.
 */
export class City extends ACity {
    constructor(
        id: number,
        createdAt: Date,
        deletedAt: Date,
        updatedAt: Date,
        englishName: string,
        arabicName: string,
    ) {
        super(id, createdAt, deletedAt, updatedAt, englishName, arabicName);
    }
}
