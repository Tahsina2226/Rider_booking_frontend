import React, { useEffect, useState, ChangeEvent } from "react";
import axiosInstance from "../../../api/axios";
import { toast } from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Ride {
  _id: string;
  pickupLocation?: { address: string };
  fare: number;
  status: "completed";
  requestedAt: string;
}

const EarningsHistory: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 5;

  const filteredRides = rides.filter((r) =>
    r.pickupLocation?.address?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRides.length / ridesPerPage);
  const indexOfLastRide = currentPage * ridesPerPage;
  const indexOfFirstRide = indexOfLastRide - ridesPerPage;
  const currentRides = filteredRides.slice(indexOfFirstRide, indexOfLastRide);

  useEffect(() => {
    fetchRideHistory();
  }, []);

  const fetchRideHistory = async () => {
    try {
      const res = await axiosInstance.get("/driver/earnings");
      setRides(res.data.rides);
    } catch (err) {
      toast.error("Failed to fetch earnings");
    }
  };

  // Chart Data
  const chartData = {
    labels: rides.map((r) => new Date(r.requestedAt).toLocaleDateString()),
    datasets: [
      {
        label: "Fare",
        data: rides.map((r) => r.fare),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h2 className="mb-2 font-bold text-lg">Earnings & Ride History</h2>
      <div className="mb-4">
        <Bar data={chartData} />
      </div>

      <input
        type="text"
        placeholder="Search by pickup address"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="mb-4 p-2 border rounded w-full"
      />

      {currentRides.map((ride) => (
        <div
          key={ride._id}
          className="flex justify-between mb-2 p-3 border rounded"
        >
          <div>
            <p>Pickup: {ride.pickupLocation?.address || "N/A"}</p>
            <p>Date: {new Date(ride.requestedAt).toLocaleString()}</p>
            <p>Status: {ride.status}</p>
          </div>
          <p className="font-bold">${ride.fare}</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="bg-gray-200 disabled:opacity-50 px-3 py-1 rounded"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-gray-200 disabled:opacity-50 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EarningsHistory;
