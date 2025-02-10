import { Room } from "./Room";
import { Place } from "./Place";

export interface CityRooms {
  city: Place;
  rooms: Room[];
}
