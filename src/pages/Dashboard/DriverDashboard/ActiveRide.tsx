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
  status: "accepted" | "picked_up" | "in_transit" | "completed";
}

const ActiveRide: React.FC = () => {
  const [activeRide, setActiveRide] = useState<Ride | null>(null);

  useEffect(() => {
    fetchActiveRide();
  }, []);

  const fetchActiveRide = async () => {
    try {
      const res = await axiosInstance.get("/driver/active"); // You can create this route in backend
      setActiveRide(res.data.ride || null);
    } catch (err) {
      console.error(err);
    }
  };

  const updateRideStatus = async (
    status: "picked_up" | "in_transit" | "completed"
  ) => {
    if (!activeRide) return;
    try {
      const res = await axiosInstance.patch(
        `/driver/status/${activeRide._id}`,
        { status }
      );
      setActiveRide(res.data.ride);
      toast.success("Ride status updated!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update ride");
    }
  };

  const cancelRide = async () => {
    if (!activeRide) return;
    try {
      await axiosInstance.patch(`/driver/status/${activeRide._id}`, {
        status: "cancelled",
      });
      setActiveRide(null);
      toast.success("Ride cancelled");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to cancel ride");
    }
  };

  if (!activeRide) return <p>No active ride</p>;

  return (
    <div className="space-y-4 bg-yellow-100 p-4 rounded">
      <h2 className="font-bold text-lg">Active Ride</h2>
      <p>
        Pickup: {activeRide?.pickupLocation?.address || "N/A"} (
        {activeRide?.pickupLocation?.lat ?? "?"},{" "}
        {activeRide?.pickupLocation?.lng ?? "?"})
      </p>
      <p>
        Drop: {activeRide?.dropLocation?.address || "N/A"} (
        {activeRide?.dropLocation?.lat ?? "?"},{" "}
        {activeRide?.dropLocation?.lng ?? "?"})
      </p>
      <p>Fare: ${activeRide.fare}</p>
      <p>Status: {activeRide.status}</p>

      <div className="space-x-2">
        {activeRide.status === "accepted" && (
          <button
            onClick={() => updateRideStatus("picked_up")}
            className="bg-green-500 px-4 py-2 rounded text-white"
          >
            Picked Up
          </button>
        )}
        {activeRide.status === "picked_up" && (
          <button
            onClick={() => updateRideStatus("in_transit")}
            className="bg-indigo-500 px-4 py-2 rounded text-white"
          >
            In Transit
          </button>
        )}
        {activeRide.status === "in_transit" && (
          <button
            onClick={() => updateRideStatus("completed")}
            className="bg-gray-700 px-4 py-2 rounded text-white"
          >
            Complete
          </button>
        )}
        <button
          onClick={cancelRide}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default ActiveRide;
