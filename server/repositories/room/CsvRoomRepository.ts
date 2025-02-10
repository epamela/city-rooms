import { Room } from "../../interfaces/Room";
import { RoomRepository } from "./RoomRepository";
import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import path from "path";

export class CsvRoomRepository implements RoomRepository {
  private rooms: Room[] = [];

  constructor() {
    this.loadRooms();
  }

  private loadRooms(): void {
    try {
      const csvFilePath = path.join(__dirname, "../../data/rooms.csv");
      const fileContent = readFileSync(csvFilePath, "utf-8");

      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        cast: (value, context) => {
          const columName = String(context.column);
          if (columName === "amenities") {
            return JSON.parse(value);
          }
          if (columName === "created_at") {
            return new Date(value);
          }
          if (
            columName.startsWith("rating_") ||
            columName === "price_per_night" ||
            columName === "total_reviews"
          ) {
            return value === "" ? null : Number(value);
          }
          return value;
        },
      });

      this.rooms = records;
    } catch (error) {
      console.error("Error loading rooms from CSV:", error);
      this.rooms = [];
    }
  }

  private sortRooms(rooms: Room[], sortBy?: string, orderBy?: string): Room[] {
    if (!sortBy || !orderBy) return rooms;

    return [...rooms].sort((a, b) => {
      let valueA: number, valueB: number;

      if (orderBy === "price") {
        valueA = a.price_per_night || 0;
        valueB = b.price_per_night || 0;
      } else if (orderBy === "rating") {
        valueA = a.rating_overall || 0;
        valueB = b.rating_overall || 0;
      } else {
        return 0;
      }

      return sortBy === "asc" ? valueA - valueB : valueB - valueA;
    });
  }

  async getAll(sortBy?: string, orderBy?: string): Promise<Room[]> {
    return this.sortRooms(this.rooms, sortBy, orderBy);
  }

  async findByCity(
    city: string,
    sortBy?: string,
    orderBy?: string,
    priceMin?: number,
    priceMax?: number,
    rating?: number
  ): Promise<Room[]> {
    const cityLower = city.toLowerCase();
    let rooms = this.rooms.filter(
      (room) => room.city.toLowerCase() === cityLower
    );

    if (priceMin && priceMin > 0) {
      rooms = rooms.filter((room) => room.price_per_night >= priceMin!);
    }

    if (priceMax && priceMax > 0) {
      rooms = rooms.filter((room) => room.price_per_night <= priceMax!);
    }

    if (rating && rating > 0) {
      rooms = rooms.filter((room) => room.rating_overall! >= rating!);
    }
    return this.sortRooms(rooms, sortBy, orderBy);
  }
}
