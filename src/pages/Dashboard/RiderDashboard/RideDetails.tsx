import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (loading)
    return <p className="mt-6 text-center">Loading ride details...</p>;
  if (error)
    return (
      <p className="mt-6 font-semibold text-red-500 text-center">{error}</p>
    );
  if (!ride) return <p className="mt-6 text-center">Ride not found.</p>;

  return (
    <div className="bg-white shadow-lg mx-auto mt-10 p-6 rounded-2xl max-w-2xl">
      <h2 className="mb-4 font-bold text-2xl">🚖 Ride Details</h2>

      <p>
        <span className="font-semibold">Pickup:</span>{" "}
        {ride.pickupLocation?.address || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Destination:</span>{" "}
        {ride.destinationLocation?.address || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Fare:</span> ৳{ride.fare}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {ride.status}
      </p>
      <p>
        <span className="font-semibold">Requested At:</span>{" "}
        {new Date(ride.requestedAt).toLocaleString()}
      </p>

      {ride.driver && (
        <div className="bg-gray-50 mt-6 p-4 rounded-xl">
          <h3 className="mb-2 font-semibold text-lg">👨‍✈️ Driver Info</h3>
          <p>
            <span className="font-semibold">Name:</span> {ride.driver.name}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {ride.driver.phone}
          </p>
          <p>
            <span className="font-semibold">Car:</span> {ride.driver.car}
          </p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="mb-2 font-semibold text-lg">📌 Ride Status Timeline</h3>
        <ul className="ml-6 text-gray-700 list-disc">
          <li>Requested: {new Date(ride.requestedAt).toLocaleString()}</li>
          {ride.acceptedAt && (
            <li>Accepted: {new Date(ride.acceptedAt).toLocaleString()}</li>
          )}
          {ride.startedAt && (
            <li>Started: {new Date(ride.startedAt).toLocaleString()}</li>
          )}
          {ride.completedAt && (
            <li>Completed: {new Date(ride.completedAt).toLocaleString()}</li>
          )}
          {ride.cancelledAt && (
            <li>Cancelled: {new Date(ride.cancelledAt).toLocaleString()}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RideDetails;
