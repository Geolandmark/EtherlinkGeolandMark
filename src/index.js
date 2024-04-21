import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import Phone from "./assets/dashboard/smartphone.svg";
import Logo from "./assets/dashboard/logo.svg";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App.js";
import { PropertyProvider } from "./contexts/propertyContext";
import { ContractProvider } from "./contexts/contractContext.js";
import { StepperProvider } from "./contexts/stepperContext";
import { MediaProvider } from "./contexts/mediaContex";



const isSmallAndMedium = window.matchMedia("(max-width: 1024px)").matches;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="bg-black">
    {isSmallAndMedium ? (
      <div className="lg:hidden md:flex flex items-center justify-center bg-[#1E1E1E] h-[100vh] ">
        <div className="flex flex-col justify-evenly items-center h-[100vh]">
          <div className="text-white fornt-bold">
          GeolandMark
            
          </div>
          <img src={Logo} alt="logo" />
          <img src={Phone} alt="smart phone" className="w-[62.2593vw]" />
          <h4 className="font-bold text-[#009FBD] text-center ">
            We apologize for any<br></br> inconvenience caused!
          </h4>
          <div className="flex flex-col justify-center items-center gap-2">
            <h4 className="text-center justify-center text-xs  text-white px-[12vh]">
              The web app is currently not available on Mobile Device.
            </h4>

            <h4 className="text-center justify-center text-xs  text-white px-[12vh]">
              For the best User Experience, we recommend accessing the app on a
              Computer.
            </h4>

            <h4 className="text-center justify-center text-xs  text-white px-[10vh]">
              Thank you for your understanding and we appreciate your patience.
            </h4>
          </div>
        </div>
      </div>
    ) : (
      <div className="lg:block hidden md:hidden">
        <ContractProvider>
          <MediaProvider>
            <PropertyProvider>
              <StepperProvider>
                <App />
              </StepperProvider>
            </PropertyProvider>
          </MediaProvider>
        </ContractProvider>
        <ToastContainer
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        className="z-10"
      />

      </div>
    )}
  </div>
);
