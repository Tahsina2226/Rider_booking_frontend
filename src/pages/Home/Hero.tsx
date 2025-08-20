import React, { useState, useEffect } from "react";

const HeroBanner: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex justify-center items-center w-full h-screen min-h-[700px] overflow-hidden">
      {/* Background images */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Color overlay */}
      <div className="absolute inset-0 bg-[#ECEEDF] opacity-90 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#ECEEDF]/70 to-[#ECEEDF]/80"></div>

      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="-top-20 -left-20 absolute bg-[#ECEEDF]/20 rounded-full w-80 h-80"></div>
        <div className="-right-28 -bottom-28 absolute bg-[#ECEEDF]/20 rounded-full w-96 h-96"></div>
        <div className="absolute inset-0 opacity-[0.03] pattern-opacity-100 pattern-size-4 pattern-dots pattern-white"></div>
      </div>

      {/* Main content */}
      <div className="z-10 relative px-6 md:px-8 max-w-5xl text-center">
        {/* Premium badge */}
        <div className="inline-flex justify-center items-center bg-[#ECEEDF]/40 shadow-sm backdrop-blur-sm mb-8 px-6 py-2 border border-[#ECEEDF]/50 rounded-full animate-fade-in-down">
          <span className="bg-[#ECEEDF] mr-2 rounded-full w-2 h-2"></span>
          <span className="font-medium text-[#2A1A0F] text-sm">
            Premium Ride Experience
          </span>
        </div>

        <h1 className="mb-6 font-bold text-5xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up">
          Seamless Ride Booking
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-[#2A1A0F]/90 text-xl md:text-2xl animate-fade-in-up delay-150">
          Experience luxury transportation with our premium ride booking
          service. Fast, reliable, and available 24/7.
        </p>

        <div className="flex sm:flex-row flex-col justify-center gap-4 animate-fade-in-up delay-300">
          <button className="group relative flex justify-center items-center bg-[#ECEEDF] hover:bg-[#D6D8D9] shadow-lg hover:shadow-xl px-8 py-4 border-[#ECEEDF] border-2 rounded-full overflow-hidden font-semibold text-[#2A1A0F] transition-all hover:-translate-y-1 duration-300 transform">
            <span className="z-10 relative flex items-center">
              Book a Ride
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 transform"></div>
          </button>

          <button className="group relative flex items-center bg-transparent hover:bg-[#ECEEDF]/20 px-8 py-4 border-[#ECEEDF]/50 border-2 hover:border-[#ECEEDF] rounded-full font-semibold text-[#2A1A0F] transition-all hover:-translate-y-1 duration-300 transform">
            <span className="z-10 relative flex items-center">
              Learn More
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-16 animate-fade-in-up delay-500">
          {[
            { value: "2min", label: "Average Wait Time" },
            { value: "24/7", label: "Availability" },
            { value: "4.9★", label: "Customer Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#ECEEDF]/40 shadow-sm backdrop-blur-sm p-4 border border-[#ECEEDF]/30 rounded-xl hover:scale-105 transition-all duration-300 transform"
            >
              <div className="font-bold text-[#ECEEDF] text-2xl">
                {stat.value}
              </div>
              <div className="text-[#2A1A0F]/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
          opacity: 0;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .pattern-dots {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;
