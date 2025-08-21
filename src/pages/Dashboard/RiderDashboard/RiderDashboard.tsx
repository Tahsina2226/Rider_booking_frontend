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
} from "recharts";

const COLORS = ["#4ade80", "#f87171", "#fbbf24"];

const RiderDashboard = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axiosInstance.get("/rides/history");
        setRides(res.data.rides || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  const rideCountData = rides.reduce((acc, ride) => {
    const month = new Date(ride.requestedAt).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((d) => d.month === month);
    if (existing) existing.rides += 1;
    else acc.push({ month, rides: 1 });
    return acc;
  }, []);

  const fareData = rides.reduce((acc, ride) => {
    const month = new Date(ride.requestedAt).toLocaleString("default", {
      month: "short",
    });
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

  const topDestinations = rides.reduce((acc, ride) => {
    const dest = ride.destinationLocation || "Unknown";
    const existing = acc.find((d) => d.name === dest);
    if (existing) existing.count += 1;
    else acc.push({ name: dest, count: 1 });
    return acc;
  }, []);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="mb-6 font-bold text-2xl">Rider Dashboard</h1>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="mb-2 font-semibold text-lg">Total Rides</h2>
          <p className="mb-2 font-bold text-3xl">{rides.length}</p>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={rideCountData}>
              <Line
                type="monotone"
                dataKey="rides"
                stroke="#4ade80"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="mb-2 font-semibold text-lg">Fare Summary</h2>
          <p className="mb-2 font-bold text-3xl">
            ৳{fareData.reduce((a, b) => a + b.fare, 0)}
          </p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={fareData}>
              <Bar dataKey="fare" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="mb-2 font-semibold text-lg">Ride Status</h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={60}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1 md:col-span-2 bg-white shadow p-4 rounded-lg">
          <h2 className="mb-2 font-semibold text-lg">Top Destinations</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topDestinations}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f472b6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
