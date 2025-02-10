import { RoomService } from "../../services/RoomService";
import { CsvRoomRepository } from "../../repositories/room/CsvRoomRepository";
import { Room } from "../../interfaces/Room";

import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("../../repositories/room/CsvRoomRepository");

jest.unstable_mockModule("../../repositories/room/CsvRoomRepository", () => ({
  CsvRoomRepository: jest.fn(),
}));

describe("RoomService", () => {
  let roomRepository: jest.Mocked<CsvRoomRepository>;
  let roomService: RoomService;

  const mockRooms: Room[] = [
    {
      url: "http://example.com/1",
      title: "Room 1",
      price_per_night: 1000,
      currency: "MXN",
      city: "Ciudad de México",
      state: "CDMX",
      country: "México",
      amenities: ["Wi-Fi", "TV"],
      rating_overall: 4.5,
      total_reviews: 10,
      created_at: new Date("2024-01-01"),
    } as Room,
  ];

  beforeEach(() => {
    roomRepository = new CsvRoomRepository() as jest.Mocked<CsvRoomRepository>;
    roomService = new RoomService(roomRepository);
  });

  describe("getRooms", () => {
    it("should return all rooms with default sorting", async () => {
      roomRepository.getAll.mockResolvedValue(mockRooms);

      const result = await roomService.getAllRooms();

      expect(result).toEqual(mockRooms);
      expect(roomRepository.getAll).toHaveBeenCalled();

      expect(result.length).toBe(mockRooms.length);
    });
  });

  describe("getRoomsByCity", () => {
    it("should return rooms filtered by city", async () => {
      roomRepository.findByCity.mockResolvedValue(mockRooms);

      const result = await roomService.searchRooms({
        city: "Ciudad de México",
      });

      expect(result).toEqual(mockRooms);
      expect(roomRepository.findByCity).toHaveBeenCalledWith(
        "Ciudad de México",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
    });
  });
});
