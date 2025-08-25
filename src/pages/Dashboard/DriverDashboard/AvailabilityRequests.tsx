import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface Ride {
  _id: string;
  pickupLocation?: Location;
  dropLocation?: Location;
  fare: number;
  status: "requested" | "accepted" | "picked_up" | "in_transit" | "completed";
}

const AvailabilityRequests: React.FC = () => {
  const [availability, setAvailability] = useState<boolean>(false);
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    fetchAvailability();
    fetchAvailableRides();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await axiosInstance.get("/driver/profile");
      setAvailability(res.data.availabilityStatus === "online");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAvailableRides = async () => {
    try {
      const res = await axiosInstance.get("/driver/available");
      setRides(res.data.rides);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAvailability = async () => {
    try {
      const res = await axiosInstance.post("/driver/availability", {
        availabilityStatus: !availability ? "online" : "offline",
      });
      setAvailability(res.data.availabilityStatus === "online");
      toast.success("Availability updated!");
    } catch (err) {
      toast.error("Failed to update availability");
    }
  };

  const acceptRide = async (rideId: string) => {
    try {
      const res = await axiosInstance.post(`/driver/accept/${rideId}`);
      setRides(rides.filter((r) => r._id !== rideId));
      toast.success("Ride accepted!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to accept ride");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <p className="font-bold">Availability:</p>
        <button
          onClick={toggleAvailability}
          className={`px-4 py-2 rounded text-white ${
            availability ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {availability ? "Online" : "Offline"}
        </button>
      </div>

      <h2 className="mb-2 font-bold text-lg">Incoming Requests</h2>
      {rides.length === 0 && <p>No rides available</p>}
      <ul className="space-y-2">
        {rides.map((ride) => (
          <li
            key={ride._id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <p>
                Pickup: {ride.pickupLocation?.address || "N/A"} (
                {ride.pickupLocation?.lat ?? "?"},{" "}
                {ride.pickupLocation?.lng ?? "?"})
              </p>
              <p>
                Drop: {ride.dropLocation?.address || "N/A"} (
                {ride.dropLocation?.lat ?? "?"}, {ride.dropLocation?.lng ?? "?"}
                )
              </p>
              <p>Fare: ${ride.fare}</p>
            </div>
            <button
              onClick={() => acceptRide(ride._id)}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Accept
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailabilityRequests;
