import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axios";

interface Ride {
  _id: string;
  pickup: string;
  destination: string;
  fare: number;
  status: string;
  createdAt?: string;
  driver?: {
    name: string;
  };
}

const RideHistory: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredRides = rides.filter((ride) => {
    if (filter === "all") return true;
    return ride.status.toLowerCase() === filter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="border-[#CFAB8D] border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 mx-auto mt-10 p-4 border-red-500 border-l-4 rounded max-w-3xl">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!rides.length) {
    return (
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="bg-gradient-to-r from-[#F9F5F2] to-[#F0E8E0] shadow-sm py-12 rounded-xl text-center">
          <svg
            className="mx-auto w-16 h-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 font-medium text-gray-900 text-xl">
            No rides yet
          </h3>
          <p className="mt-2 text-gray-500">
            Your ride history will appear here once you start riding.
          </p>
          <div className="mt-6">
            <Link
              to="/features/rider/request-ride"
              className="inline-flex items-center bg-[#CFAB8D] hover:bg-[#BFAA95] shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-[#CFAB8D] focus:ring-2 focus:ring-offset-2 font-medium text-white text-sm"
            >
              Request Your First Ride
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div className="bg-gradient-to-r from-[#CFAB8D] to-[#BFAA95] mb-8 p-6 rounded-xl text-white">
        <h2 className="font-bold text-2xl">Your Ride History</h2>
        <p className="opacity-90 mt-1">
          Review all your past and current rides
        </p>
      </div>

      <div className="bg-white shadow-sm mb-6 p-4 rounded-lg">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="mb-2 sm:mb-0 font-medium text-gray-700 text-lg">
            Filter Rides
          </h3>
          <div className="flex space-x-2">
            {["all", "completed", "cancelled", "in progress", "pending"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    filter === status
                      ? "bg-[#CFAB8D] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="hidden gap-4 sm:grid grid-cols-12 bg-gray-50 p-4 font-medium text-gray-500 text-sm uppercase tracking-wider">
          <div className="col-span-3">Trip</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Fare</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <ul className="divide-y divide-gray-200">
          {filteredRides.map((ride) => (
            <li
              key={ride._id}
              className="hover:bg-gray-50 p-4 transition-colors duration-150"
            >
              <div className="items-center gap-4 grid grid-cols-1 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <div className="flex items-center">
                    <div className="bg-[#CFAB8D] mr-3 p-2 rounded-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 truncate">
                        {ride.pickup}
                      </p>
                      <p className="text-gray-500 text-sm truncate">
                        {ride.destination}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-gray-500 text-sm">
                    {formatDate(ride.createdAt)}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="font-medium text-gray-900">
                    ৳{ride.fare.toFixed(2)}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      ride.status
                    )}`}
                  >
                    {ride.status}
                  </span>
                </div>

                <div className="flex justify-end sm:col-span-3">
                  <Link
                    to={`/features/rider/ride-details/${ride._id}`}
                    className="inline-flex items-center bg-[#CFAB8D] hover:bg-[#BFAA95] px-3 py-1.5 border border-transparent rounded-md focus:outline-none focus:ring-[#CFAB8D] focus:ring-2 focus:ring-offset-2 font-medium text-white text-xs transition"
                  >
                    View Details
                    <svg
                      className="-mr-0.5 ml-1 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {filteredRides.length === 0 && (
          <div className="py-10 text-center">
            <svg
              className="mx-auto w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 font-medium text-gray-900 text-lg">
              No {filter} rides
            </h3>
            <p className="mt-2 text-gray-500">
              Try selecting a different filter to see more rides.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 text-gray-500 text-sm text-center">
        <p>
          Showing {filteredRides.length} of {rides.length} rides
        </p>
      </div>
    </div>
  );
};

export default RideHistory;
