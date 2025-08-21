import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

const API_BASE = "https://rider-booking.onrender.com/api";

const RiderDashboard = () => {
  const [totalRides, setTotalRides] = useState(0);
  const [upcomingRides, setUpcomingRides] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/rides/me`, {
          withCredentials: true,
        });

        const rides = res.data || [];
        setTotalRides(rides.length);
        const upcoming = rides.filter((ride) => ride.status === "scheduled");
        setUpcomingRides(upcoming.length);
        setWalletBalance(res.data?.walletBalance || 1200);
      } catch (err) {
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-bold text-gray-800 text-2xl">Rider Dashboard</h1>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="bg-gradient-to-r from-[#CFAB8D] to-[#D9C4B0] shadow-lg p-6 rounded-2xl text-white">
          <h2 className="font-semibold text-lg">🚖 Total Rides</h2>
          <p className="mt-2 font-bold text-3xl">
            {loading ? "..." : totalRides}
          </p>
          <p className="opacity-80 mt-1 text-sm">Completed rides</p>
        </div>

        <div className="bg-gradient-to-r from-[#CFAB8D] to-[#D9C4B0] shadow-lg p-6 rounded-2xl text-white">
          <h2 className="font-semibold text-lg">📅 Upcoming Rides</h2>
          <p className="mt-2 font-bold text-3xl">
            {loading ? "..." : upcomingRides}
          </p>
          <p className="opacity-80 mt-1 text-sm">Scheduled</p>
        </div>

        <div className="bg-gradient-to-r from-[#CFAB8D] to-[#D9C4B0] shadow-lg p-6 rounded-2xl text-white">
          <h2 className="font-semibold text-lg">💳 Wallet Balance</h2>
          <p className="mt-2 font-bold text-3xl">৳ {walletBalance}</p>
          <p className="opacity-80 mt-1 text-sm">Available balance</p>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default RiderDashboard;
