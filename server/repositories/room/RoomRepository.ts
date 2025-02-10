import { Room } from "../../interfaces/Room";

enum SortBy {
  ASC = "asc",
  DESC = "desc",
}

enum OrderBy {
  PRICE = "price",
  RATING = "rating",
}

export interface RoomRepository {
  getAll(sortBy?: SortBy, orderBy?: OrderBy): Promise<Room[]>;
  findByCity(
    city: string,
    sortBy?: SortBy,
    orderBy?: OrderBy,
    priceMin?: number,
    priceMax?: number,
    rating?: number
  ): Promise<Room[]>;
}
