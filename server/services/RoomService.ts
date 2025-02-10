import { Amenities, Room } from "../interfaces/Room";
import { RoomRepository } from "../repositories/room/RoomRepository";

export class RoomService {
  constructor(private roomRepository: RoomRepository) {}

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.getAll();
  }

  async searchRooms(params: {
    city: string;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    amenities?: Amenities[];
  }): Promise<Room[]> {
    const rooms = await this.roomRepository.findByCity(
      params.city,
      undefined,
      undefined,
      params.priceMin,
      params.priceMax,
      params.rating,
      params.amenities
    );
    return rooms;
  }
}
