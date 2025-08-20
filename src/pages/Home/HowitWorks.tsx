import React, { useState, useEffect } from "react";
import {
  MapPin,
  Car,
  CheckCircle,
  CreditCard,
  Clock,
  UserCheck,
  ChevronRight,
  Play,
  Pause,
  User,
  Shield,
  Star,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "rider" | "driver" | "admin";
  status: "active" | "blocked" | "suspended" | "offline";
}

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) setCurrentUser(JSON.parse(userData));
  }, []);

  const steps = [
    {
      icon: <UserCheck className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Sign Up & Choose Role",
      description:
        "Create an account as a Rider, Driver, or Admin with different permissions.",
      illustration: "📝",
    },
    {
      icon: <Shield className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Secure Authentication",
      description:
        "Login with secure JWT-based authentication or social providers.",
      illustration: "🔒",
    },
    {
      icon: <MapPin className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Choose Pickup & Drop",
      description: "Select your pickup and drop-off locations easily.",
      illustration: "📍",
    },
    {
      icon: <Car className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Select Vehicle Type",
      description: "Choose from Standard, Premium, or Luxury rides.",
      illustration: "🚗",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Confirm Booking",
      description: "Review your ride details and confirm in one click.",
      illustration: "✅",
    },
    {
      icon: <Clock className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Track Driver",
      description: "See your driver en route in real-time on the map.",
      illustration: "📱",
    },
    {
      icon: <CreditCard className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Ride & Payment",
      description: "Pay seamlessly via app or cash as per your choice.",
      illustration: "💳",
    },
    {
      icon: <Star className="w-10 h-10 text-[#8C6A4F]" />,
      title: "Rate & Review",
      description: "Give feedback and help us improve your experience.",
      illustration: "⭐",
    },
  ];

  const roleFeatures = {
    rider: [
      "Request rides with fare estimation",
      "Live ride tracking",
      "Ride history with filters",
      "Multiple payment options",
    ],
    driver: [
      "Online/offline availability toggle",
      "Accept or reject ride requests",
      "Earnings dashboard with charts",
      "Ride management system",
    ],
    admin: [
      "User management system",
      "Ride oversight with filtering",
      "Analytics and data visualization",
      "Platform-wide configuration",
    ],
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <section className="relative bg-[#ECEEDF] min-h-screen overflow-hidden">
      <div className="relative mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-[#2A1A0F] text-4xl md:text-5xl lg:text-6xl">
            How It <span className="text-[#D9C4B0]">Works</span>
          </h2>
          <div className="bg-gradient-to-r from-[#8C6A4F] to-[#D9C4B0] mx-auto mb-6 rounded-full w-24 h-1"></div>
          <p className="mx-auto mb-8 max-w-3xl text-[#475569] text-lg">
            Booking a ride has never been easier. Follow these steps to get
            started.
          </p>
        </div>

        {/* Steps */}
        <div className="flex lg:flex-row flex-col items-center gap-12">
          <div className="relative w-full lg:w-2/5">
            <div className="bg-[#D9C4B0] shadow-2xl p-8 border border-[#8C6A4F] rounded-3xl">
              <div className="relative flex justify-center items-center h-80">
                <div
                  className="z-10 text-8xl transition-all duration-700 transform"
                  style={{ transform: `scale(${1 + activeStep * 0.05})` }}
                >
                  {steps[activeStep].illustration}
                </div>
                <div className="right-0 bottom-4 left-0 absolute flex justify-center space-x-3">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeStep
                          ? "bg-[#D9C4B0] w-8"
                          : "bg-[#8C6A4F]/60"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="top-4 right-4 absolute bg-[#ECEEDF] p-2 border border-[#8C6A4F] rounded-full transition-colors"
                >
                  {autoPlay ? (
                    <Pause className="w-5 h-5 text-[#8C6A4F]" />
                  ) : (
                    <Play className="w-5 h-5 text-[#8C6A4F]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Step content */}
          <div className="w-full lg:w-3/5">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`bg-[#D9C4B0] border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 group ${
                    index === activeStep
                      ? "border-[#8C6A4F] shadow-lg shadow-[#8C6A4F]/20"
                      : "border-[#8C6A4F]/40"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${
                        index === activeStep
                          ? "bg-[#8C6A4F] shadow-md shadow-[#8C6A4F]/30"
                          : "bg-[#8C6A4F]/50 group-hover:bg-[#8C6A4F]/70"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3
                          className={`font-semibold text-lg mb-2 ${
                            index === activeStep
                              ? "text-[#D9C4B0]"
                              : "text-[#2A1A0F]"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === activeStep
                              ? "bg-[#8C6A4F] text-white"
                              : "bg-[#8C6A4F]/60 text-[#2A1A0F]"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <p className="text-[#2A1A0F]/80 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-10">
              <button
                onClick={() =>
                  setActiveStep(
                    (prev) => (prev - 1 + steps.length) % steps.length
                  )
                }
                className="flex items-center bg-[#8C6A4F] hover:bg-[#73553D] px-6 py-3 rounded-xl text-white transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setActiveStep((prev) => (prev + 1) % steps.length)
                }
                className="flex items-center bg-[#8C6A4F] hover:bg-[#73553D] px-6 py-3 rounded-xl text-white transition-colors"
              >
                Next
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Role-based features */}
        {currentUser && (
          <div className="bg-[#D9C4B0] mt-12 p-6 border border-[#8C6A4F] rounded-2xl">
            <h3 className="mb-4 font-bold text-[#2A1A0F] text-2xl">
              {currentUser.role.charAt(0).toUpperCase() +
                currentUser.role.slice(1)}{" "}
              Features
            </h3>
            <ul className="space-y-2 text-[#2A1A0F] list-disc list-inside">
              {roleFeatures[currentUser.role].map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
