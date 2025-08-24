// src/pages/features/admin/RideOversight.tsx
import React, { useEffect, useState, ChangeEvent } from "react";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";

interface Ride {
  _id: string;
  pickupLocation?: { address?: string };
  destinationLocation?: { address?: string };
  fare?: number;
  status: string;
  driver?: { name?: string };
  rider?: { name?: string };
  requestedAt: string;
}

const RideOversight: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [filters, setFilters] = useState({ status: "", driver: "", rider: "" });
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/admin/rides");
      setRides(data.rides || []);
    } catch (err) {
      toast.error("Failed to fetch rides");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredRides = rides.filter((ride) => {
    const matchesStatus = filters.status
      ? ride.status === filters.status
      : true;
    const matchesDriver = filters.driver
      ? ride.driver?.name?.toLowerCase().includes(filters.driver.toLowerCase())
      : true;
    const matchesRider = filters.rider
      ? ride.rider?.name?.toLowerCase().includes(filters.rider.toLowerCase())
      : true;
    return matchesStatus && matchesDriver && matchesRider;
  });

  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">Ride Oversight</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          name="driver"
          placeholder="Driver"
          value={filters.driver}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="rider"
          placeholder="Rider"
          value={filters.rider}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="requested">Requested</option>
          <option value="in_transit">In Transit</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading rides...</p>
      ) : filteredRides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <div className="space-y-2">
          {filteredRides.map((ride) => (
            <div key={ride._id} className="bg-white shadow p-3 rounded">
              <p>
                <span className="font-semibold">Pickup:</span>{" "}
                {ride.pickupLocation?.address || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Destination:</span>{" "}
                {ride.destinationLocation?.address || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Fare:</span> ${ride.fare || 0}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {ride.status}
              </p>
              <p>
                <span className="font-semibold">Driver:</span>{" "}
                {ride.driver?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Rider:</span>{" "}
                {ride.rider?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Requested At:</span>{" "}
                {new Date(ride.requestedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideOversight;
