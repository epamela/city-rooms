import axios from "axios";
import { CityRooms } from "../interfaces/CityRooms";

const API_BASE_URL = "http://localhost:3000/api";

export const api = {
  searchPlaces: async (query: string): Promise<CityRooms[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/places/stay`, {
        params: { q: query },
      });

      return response.data;
    } catch (error) {
      console.error("Error searching places:", error);
      throw error;
    }
  },
};
