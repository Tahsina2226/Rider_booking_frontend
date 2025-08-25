import React, { useState } from "react";
import AvailabilityRequests from "./AvailabilityRequests";
import ActiveRide from "./ActiveRide";
import EarningsHistory from "./EarningsHistory";
import ProfileManagement from "./ProfileManagement";

const DriverDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "availability" | "active" | "earnings" | "profile"
  >("availability");

  return (
    <div className="p-6">
      <h1 className="mb-4 font-bold text-2xl">Driver Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "availability"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("availability")}
        >
          Availability & Requests
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Ride
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "earnings" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("earnings")}
        >
          Earnings & History
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Management
        </button>
      </div>

      {/* Render Selected Tab */}
      {activeTab === "availability" && <AvailabilityRequests />}
      {activeTab === "active" && <ActiveRide />}
      {activeTab === "earnings" && <EarningsHistory />}
      {activeTab === "profile" && <ProfileManagement />}
    </div>
  );
};

export default DriverDashboard;
