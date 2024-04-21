import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/landing/Index";
import Prompt from "./pages/auth/Prompt";
import MarketIndex from "./pages/marketplace/Index";
import { ContractProvider } from "./contexts/contractContext";
import { useContract } from "./contexts/contractContext";
import ProductDescription from "./pages/marketplace/ProductDescription";
import Dashboard from "./pages/dashboard/Dashboard";
import RegisterLand from "./pages/dashboard/RegisterLand";
import Rent from "./pages/dashboard/Rent";
import Settings from "./pages/dashboard/Settings";
import { DashboardProvider } from "./contexts/dashboardContext";
import BaseMap from "./pages/map/BaseMap";
import { SingleBaseMap } from "./lib/leaflets";

function App() {
  const auth = useContract();

  useEffect(() => {
    const accountWasChanged = (accounts) => {
      const newAddress = accounts[0];
      auth.changeAddress(newAddress);
    };

    const clearAccount = () => {

      auth.setWalletAddress(null); 
      console.log("clearAccount");
    };

    if (window.ethereum) {

      window.ethereum.on("accountsChanged", accountWasChanged);
      window.ethereum.on("disconnect", clearAccount);

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const initialAddress = accounts[0];
          auth.setWalletAddress(initialAddress);
        })
        .catch((error) => {
          console.error("Error requesting accounts:", error);
        });
    } else {
      console.warn("window.ethereum is not available");
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", accountWasChanged);
        window.ethereum.off("disconnect", clearAccount);
      }
    };
  }, [auth.setWalletAddress, auth.changeAddress]);

  if(!auth.address) {
    auth.connectToWallet()
  }

  return (
    <ContractProvider>
      <DashboardProvider>
        <Router>
          <div className="font-whyte">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/prompt" element={<Prompt />} />
              <Route path="/assets" element={<MarketIndex />} />
              <Route path="/map" element={<BaseMap />} />
              <Route path="/assets/:id" element={<ProductDescription />} />
              <Route
                path="/dashboard/1"
                element={
                  <Dashboard>
                    <RegisterLand />
                  </Dashboard>
                }
              />
              <Route
                path="/dashboard/2"
                element={
                  <Dashboard>
                    <Rent />
                  </Dashboard>
                }
              />
              <Route
                path="/dashboard/2"
                element={
                  <Dashboard>
                    <Settings />
                  </Dashboard>
                }
              />
              <Route
                path="/dashboard/5"
                element={
                  <Dashboard>
                    <SingleBaseMap />
                  </Dashboard>
                }
              />
            </Routes>
          </div>
        </Router>
      </DashboardProvider>
    </ContractProvider>
  );
}

export default App;
