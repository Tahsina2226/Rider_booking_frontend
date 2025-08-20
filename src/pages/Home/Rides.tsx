import React, { useState } from "react";

interface RideOption {
  id: number;
  name: string;
  description: string;
  pricePerMile: number;
  baseFare: number;
  features: string[];
  icon: string;
  color: string;
  estimatedArrival: string;
  capacity: number;
}

interface Location {
  name: string;
  address: string;
}

const RideOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [pickupLocation, setPickupLocation] = useState<Location>({
    name: "Current Location",
    address: "",
  });
  const [destination, setDestination] = useState<Location>({
    name: "",
    address: "",
  });
  const [distance, setDistance] = useState<number>(5.2);
  const [rideTime, setRideTime] = useState<number>(15);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  const rideOptions: RideOption[] = [
    {
      id: 1,
      name: "Economy",
      description:
        "Affordable, everyday rides for your daily commute and short trips.",
      pricePerMile: 0.99,
      baseFare: 2.5,
      features: [
        "4-door sedan",
        "Up to 4 passengers",
        "Standard comfort",
        "Quick pickup",
      ],
      icon: "🚗",
      color: "#ECEEDF",
      estimatedArrival: "5 min",
      capacity: 4,
    },
    {
      id: 2,
      name: "Premium",
      description:
        "Arrive in style with top-rated drivers and luxury vehicles.",
      pricePerMile: 1.89,
      baseFare: 5.0,
      features: [
        "Luxury vehicles",
        "Top-rated drivers",
        "Complimentary water",
        "Phone chargers",
      ],
      icon: "✨",
      color: "#D9C4B0",
      estimatedArrival: "7 min",
      capacity: 4,
    },
    {
      id: 3,
      name: "XL Van",
      description:
        "Room for your whole group and luggage for airport trips or group outings.",
      pricePerMile: 1.49,
      baseFare: 3.5,
      features: [
        "6-8 passenger vans",
        "Extra luggage space",
        "Comfort for groups",
        "Airport friendly",
      ],
      icon: "🚐",
      color: "#ECEEDF",
      estimatedArrival: "10 min",
      capacity: 6,
    },
    {
      id: 4,
      name: "Express Pool",
      description:
        "The most affordable way to travel by sharing your ride with others heading the same way.",
      pricePerMile: 0.69,
      baseFare: 1.5,
      features: [
        "Most affordable option",
        "Eco-friendly choice",
        "Shared route",
        "Short walks may be required",
      ],
      icon: "👥",
      color: "#D9C4B0",
      estimatedArrival: "3 min",
      capacity: 4,
    },
  ];

  const selectedRide = rideOptions.find(
    (option) => option.id === selectedOption
  );

  const calculateFare = () => {
    if (!selectedRide) return 0;
    const fare = selectedRide.baseFare + selectedRide.pricePerMile * distance;
    return promoApplied ? fare * 0.9 : fare; // 10% discount
  };

  const handleBookRide = () => {
    setIsBooking(true);
    setBookingStep(2);
    setTimeout(() => {
      setBookingStep(3);
    }, 3000);
  };

  const applyPromoCode = () => {
    if (promoCode === "RIDE20") {
      setPromoApplied(true);
    }
  };

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-gradient-to-br from-[#ECEEDF] to-[#D9C4B0] px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">
            Book Your Ride
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-xl">
            Choose the perfect ride option for your journey
          </p>
        </div>

        <div className="flex lg:flex-row flex-col gap-8">
          {/* Ride Options Panel */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-lg mb-6 p-6 rounded-2xl">
              <h2 className="mb-4 font-bold text-gray-800 text-2xl">
                Where to?
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center items-center bg-green-100 mr-4 rounded-full w-8 h-8">
                    <span className="bg-green-500 rounded-full w-2 h-2"></span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="bg-transparent p-0 border-none focus:ring-0 w-full"
                      placeholder="Enter pickup location"
                      value={pickupLocation.address}
                      onChange={(e) =>
                        setPickupLocation({
                          ...pickupLocation,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-center items-center bg-red-100 mr-4 rounded-full w-8 h-8">
                    <span className="bg-red-500 rounded-full w-2 h-2"></span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="bg-transparent p-0 border-none focus:ring-0 w-full"
                      placeholder="Enter destination"
                      value={destination.address}
                      onChange={(e) =>
                        setDestination({
                          ...destination,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">
                  Distance: {distance.toFixed(1)} miles
                </span>
                <span className="text-gray-600">
                  Time: {formatTime(rideTime)}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={distance}
                onChange={(e) => {
                  setDistance(parseFloat(e.target.value));
                  setRideTime(parseFloat(e.target.value) * 3 + 5);
                }}
                className="bg-gray-300 rounded-lg w-full h-2 appearance-none cursor-pointer"
              />
            </div>

            <h2 className="mb-4 font-bold text-gray-800 text-2xl">
              Choose your ride
            </h2>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              {rideOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform ${
                    selectedOption === option.id
                      ? "ring-2 ring-gray-500 scale-[1.02]"
                      : "hover:scale-[1.02]"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div
                    style={{ backgroundColor: option.color }}
                    className="flex justify-between items-center px-6 py-4"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-2xl">{option.icon}</span>
                      <h3 className="font-bold text-gray-900 text-xl">
                        {option.name}
                      </h3>
                    </div>
                    <div className="font-semibold text-gray-900">
                      $
                      {(
                        option.baseFare +
                        option.pricePerMile * distance
                      ).toFixed(2)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500">Est. arrival</span>
                      <span className="font-semibold">
                        {option.estimatedArrival}
                      </span>
                    </div>

                    <p className="mb-4 text-gray-600 text-sm">
                      {option.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="mb-2 font-semibold text-gray-800">
                        Features:
                      </h4>
                      <ul className="space-y-1">
                        {option.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="mr-2 text-green-500">✓</span>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg
                          className="mr-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                        Up to {option.capacity} people
                      </div>

                      <button
                        className={`py-2 px-4 rounded-lg font-semibold transition-colors text-sm ${
                          selectedOption === option.id
                            ? "bg-[#D9C4B0] text-white hover:opacity-90"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {selectedOption === option.id ? "Selected" : "Select"}
                      </button>
                    </div>
                  </div>

                  {selectedOption === option.id && (
                    <div className="top-4 right-4 absolute">
                      <div className="flex justify-center items-center bg-gray-500 rounded-full w-6 h-6">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary Panel */}
          <div className="w-full lg:w-1/3">
            <div className="top-6 sticky bg-white shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#ECEEDF] to-[#D9C4B0] p-6 text-gray-900">
                <h2 className="mb-2 font-bold text-2xl">Ride Summary</h2>
                <p className="opacity-90">Review your trip details</p>
              </div>

              <div className="p-6">
                {selectedRide && (
                  <>
                    <div className="flex items-center mb-6">
                      <span className="mr-4 text-3xl">{selectedRide.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg">
                          {selectedRide.name}
                        </h3>
                        <p className="text-gray-500">
                          Est. arrival: {selectedRide.estimatedArrival}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance</span>
                        <span className="font-semibold">
                          {distance.toFixed(1)} miles
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Base fare</span>
                        <span className="font-semibold">
                          ${selectedRide.baseFare.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance fare</span>
                        <span className="font-semibold">
                          ${(selectedRide.pricePerMile * distance).toFixed(2)}
                        </span>
                      </div>

                      {promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Promo discount (10%)</span>
                          <span className="font-semibold">
                            -${(calculateFare() * 0.1).toFixed(2)}
                          </span>
                        </div>
                      )}

                      <div className="mt-2 pt-4 border-t">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${calculateFare().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 font-semibold text-gray-800">
                        Promo Code
                      </h4>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 focus:border-transparent rounded-l-lg focus:outline-none focus:ring-[#D9C4B0] focus:ring-2"
                        />
                        <button
                          onClick={applyPromoCode}
                          disabled={promoApplied}
                          className={`px-4 py-2 rounded-r-lg font-semibold ${
                            promoApplied
                              ? "bg-green-500 text-white"
                              : "bg-[#D9C4B0] text-white hover:opacity-90"
                          }`}
                        >
                          {promoApplied ? "Applied" : "Apply"}
                        </button>
                      </div>
                    </div>

                    {isBooking ? (
                      <div className="text-center">
                        {bookingStep === 2 ? (
                          <div className="py-4">
                            <div className="inline-flex justify-center items-center mb-4">
                              <div className="border-gray-900 border-t-2 border-r-2 rounded-full w-8 h-8 animate-spin"></div>
                            </div>
                            <p className="text-gray-600">
                              Finding your driver...
                            </p>
                          </div>
                        ) : (
                          <div className="py-4">
                            <div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
                              <svg
                                className="w-8 h-8 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            </div>
                            <h3 className="mb-2 font-bold text-lg">
                              Ride Booked!
                            </h3>
                            <p className="text-gray-600">
                              Your driver will arrive in{" "}
                              {selectedRide.estimatedArrival}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={handleBookRide}
                        className="bg-[#D9C4B0] hover:opacity-90 shadow-lg px-4 py-3 rounded-lg w-full font-bold text-white transition-colors"
                      >
                        Confirm and Book Ride
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideOptions;
