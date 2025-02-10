import React, { useEffect, useState } from "react";
import { Room } from "../interfaces/Room";
import { api } from "../services/api";

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await api.getRooms();
        setRooms(data);
      } catch (err) {
        setError("Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
  );
};

export default RoomList;
