import { Router } from "express";
import { PlaceService } from "../services/PlaceService";

export function placeRoutes(placeService: PlaceService) {
  const router = Router();

  router.get("/cities", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res
          .status(400)
          .json({ error: 'Query parameter "q" is required' });
      }

      const places = await placeService.searchPlaces(String(q), true);
      res.json(places);
    } catch (error) {
      console.error("Error searching places:", error);
      res.status(500).json({ error: "Failed to search places" });
    }
  });

  router.get("/stay", async (req, res) => {
    try {
      const { q, priceMin, priceMax, rating } = req.query;
      if (!q) {
        return res
          .status(400)
          .json({ error: 'Query parameter "q" is required' });
      }

      const filters = {
        priceMin: priceMin ? Number(priceMin) : 0,
        priceMax: priceMax ? Number(priceMax) : 0,
        rating: rating ? Number(rating) : 0,
      };

      console.log("filters", filters);

      const cityRooms = await placeService.searchPlacesWithRooms(String(q));
      res.json(cityRooms);
    } catch (error) {
      console.error("Error searching places:", error);
      res.status(500).json({ error: "Failed to search places" });
    }
  });

  return router;
}
