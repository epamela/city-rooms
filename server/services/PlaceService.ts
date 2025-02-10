import { Place } from "../interfaces/Place";
import { PlaceRepository } from "../repositories/place/PlaceRepository";
import { CityRooms } from "../interfaces/CityRooms";
import { RoomService } from "./RoomService";
import { Amenities } from "../interfaces/Room";

interface IFilters {
  priceMin: number;
  priceMax: number;
  rating: number;
}
export class PlaceService {
  constructor(
    private placeRepository: PlaceRepository,
    private roomService: RoomService
  ) {}

  async searchPlaces(
    query: string,
    onlyCities: boolean = true
  ): Promise<Place[]> {
    return this.placeRepository.searchPlacesByQuery(query, onlyCities);
  }

  async searchPlacesWithRooms(
    query: string,
    priceMin: number,
    priceMax: number,
    rating: number,
    amenities: Amenities[]
  ): Promise<CityRooms[]> {
    const places = await this.placeRepository.searchPlacesByQuery(query, true);

    const cityRoomsPromises = places.map(async (place) => {
      const rooms = await this.roomService.searchRooms({
        city: place.city_name.toLowerCase(),
        priceMin: priceMin,
        priceMax: priceMax,
        rating: rating,
        amenities: amenities,
      });

      const cityRooms: CityRooms = {
        city: place,
        rooms: rooms,
      };

      return cityRooms;
    });

    return Promise.all(cityRoomsPromises);
  }
}
