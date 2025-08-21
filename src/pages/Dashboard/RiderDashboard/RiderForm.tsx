import { useState } from "react";
import axiosInstance from "../../../api/axios";

const AddRideForm = () => {
  const [pickupName, setPickupName] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLng, setPickupLng] = useState("");

  const [destName, setDestName] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [destLat, setDestLat] = useState("");
  const [destLng, setDestLng] = useState("");

  const [activeTab, setActiveTab] = useState("pickup");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
  };

  const handleRequestRide = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLat || !pickupLng || !destLat || !destLng) {
      showAlert("Please enter all pickup and destination details!", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/rides/request", {
        pickupLocation: {
          name: pickupName || "Pickup Point",
          address: pickupAddress || "Unknown",
          lat: parseFloat(pickupLat),
          lng: parseFloat(pickupLng),
        },
        destinationLocation: {
          name: destName || "Destination Point",
          address: destAddress || "Unknown",
          lat: parseFloat(destLat),
          lng: parseFloat(destLng),
        },
      });

      showAlert("Ride requested successfully!", "success");
      console.log(res.data);

      setPickupName("");
      setPickupAddress("");
      setPickupLat("");
      setPickupLng("");
      setDestName("");
      setDestAddress("");
      setDestLat("");
      setDestLng("");
    } catch (err: any) {
      if (axiosInstance.isAxiosError?.(err)) {
        showAlert(
          err.response?.data?.message ||
            "Ride request failed. Please try again.",
          "error"
        );
      } else {
        showAlert("An unexpected error occurred. Please try again.", "error");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white shadow-lg mx-auto rounded-2xl max-w-md overflow-hidden">
      {alert.show && (
        <div
          className={`fixed top-4 right-4 z-50 max-w-sm w-full animate-fadeIn`}
        >
          <div
            className={`p-4 rounded-lg shadow-lg border-l-4 ${
              alert.type === "error"
                ? "bg-red-50 border-red-500 text-red-700"
                : alert.type === "success"
                ? "bg-green-50 border-green-500 text-green-700"
                : "bg-blue-50 border-blue-500 text-blue-700"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {alert.type === "error" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : alert.type === "success" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm">{alert.message}</p>
              </div>
              <button
                onClick={() => setAlert({ show: false, message: "", type: "" })}
                className="inline-flex -mx-1.5 -my-1.5 ml-auto p-1.5 rounded-lg focus:ring-2 w-8 h-8"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-[#CFAB8D] to-[#A67C5B] p-6 text-white">
        <h2 className="font-bold text-2xl">Request a New Ride</h2>
        <p className="mt-1 text-white text-opacity-90">
          Enter your journey details
        </p>
      </div>

      <div className="flex bg-gray-100 p-1">
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${
            activeTab === "pickup"
              ? "bg-white shadow-md font-medium"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("pickup")}
        >
          Pickup Location
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${
            activeTab === "destination"
              ? "bg-white shadow-md font-medium"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("destination")}
        >
          Destination
        </button>
      </div>

      <form onSubmit={handleRequestRide} className="p-6">
        <div className={activeTab !== "pickup" ? "hidden" : "space-y-4"}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Pickup Name
            </label>
            <input
              type="text"
              value={pickupName}
              onChange={(e) => setPickupName(e.target.value)}
              className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
              placeholder="Home, Office, etc."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Pickup Address
            </label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
              placeholder="Enter full address"
            />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Latitude
              </label>
              <input
                type="number"
                value={pickupLat}
                onChange={(e) => setPickupLat(e.target.value)}
                className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
                placeholder="e.g., 40.7128"
                step="any"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Longitude
              </label>
              <input
                type="number"
                value={pickupLng}
                onChange={(e) => setPickupLng(e.target.value)}
                className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
                placeholder="e.g., -74.0060"
                step="any"
              />
            </div>
          </div>

          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 py-2 rounded-lg w-full font-medium text-gray-700 transition"
            onClick={() => setActiveTab("destination")}
          >
            Next: Destination
          </button>
        </div>

        <div className={activeTab !== "destination" ? "hidden" : "space-y-4"}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Destination Name
            </label>
            <input
              type="text"
              value={destName}
              onChange={(e) => setDestName(e.target.value)}
              className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
              placeholder="Work, Mall, etc."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Destination Address
            </label>
            <input
              type="text"
              value={destAddress}
              onChange={(e) => setDestAddress(e.target.value)}
              className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
              placeholder="Enter full address"
            />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Latitude
              </label>
              <input
                type="number"
                value={destLat}
                onChange={(e) => setDestLat(e.target.value)}
                className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
                placeholder="e.g., 40.7128"
                step="any"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Longitude
              </label>
              <input
                type="number"
                value={destLng}
                onChange={(e) => setDestLng(e.target.value)}
                className="p-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-[#CFAB8D] focus:ring-2 w-full transition"
                placeholder="e.g., -74.0060"
                step="any"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-medium text-gray-700 transition"
              onClick={() => setActiveTab("pickup")}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex flex-1 justify-center items-center bg-gradient-to-r from-[#CFAB8D] to-[#A67C5B] hover:opacity-90 disabled:opacity-70 shadow-md px-6 py-2 rounded-xl text-white transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="mr-2 -ml-1 w-4 h-4 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Requesting...
                </>
              ) : (
                "Request Ride"
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-gray-200 border-t text-gray-500 text-xs">
          <p>
            Tip: You can find coordinates using Google Maps or other mapping
            services.
          </p>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddRideForm;
