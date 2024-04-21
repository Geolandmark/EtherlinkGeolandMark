import React from "react";
import Navbar from "./Navbar";


function Hero() {
  return (
    <div
      className=" h-screen bg-no-repeat bg-cover bg-center relative text-white "
      style={{
        backgroundImage: `url('https://i.ibb.co/Gtp4xPN/landingpageheronew.png')`,
      }}
    >
      <div className="bg-opacity-70 bg-black w-full h-full px-[4.17vw] pt-[3.52vh]">
        <Navbar />
        <div className="md:mt-[40vh] mt-[54.35vh] text-center flex flex-col items-center justify-center gap-[6.58vh] ">
          <h1 className=" md:text-[2.66rem] text-[1.375rem] font-bold leading-tight">
            Revolutionize Land Registration and <br /> Asset Management with
            GeoLandmark!
          </h1>
          <p className="md:text-xl text-sm  ">
            Empowering Land Owners <br /> with Secure Asset Tokenization
          </p>
          <div className="flex gap-2 bg-white px-2 py-2 rounded-md">
            <div className="text-black text-lg text-bold">Powered by</div>
            <img
              src="https://testnet-explorer.etherlink.com/assets/network_logo.svg"
              alt="texos"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
