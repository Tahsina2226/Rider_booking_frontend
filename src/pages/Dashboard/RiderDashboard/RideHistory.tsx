import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axios";

interface Ride {
  _id: string;
  pickup: string;
  destination: string;
  fare: number;
  status: string;
}

const RideHistory: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const { data } = await axiosInstance.get<{ rides: Ride[] }>(
          "/rides/history"
        );
        setRides(data.rides);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch ride history");
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  if (loading) return <p className="mt-6 text-center">Loading rides...</p>;
  if (error) return <p className="mt-6 text-red-500 text-center">{error}</p>;
  if (!rides.length) return <p className="mt-6 text-center">No rides found.</p>;

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <h2 className="mb-6 font-bold text-2xl">📝 Ride History</h2>
      <ul className="space-y-4">
        {rides.map((ride) => (
          <li
            key={ride._id}
            className="hover:shadow-lg p-4 border rounded-lg transition"
          >
            <p>
              <span className="font-semibold">Pickup:</span> {ride.pickup}
            </p>
            <p>
              <span className="font-semibold">Destination:</span>{" "}
              {ride.destination}
            </p>
            <p>
              <span className="font-semibold">Fare:</span> ৳{ride.fare}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {ride.status}
            </p>
            <Link
              to={`/features/rider/ride-details/${ride._id}`}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideHistory;
