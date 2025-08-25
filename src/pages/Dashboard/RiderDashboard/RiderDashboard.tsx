import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const COLORS = [
  "#4ade80",
  "#f87171",
  "#fbbf24",
  "#60a5fa",
  "#c084fc",
  "#f472b6",
];

const RiderDashboard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRides: 0,
    totalFare: 0,
    completedRides: 0,
    cancelledRides: 0,
  });

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axiosInstance.get("/rides/history");
        setRides(res.data.rides || []);
        const completedRides = res.data.rides.filter(
          (ride) => ride.status === "completed"
        ).length;
        const cancelledRides = res.data.rides.filter(
          (ride) => ride.status === "cancelled"
        ).length;
        const totalFare = res.data.rides
          .filter((ride) => ride.status === "completed")
          .reduce((sum, ride) => sum + (ride.fare || 0), 0);
        setStats({
          totalRides: res.data.rides.length,
          totalFare,
          completedRides,
          cancelledRides,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="border-[#D9C4B0] border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  const rideCountData = rides.reduce((acc, ride) => {
    const month = new Date(
      ride.requestedAt || ride.createdAt || new Date()
    ).toLocaleString("default", { month: "short" });
    const existing = acc.find((d) => d.month === month);
    if (existing) existing.rides += 1;
    else acc.push({ month, rides: 1 });
    return acc;
  }, []);

  const fareData = rides.reduce((acc, ride) => {
    const month = new Date(
      ride.requestedAt || ride.createdAt || new Date()
    ).toLocaleString("default", { month: "short" });
    const existing = acc.find((d) => d.month === month);
    if (existing) existing.fare += ride.fare || 0;
    else acc.push({ month, fare: ride.fare || 0 });
    return acc;
  }, []);

  const statusCount = rides.reduce((acc, ride) => {
    acc[ride.status] = (acc[ride.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  const topDestinations = rides
    .reduce((acc, ride) => {
      const dest =
        ride.destinationLocation?.name || ride.destination || "Unknown";
      const existing = acc.find((d) => d.name === dest);
      if (existing) existing.count += 1;
      else acc.push({ name: dest, count: 1 });
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-3 border border-gray-200 rounded-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-gray-600 text-sm">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="bg-gradient-to-r from-[#D9C4B0] to-[#BFAA95] mb-8 p-6 rounded-xl text-white">
        <h1 className="font-bold text-2xl">Rider Dashboard</h1>
        <p className="opacity-90 mt-1">
          Overview of your riding activity and statistics
        </p>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <div className="flex items-center">
            <div className="bg-green-100 mr-4 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-600 text-sm">Total Rides</p>
              <p className="font-bold text-gray-900 text-2xl">
                {stats.totalRides}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <div className="flex items-center">
            <div className="bg-blue-100 mr-4 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-600 text-sm">Total Spent</p>
              <p className="font-bold text-gray-900 text-2xl">
                ৳{stats.totalFare.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <div className="flex items-center">
            <div className="bg-green-100 mr-4 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-600 text-sm">Completed</p>
              <p className="font-bold text-gray-900 text-2xl">
                {stats.completedRides}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <div className="flex items-center">
            <div className="bg-red-100 mr-4 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-600 text-sm">Cancelled</p>
              <p className="font-bold text-gray-900 text-2xl">
                {stats.cancelledRides}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-800 text-lg">
            Ride Trends
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={rideCountData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="rides"
                stroke="#D9C4B0"
                fill="#F5F0EB"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-800 text-lg">
            Fare Summary
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={fareData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="fare" fill="#BFAA95" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-800 text-lg">
            Ride Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} rides`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-800 text-lg">
            Top Destinations
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topDestinations}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip formatter={(value) => [`${value} rides`, "Count"]} />
              <Bar dataKey="count" fill="#8B6B4F" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {rides.length > 0 && (
        <div className="bg-white shadow-sm mt-8 p-6 border border-gray-100 rounded-xl">
          <h2 className="mb-4 font-semibold text-gray-800 text-lg">
            Recent Rides
          </h2>
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-200 min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Fare
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rides.slice(0, 5).map((ride) => (
                  <tr key={ride._id}>
                    <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                      {new Date(
                        ride.requestedAt || ride.createdAt
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">
                      {ride.pickupLocation?.name || ride.pickup || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">
                      {ride.destinationLocation?.name ||
                        ride.destination ||
                        "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap">
                      ৳{ride.fare?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          ride.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : ride.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ride.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
