import { Amenities } from "../interfaces/Room";
interface RoomCardProps {
  title: string;
  price: number;
  amenities: string[];
  rating: number | null;
}

export const RoomCard = ({
  title,
  price,
  amenities,
  rating,
}: RoomCardProps) => {
  const getAmenityColor = (amenity: string) => {
    switch (amenity) {
      case Amenities.AIR_CONDITIONING_AND_HEATING:
        return "bg-blue-500";
      case Amenities.FREE_PARKING:
        return "bg-green-500";
      case Amenities.SECURITY_BOX:
        return "bg-red-500";
      case Amenities.BED_LINEN_INCLUDED:
        return "bg-yellow-500";
      case Amenities.WASHER_AND_DRYER:
        return "bg-purple-500";
      case Amenities.TV:
        return "bg-orange-500";
      case Amenities.WIFI:
        return "bg-cyan-500";
      case Amenities.EQUIPPED_KITCHEN:
        return "bg-lime-500";
      case Amenities.PRIVATE_BATHROOM:
        return "bg-pink-500";
      case Amenities.OUTDOOR_SPACE:
        return "bg-teal-500";
      default:
        return "bg-gray-500";
    }
  };

  const AmenityPill = ({ amenity }: { amenity: string }) => {
    return (
      <span
        key={amenity}
        className={`${getAmenityColor(
          amenity
        )} text-white px-2 py-.5 rounded-full`}
      >
        {amenity}
      </span>
    );
  };

  return (
    <div className="rounded-lg p-4 w-full shadow-xs shadow-indigo-100 hover:shadow-indigo-200 hover:cursor-pointer transition-shadow duration-300">
      <div className="mt-2 w-full">
        <dl>
          <div>
            <dt className="sr-only">Price</dt>

            <dd className="text-sm text-gray-500">${price}/noche</dd>
          </div>

          <div>
            <dt className="sr-only">Address</dt>

            <dd className="font-medium">{title}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 max-w-44">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-indigo-700"
              stroke="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Calificación</p>

              <p className="font-medium">{rating || "N/A"}</p>
            </div>
          </div>

          <div className="flex">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Amenidades</p>

              <div className="flex flex-wrap gap-1">
                {amenities.map((amenity) => (
                  <span key={amenity}>
                    <AmenityPill amenity={amenity} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
