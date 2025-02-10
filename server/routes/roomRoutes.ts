import { Router } from "express";
import { RoomService } from "../services/RoomService";

export function roomRoutes(roomService: RoomService) {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      const rooms = await roomService.getAllRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  });

  // Search rooms with filters
  router.get("/search", async (req, res) => {
    try {
      const { city } = req.query;

      const searchParams = {
        city: city ? String(city).replace(/['"]+/g, "") : "",
      };

      const rooms = await roomService.searchRooms(searchParams);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: "Failed to search rooms" });
    }
  });

  return router;
}
