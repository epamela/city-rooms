import { useState } from "react";
import { api } from "../services/api";
import { CityRooms } from "../interfaces/CityRooms";

export function SearchPlaces() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityRooms[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await api.searchPlaces(query);
      setResults(data);
    } catch (err) {
      setError("Failed to search places");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places..."
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div>
        {results.map((cityRooms) => (
          <div key={cityRooms.city.id}>
            <h2>{cityRooms.city.city_name}</h2>
            <p>
              {cityRooms.city.state}, {cityRooms.city.country}
            </p>

            <h3>Available Rooms:</h3>
            <div className="rooms-grid">
              {cityRooms.rooms.map((room) => (
                <div key={room.url} className="room-card">
                  <h4>{room.title}</h4>
                  <p>{room.city}</p>
                  <p>Price: ${room.price_per_night}/night</p>
                  <p>Rating: {room.rating_overall}/5</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
