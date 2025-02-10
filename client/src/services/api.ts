import axios from "axios";
import { CityRooms } from "../interfaces/CityRooms";
import { IFilters } from "../pages/Search";

const API_BASE_URL = "http://localhost:3000/api";

export const api = {
  searchPlaces: async (
    query: string,
    filters: IFilters
  ): Promise<CityRooms[]> => {
    const { priceMin, priceMax, rating, amenities } = filters;

    console.log(amenities);

    const params = {
      q: query,
      priceMin: priceMin,
      priceMax: priceMax,
      rating: rating,
      amenities: amenities,
    };

    if (query == "") return [];

    try {
      const response = await axios.get(`${API_BASE_URL}/places/stay`, {
        params: params,
      });

      return response.data;
    } catch (error) {
      console.error("Error searching places:", error);
      throw error;
    }
  },
};
