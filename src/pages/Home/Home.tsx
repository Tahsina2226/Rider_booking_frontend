import React from "react";
import HeroBanner from "./Hero";
import HowItWorks from "./HowitWorks";
import RideOptions from "./Rides";
export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <HowItWorks></HowItWorks>
      <RideOptions></RideOptions>
    </div>
  );
}
