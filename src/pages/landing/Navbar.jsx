import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ProfilePic from "../../assets/user.svg";
import { useContract } from "../../contexts/contractContext";
import { truncateWalletAddress } from "../../utils/truncateAddress";
import axios from "axios";

function Navbar() {
  const location = useLocation();
  const { connectToWallet, walletAddress, isWalletConnected, address } = useContract();

  const [activeButton, setActiveButton] = useState();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const getKYCtoken = async () => {
    try {
      const options = {
        method: 'POST',
        url: 'http://localhost:4000/api/getToken',
        headers: {
          'Content-Type': 'application/json', 
        },
        data: {
          address: walletAddress, 
        },
      };

      const response = await axios(options);
      console.log(response.data); 
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  

  return (
    <nav className="flex items-center justify-between w-full">
      <Link to="/">
        <img src={logo} className="md:h-[7.41vh] h-[3.79vh]" alt="logo" />
      </Link>
      {location.pathname === "/" ? (
        <Link to="/map">
          <button className="bg-[#009FBD] font-bold w-[21.79vw] md:w-[10.42vw] h-[3.01vh] md:h-[4.72vh] md:rounded-[0.53rem] rounded-[0.22rem] md:text-sm text-xs hover:bg-opacity-75">
            Get Started!
          </button>
        </Link>
      ) : (
        <div className="flex items-end gap-4">
          {address !== null ? (
            <div className="flex items-center gap-4 text-white">
              <Link to="/map">
                <button
                  className={`w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ${activeButton === "map" ? "text-cyan-600" : ""}`}
                  onClick={() => handleButtonClick("map")}
                >
                  Map
                </button>
              </Link>
              <Link to="/assets">
                <button
                  className={`w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ${activeButton === "marketplace" ? "text-cyan-600" : ""}`}
                  onClick={() => handleButtonClick("marketplace")}
                >
                  Assets
                </button>
              </Link>
              <Link to="/dashboard/1">
                <button
                  onClick={() => {
                    handleButtonClick("dashboard");
                    getKYCtoken();
                  }}
                  className={`w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ${activeButton === "dashboard" ? " text-cyan-600" : ""}`}
                >
                  Dashboard
                </button>
              </Link>
              <p className="text-base font-bold text-cyan-600 cursor-pointer">
                {truncateWalletAddress(address)}
              </p>
              <img
                src={ProfilePic}
                alt="profile"
                className="w-[3.4896vw] border border-full bg-stone-950 border-dashed rounded-full border-cyan-600"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 text-white">
              <Link to="/map">
                <button
                  className={`w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ${activeButton === "map" ? " text-cyan-600" : ""}`}
                  onClick={() => handleButtonClick("map")}
                >
                  Map
                </button>
              </Link>
              <Link to="/assets">
                <button
                  className={`w-[8.5vw] h-[3.3vh] text-base rounded-[7px] font-bold ${activeButton === "marketplace" ? "text-cyan-600" : ""}`}
                  onClick={() => handleButtonClick("marketplace")}
                >
                  Assets
                </button>
              </Link>
              <button onClick={connectToWallet}>
                <h1 className="bg-[#009FBD] font-bold w-[21.79vw] md:w-[8.28vw] h-[3.01vh] md:h-[4.72vh] md:rounded-[0.53rem] rounded-[0.22rem] md:text-sm text-xs hover:bg-opacity-75 flex items-center justify-center">
                  Connect Wallet
                </h1>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
