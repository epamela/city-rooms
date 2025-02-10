import { Place } from "../../interfaces/Place";

export interface PlaceRepository {
  searchPlacesByQuery(query: string, onlyCities: boolean): Promise<Place[]>;
}
