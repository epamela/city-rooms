import { Room } from "../interfaces/Room";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const api = {
  async getRooms(): Promise<Room[]> {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) throw new Error("Failed to fetch rooms");
    return response.json();
  },

  async getRoomsByCity(city: string): Promise<Room[]> {
    const response = await fetch(`${API_URL}/rooms/city/${city}`);
    if (!response.ok) throw new Error("Failed to fetch rooms");
    return response.json();
  },
};
