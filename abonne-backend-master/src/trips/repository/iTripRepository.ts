import { Trip } from "./../../domain/trip";
export interface ITripRepository {
  createTrip(trip: Trip): Promise<void>;
  getTripByID(id: number): Promise<Trip>;
  getAllTrips(status: string): Promise<Trip[]>;
  updateTripByID(id: number, updates: {}): any;
  deleteTripByID(id: number): any;
}
