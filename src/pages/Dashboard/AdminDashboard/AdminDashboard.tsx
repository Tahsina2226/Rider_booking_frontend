import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import { Line } from "react-chartjs-2";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ChartJS register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Stats {
  totalRides: number;
  completedRides: number;
  activeDrivers: number;
  totalEarnings: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/admin/analytics"); // backend route
      setStats({
        totalRides: data.totalRides,
        completedRides: data.completedRides,
        activeDrivers: data.activeDrivers,
        totalEarnings: data.totalEarnings,
      });
    } catch (err: any) {
      toast.error("Failed to fetch admin stats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl">Admin Dashboard</h1>

      {stats && (
        <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-medium">Total Rides</h2>
            <p className="font-bold text-xl">{stats.totalRides}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-medium">Completed Rides</h2>
            <p className="font-bold text-xl">{stats.completedRides}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-medium">Active Drivers</h2>
            <p className="font-bold text-xl">{stats.activeDrivers}</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-medium">Total Revenue</h2>
            <p className="font-bold text-xl">${stats.totalEarnings}</p>
          </div>
        </div>
      )}

      {/* Revenue Trends Chart */}
      {stats && (
        <div className="bg-white shadow mt-6 p-4 rounded-lg">
          <h2 className="mb-2 font-medium">Revenue Trends</h2>
          <Line
            key="revenue-chart"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May"], // replace with dynamic data if available
              datasets: [
                {
                  label: "Revenue ($)",
                  data: [1200, 1900, 1400, 2200, 2500], // replace with backend monthly revenue
                  borderColor: "#CFAB8D",
                  backgroundColor: "rgba(207, 171, 141,0.3)",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Monthly Revenue",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
