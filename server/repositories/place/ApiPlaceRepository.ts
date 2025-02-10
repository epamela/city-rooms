import axios from "axios";
import { Place } from "../../interfaces/Place";
import { PlaceRepository } from "./PlaceRepository";

export class ApiPlaceRepository implements PlaceRepository {
  private readonly BASE_URL = "https://search.reservamos.mx/api/v2/places";

  async searchPlacesByQuery(
    query: string,
    onlyCities: boolean = true
  ): Promise<Place[]> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}?q=${encodeURIComponent(query)}`
      );
      const places = response.data;

      let placesToReturn = places;
      if (onlyCities) {
        placesToReturn = places.filter(
          (place: Place) => place.result_type === "city"
        );
      }

      return placesToReturn;
    } catch (error) {
      console.error("Error fetching places from API:", error);
      throw error;
    }
  }
}
