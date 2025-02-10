import { CsvRoomRepository } from "../../repositories/room/CsvRoomRepository";
import { Room } from "../../interfaces/Room";
import * as fs from "fs";
import path from "path";

import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("fs");
jest.mock("path");

describe("CsvRoomRepository", () => {
  const mockCsvData = `url,title,price_per_night,currency,city,state,country,amenities,rating_overall,total_reviews,created_at
http://example.com/1,"Room 1",1000,MXN,"Ciudad de México",CDMX,México,"[""Wi-Fi"",""TV""]",4.5,10,2024-01-01
http://example.com/2,"Room 2",800,MXN,"Guadalajara",Jalisco,México,"[""Wi-Fi""]",4.0,5,2024-01-02`;

  beforeEach(() => {
    (path.join as jest.Mock).mockReturnValue("/mock/path/rooms.csv");
    (fs.readFileSync as jest.Mock).mockReturnValue(mockCsvData);
  });

  describe("getAll", () => {
    it("should return all rooms", async () => {
      const repository = new CsvRoomRepository();
      const rooms = await repository.getAll();

      expect(rooms).toHaveLength(2);
      expect(rooms[0].title).toBe("Room 1");
      expect(rooms[1].title).toBe("Room 2");
    });

    it("should sort rooms by price ascending", async () => {
      const repository = new CsvRoomRepository();
      const rooms = await repository.getAll("asc", "price");

      expect(rooms[0].price_per_night).toBe(800);
      expect(rooms[1].price_per_night).toBe(1000);
    });
  });

  describe("findByCity", () => {
    it("should find rooms by city case insensitive", async () => {
      const repository = new CsvRoomRepository();
      const rooms = await repository.findByCity("ciudad de méxico");

      expect(rooms).toHaveLength(1);
      expect(rooms[0].city).toBe("Ciudad de México");
    });

    it("should apply price filters correctly", async () => {
      const repository = new CsvRoomRepository();
      const rooms = await repository.findByCity(
        "Ciudad de México",
        undefined,
        undefined,
        900,
        1100
      );

      expect(rooms).toHaveLength(1);
      expect(rooms[0].price_per_night).toBe(1000);
    });

    it("should apply rating filter correctly", async () => {
      const repository = new CsvRoomRepository();
      const rooms = await repository.findByCity(
        "Ciudad de México",
        undefined,
        undefined,
        undefined,
        undefined,
        4.3
      );

      expect(rooms).toHaveLength(1);
      expect(rooms[0].rating_overall).toBe(4.5);
    });
  });
});
