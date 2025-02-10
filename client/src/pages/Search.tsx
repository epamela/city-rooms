import { useState } from "react";
import { api } from "../services/api";
import { CityRooms } from "../interfaces/CityRooms";
import { SearchBar } from "../components/SearchBar";
import { Button } from "../components/Button";
import { Filters } from "../templates/Filters";
import { RoomCard } from "../components/RoomCard";

export interface IFilters {
  priceMin: number;
  priceMax: number;
  rating: number | null;
}

export function SearchPlaces() {
  const [results, setResults] = useState<CityRooms[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<IFilters>({
    priceMin: 0,
    priceMax: 0,
    rating: 0,
  });

  const handleSearch = async () => {
    if (!query.trim()) setLoading(true);
    setError(null);

    try {
      const data = await api.searchPlaces(query, filters);
      setResults(data);
    } catch (err) {
      setError("Failed to search places");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setResults([]);
    }
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const NoRoomsCard = () => {
    return (
      <div className="flex justify-center items-center h-full rounded-lg p-4 w-full shadow-xs shadow-indigo-100 hover:shadow-indigo-200">
        <p className="text-gray-500">No rooms found</p>
      </div>
    );
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
        <section className="w-full col-span-3 md:col-span-1 ">
          <div className="md:sticky md:top-50">
            <div className="flex gap-5 justify-center mb-5 ">
              <SearchBar
                value={query}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
            <Filters
              filters={filters}
              onFilterChange={(filters) => setFilters(filters)}
            />
          </div>
        </section>
        <section className="w-full col-span-3 md:col-span-2">
          {results.map((cityRooms) => (
            <div className="mb-5" key={cityRooms.city.id}>
              <h2 className="text-2xl font-bold">{cityRooms.city.display}</h2>
              <p className="text-sm text-gray-500">
                {cityRooms.city.state}, {cityRooms.city.country}
              </p>
              <div className="rooms-grid">
                {cityRooms.rooms.length == 0 && <NoRoomsCard />}
                {cityRooms.rooms.map((room) => (
                  <RoomCard
                    key={room.url}
                    title={room.title}
                    price={room.price_per_night}
                    amenities={room.amenities}
                    rating={room.rating_overall}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
