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

  const showAlert = (message: string, type = "info") => {
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
      showAlert(
        err.response?.data?.message || "Ride request failed. Please try again.",
        "error"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white shadow-2xl mx-auto border border-gray-100 rounded-3xl max-w-md overflow-hidden font-sans">
      {alert.show && (
        <div className="top-10 z-50 fixed inset-x-0 flex justify-center animate-fadeIn">
          <div
            className={`flex items-center gap-4 max-w-md w-full mx-4 p-6 rounded-2xl shadow-2xl border-l-8 text-lg font-semibold transition-all
            ${
              alert.type === "error"
                ? "bg-red-100 border-red-600 text-red-800"
                : alert.type === "success"
                ? "bg-green-100 border-green-600 text-green-800"
                : "bg-blue-100 border-blue-600 text-blue-800"
            }`}
          >
            <span className="text-2xl">
              {alert.type === "error" && "❌"}
              {alert.type === "success" && "✅"}
              {alert.type === "info" && "ℹ️"}
            </span>
            <p className="flex-1">{alert.message}</p>
            <button
              onClick={() => setAlert({ show: false, message: "", type: "" })}
              className="text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      <div className="relative bg-gradient-to-r from-[#D9C4B0] to-[#BFAA95] p-8 text-white">
        <div className="top-0 right-0 absolute bg-white/20 blur-3xl rounded-full w-32 h-32"></div>
        <h2 className="relative drop-shadow-sm font-extrabold text-3xl">
          🚖 Request a Ride
        </h2>
        <p className="relative opacity-90 mt-1 text-sm">
          Fill in your pickup and destination details
        </p>
      </div>

      <div className="flex bg-gray-50 m-4 p-1 border rounded-2xl">
        <button
          type="button"
          className={`flex-1 py-3 px-4 rounded-xl text-sm transition-all duration-300 ${
            activeTab === "pickup"
              ? "bg-white shadow-md font-semibold text-[#8B6B4F]"
              : "text-gray-600 hover:text-[#8B6B4F]"
          }`}
          onClick={() => setActiveTab("pickup")}
        >
          Pickup
        </button>
        <button
          type="button"
          className={`flex-1 py-3 px-4 rounded-xl text-sm transition-all duration-300 ${
            activeTab === "destination"
              ? "bg-white shadow-md font-semibold text-[#8B6B4F]"
              : "text-gray-600 hover:text-[#8B6B4F]"
          }`}
          onClick={() => setActiveTab("destination")}
        >
          Destination
        </button>
      </div>

      <form onSubmit={handleRequestRide} className="px-6 pb-8">
        <div className={activeTab !== "pickup" ? "hidden" : "space-y-4"}>
          <InputField
            label="Pickup Name"
            value={pickupName}
            onChange={setPickupName}
            placeholder="Home, Office..."
          />
          <InputField
            label="Pickup Address"
            value={pickupAddress}
            onChange={setPickupAddress}
            placeholder="Full address"
          />
          <CoordInputs
            lat={pickupLat}
            setLat={setPickupLat}
            lng={pickupLng}
            setLng={setPickupLng}
          />
          <button
            type="button"
            className="bg-[#F5F0EB] hover:bg-[#E8DFD5] shadow-sm py-3 rounded-xl w-full font-medium text-[#8B6B4F] transition"
            onClick={() => setActiveTab("destination")}
          >
            Next: Destination →
          </button>
        </div>

        <div className={activeTab !== "destination" ? "hidden" : "space-y-4"}>
          <InputField
            label="Destination Name"
            value={destName}
            onChange={setDestName}
            placeholder="Mall, Airport..."
          />
          <InputField
            label="Destination Address"
            value={destAddress}
            onChange={setDestAddress}
            placeholder="Full address"
          />
          <CoordInputs
            lat={destLat}
            setLat={setDestLat}
            lng={destLng}
            setLng={setDestLng}
          />

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 bg-[#F5F0EB] hover:bg-[#E8DFD5] shadow-sm py-3 rounded-xl font-medium text-[#8B6B4F] transition"
              onClick={() => setActiveTab("pickup")}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex flex-1 justify-center items-center bg-gradient-to-r from-[#D9C4B0] to-[#BFAA95] hover:opacity-90 disabled:opacity-60 shadow-md px-6 py-3 rounded-xl font-medium text-white transition"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
                  Requesting...
                </span>
              ) : (
                "Request Ride"
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 pt-4 border-gray-200 border-t text-gray-400 text-xs text-center">
          Tip: Use Google Maps to find latitude & longitude 📍
        </p>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="block mb-1 font-medium text-gray-600 text-sm">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-gray-50 p-3 border border-gray-200 focus:border-[#D9C4B0] rounded-xl focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
    />
  </div>
);

const CoordInputs = ({
  lat,
  setLat,
  lng,
  setLng,
}: {
  lat: string;
  setLat: (val: string) => void;
  lng: string;
  setLng: (val: string) => void;
}) => (
  <div className="gap-4 grid grid-cols-2">
    <div>
      <label className="block mb-1 font-medium text-gray-600 text-sm">
        Latitude
      </label>
      <input
        type="number"
        step="any"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="40.7128"
        className="bg-gray-50 p-3 border border-gray-200 focus:border-[#D9C4B0] rounded-xl focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
      />
    </div>
    <div>
      <label className="block mb-1 font-medium text-gray-600 text-sm">
        Longitude
      </label>
      <input
        type="number"
        step="any"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder="-74.0060"
        className="bg-gray-50 p-3 border border-gray-200 focus:border-[#D9C4B0] rounded-xl focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
      />
    </div>
  </div>
);

export default AddRideForm;
