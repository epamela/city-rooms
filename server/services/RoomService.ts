import { Room } from "../interfaces/Room";
import { RoomRepository } from "../repositories/room/RoomRepository";

export class RoomService {
  constructor(private roomRepository: RoomRepository) {}

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.getAll();
  }

  async searchRooms(params: { city: string }): Promise<Room[]> {
    const rooms = await this.roomRepository.findByCity(params.city);
    return rooms;
  }
}
