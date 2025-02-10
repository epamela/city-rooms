export enum Amenities {
  AIR_CONDITIONING_AND_HEATING = "Aire acondicionado y calefacción",
  FREE_PARKING = "Estacionamiento gratuito en las instalaciones",
  SECURITY_BOX = "Caja de seguridad",
  BED_LINEN_INCLUDED = "Ropa de cama incluida",
  WASHER_AND_DRYER = "Lavadora y secadora",
  TV = "Televisión",
  WIFI = "Wi-Fi",
  EQUIPPED_KITCHEN = "Cocina equipada",
  PRIVATE_BATHROOM = "Baño privado",
  OUTDOOR_SPACE = "Espacios al aire libre",
}

export interface Room {
  url: string;
  title: string;
  price_per_night: number;
  currency: "MXN";
  city: string;
  state: string;
  country: string;
  amenities: Amenities[];
  rating_cleanliness: number | null;
  rating_accuracy: number | null;
  rating_checkin: number | null;
  rating_communication: number | null;
  rating_location: number | null;
  rating_value: number | null;
  rating_overall: number | null;
  total_reviews: number;
  created_at: Date;
}
