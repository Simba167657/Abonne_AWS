import { Pool } from "pg";
import { logger } from "../../config/logger";
import { Trip } from "../../domain/trip";
import { ExtractUpdatesForSQLv2 } from "./../../utils";
import { ITripRepository } from "./iTripRepository";

export class TripRepository implements ITripRepository {
  private TRIPS_TABLE: string = "trips";
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async createTrip(trip: Trip): Promise<void> {
    const client = await this.db.connect();
    const queryText = `
    INSERT INTO ${this.TRIPS_TABLE} 
    (customer_name, whatsapp_number, start_at, from_address, to_address, waiting_hours, one_way) 
    VALUES ($1,$2,$3,$4,$5,$6,$7) 
    RETURNING *
    `;
    const queryValues = [
      trip.customerName,
      trip.whatsAppNumber,
      trip.startAt,
      trip.fromAddress,
      trip.toAddress,
      trip.waitingHours,
      trip.oneWay
    ];

    try {
      await client.query(queryText, queryValues);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  async getTripByID(id: number): Promise<Trip> {
    throw new Error("Method not implemented.");
  }

  async getAllTrips(status: string): Promise<Trip[]> {
    const client = await this.db.connect();
    try {
      const queryText = `
        SELECT

            t.id AS trip_id, 
            t.customer_name AS trip_customer_name,
            t.whatsapp_number AS trip_whatsapp_number,
            t.start_at AS trip_start_at,
            t.from_address AS trip_from_address,
            t.to_address AS trip_to_address,
            t.waiting_hours AS trip_waiting_hours,
            t.one_way AS trip_one_way,
            t.status AS trip_status,
            t.duration AS trip_duration,
          
            t.driver AS driver_id,
            u.first_name AS driver_first_name,
            u.last_name AS driver_last_name,
            u.whatsapp_number AS driver_whatsapp_number,
            u.mobile_number AS driver_mobile_number,
          
            t.moderator AS moderator_id,
            ad.name As moderator_name,
            ad.mobile_number AS moderator_mobile_number,
            ad.enabled AS moderator_enabled
        
        FROM ${this.TRIPS_TABLE} as t
        LEFT OUTER JOIN drivers AS ds ON ds.id = t.driver
        LEFT OUTER JOIN users AS u ON u.id = ds.user_id
        LEFT OUTER JOIN admins AS ad ON ad.id = t.moderator
        WHERE t.status ~ '${status}';
      `;

      const result = await client.query(queryText);
      client.release();
      const trips: Trip[] = [];
      for (const trip of result.rows) {
        trips.push(trip);
      }
      return trips;
    } catch (error) {
      client.release();
      logger.error(error);
      throw new Error("error getting trips " + error.message);
    }
  }

  async updateTripByID(id: number, updates: {}) {
    const client = await this.db.connect();
    try {
      const result = ExtractUpdatesForSQLv2(updates);
      const queryText = `
        UPDATE ${this.TRIPS_TABLE} SET ${result}
        WHERE id = ${id};
      `;
      await client.query(queryText);
      return client.release();
    } catch (error) {
      client.release();
      logger.error(error);
      throw error;
    }
  }

  async deleteTripByID(id: number) {
    throw new Error("Method not implemented.");
  }
}
