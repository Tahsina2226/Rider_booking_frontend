import axios from "axios";

export const API_BASE = "https://rider-booking.onrender.com/api";

// Request a new ride
export const requestRide = async (
  pickupLocation: string,
  destinationLocation: string
) => {
  try {
    const res = await axios.post(
      `${API_BASE}/rides/request`,
      { pickupLocation, destinationLocation },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Ride request failed:", err);
    throw err;
  }
};

// Cancel a ride
export const cancelRide = async (rideId: string) => {
  try {
    const res = await axios.patch(
      `${API_BASE}/rides/cancel/${rideId}`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to cancel ride:", err);
    throw err;
  }
};

// Get ride history
export const getMyRides = async () => {
  try {
    const res = await axios.get(`${API_BASE}/rides/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch rides:", err);
    throw err;
  }
};

// Calculate fare estimate
export const calculateFare = async (
  pickupLocation: string,
  destinationLocation: string
) => {
  try {
    const res = await axios.post(
      `${API_BASE}/rides/fare/calculate`,
      { pickupLocation, destinationLocation },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to calculate fare:", err);
    throw err;
  }
};

// Find nearby drivers
export const getNearbyDrivers = async (lat: number, lng: number) => {
  try {
    const res = await axios.post(
      `${API_BASE}/rides/nearby-drivers`,
      { lat, lng },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to get nearby drivers:", err);
    throw err;
  }
};
