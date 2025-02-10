import express from "express";
import { roomRoutes } from "./routes/roomRoutes";
import { placeRoutes } from "./routes/placeRoutes";
import { CsvRoomRepository } from "./repositories/room/CsvRoomRepository";
import { RoomService } from "./services/RoomService";
import { PlaceService } from "./services/PlaceService";
import { ApiPlaceRepository } from "./repositories/place/ApiPlaceRepository";

const app = express();
const port = process.env.PORT || 3000;

const roomRepository = new CsvRoomRepository();
const roomService = new RoomService(roomRepository);

const placeRepository = new ApiPlaceRepository();
const placeService = new PlaceService(placeRepository, roomService);

app.use("/api/rooms", roomRoutes(roomService));
app.use("/api/places", placeRoutes(placeService));

app.use(express.json());

// Init server

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
