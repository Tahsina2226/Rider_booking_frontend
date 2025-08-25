import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../../api/axios";

interface Driver {
  name: string;
  phone: string;
  car: string;
}

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface Ride {
  _id: string;
  pickupLocation: Location;
  destinationLocation: Location;
  fare: number;
  status: string;
  requestedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  driver?: Driver;
}

const RideDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ride, setRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid ride ID.");
      setLoading(false);
      return;
    }

    const fetchRide = async () => {
      try {
        const { data } = await axiosInstance.get<{ ride: Ride }>(
          `/rides/history/${id}`
        );

        if (!data?.ride) {
          setError("Ride not found.");
          return;
        }

        setRide(data.ride);
      } catch (err: any) {
        if (err.response) {
          setError(
            err.response.data?.message || `Server Error: ${err.response.status}`
          );
        } else if (err.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError(err.message || "An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="border-[#CFAB8D] border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <p className="mt-6 font-semibold text-red-500 text-center">{error}</p>
    );

  if (!ride) return <p className="mt-6 text-center">Ride not found.</p>;

  return (
    <div className="space-y-6 mx-auto mt-10 p-6 max-w-3xl">
      <div className="bg-gradient-to-r from-[#CFAB8D] to-[#BFAA95] shadow-lg p-6 rounded-2xl text-white">
        <h2 className="mb-1 font-bold text-2xl">🚖 Ride Details</h2>
        <p className="opacity-90">Here’s the complete overview of your ride.</p>
      </div>

      <div className="space-y-3 bg-white shadow-md p-6 rounded-2xl">
        <h3 className="mb-2 font-semibold text-gray-700 text-lg">
          Trip Information
        </h3>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          <div className="bg-[#F9F5F2] p-4 rounded-xl">
            <p className="font-medium text-gray-800">Pickup</p>
            <p className="text-gray-600">
              {ride.pickupLocation?.address || "N/A"}
            </p>
          </div>
          <div className="bg-[#F9F5F2] p-4 rounded-xl">
            <p className="font-medium text-gray-800">Destination</p>
            <p className="text-gray-600">
              {ride.destinationLocation?.address || "N/A"}
            </p>
          </div>
          <div className="bg-[#F9F5F2] p-4 rounded-xl">
            <p className="font-medium text-gray-800">Fare</p>
            <p className="text-gray-600">৳{ride.fare.toFixed(2)}</p>
          </div>
          <div className="bg-[#F9F5F2] p-4 rounded-xl">
            <p className="font-medium text-gray-800">Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                ride.status
              )}`}
            >
              {ride.status}
            </span>
          </div>
        </div>
      </div>

      {ride.driver && (
        <div className="bg-white shadow-md p-6 rounded-2xl">
          <h3 className="mb-3 font-semibold text-gray-700 text-lg">
            👨‍✈️ Driver Info
          </h3>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
            <div className="bg-[#CFAB8D] p-4 rounded-xl text-white">
              <p className="font-medium">Name</p>
              <p>{ride.driver.name}</p>
            </div>
            <div className="bg-[#CFAB8D] p-4 rounded-xl text-white">
              <p className="font-medium">Phone</p>
              <p>{ride.driver.phone}</p>
            </div>
            <div className="bg-[#CFAB8D] p-4 rounded-xl text-white">
              <p className="font-medium">Car</p>
              <p>{ride.driver.car}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md p-6 rounded-2xl">
        <h3 className="mb-3 font-semibold text-gray-700 text-lg">
          📌 Ride Timeline
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="bg-gray-400 mr-3 rounded-full w-3 h-3"></span>
            Requested: {new Date(ride.requestedAt).toLocaleString()}
          </li>
          {ride.acceptedAt && (
            <li className="flex items-center">
              <span className="bg-blue-400 mr-3 rounded-full w-3 h-3"></span>
              Accepted: {new Date(ride.acceptedAt).toLocaleString()}
            </li>
          )}
          {ride.startedAt && (
            <li className="flex items-center">
              <span className="bg-yellow-400 mr-3 rounded-full w-3 h-3"></span>
              Started: {new Date(ride.startedAt).toLocaleString()}
            </li>
          )}
          {ride.completedAt && (
            <li className="flex items-center">
              <span className="bg-green-400 mr-3 rounded-full w-3 h-3"></span>
              Completed: {new Date(ride.completedAt).toLocaleString()}
            </li>
          )}
          {ride.cancelledAt && (
            <li className="flex items-center">
              <span className="bg-red-400 mr-3 rounded-full w-3 h-3"></span>
              Cancelled: {new Date(ride.cancelledAt).toLocaleString()}
            </li>
          )}
        </ul>
      </div>

      <div className="text-center">
        <Link
          to="/features/rider/ride-history"
          className="inline-block bg-[#CFAB8D] hover:bg-[#BFAA95] shadow-md px-6 py-2 rounded-full font-medium text-white transition"
        >
          ← Back to Ride History
        </Link>
      </div>
    </div>
  );
};

export default RideDetails;
