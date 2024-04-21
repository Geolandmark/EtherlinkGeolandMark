import React from "react";
import hero from "../../assets/market-hero.svg";
import Navbar from "../landing/Navbar";
import { BaseMap } from "../../lib/leaflets";

function Hero() {
  return (
    <div
      className="w-full relative text-white py-[3.52vh] px-[4.17vw]"
    >
        <Navbar />
    </div>
  );
}

export default Hero;
