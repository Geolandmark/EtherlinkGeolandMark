import React, { createContext, useContext, useState } from "react";
import propertyData from "../json/propertyData.js";
import { STATE } from "../utils/stateConstants.js";
import { toast } from "react-toastify";
import { getSingleRegisteredLands } from "../services/landRegistry.js";
import abi from "../contractFIle/AssetRegistry.json";
import Web3 from "web3";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [category, setCategory] = useState("All");
  const web3 = new Web3("https://node.ghostnet.etherlink.com");
  const contractAddress = "";

  const contractInstance = new web3.eth.Contract(abi.abi, contractAddress);

  const onActiveTab = (activeTab, category) => {
    setActiveTab(activeTab);
    setCategory(category);
  };

  const [showParent, setShowParent] = useState(true);
  const [singleSelection, setSingleSelection] = useState(null);
  const [showProperty, setShowProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propData, setPropData] = useState(propertyData);
  const [propertyId, setPropertyId] = useState(null);
  const [status, setStatus] = useState(STATE.IDLE);

  const selectedPropertyData = propData.find(
    (property) => property.id === selectedProperty?.id
  );

  const onPropertyClick = (id) => {
    setShowProperty(true);
    setShowParent(false);
    setSelectedProperty(id);
  };

  const onBackClick = () => {
    setShowProperty(false);
    setShowParent(true);
  };

  const handleSingleSelection = (data) => {
    setSingleSelection(data);
  };

  const fetchSingleRegistry = async (id) => {
    setStatus(STATE.LOADING);
    try {
      const response = await getSingleRegisteredLands(id);
      setSingleSelection(response.data.data.records);
      setStatus(STATE.SUCCESS);
    } catch (err) {
      if (err.response.status === 401) {
        toast.info("Session Expired. Please Login.");
      } else {
        toast.error(err?.message);
        console.log(err);
        setStatus(STATE.ERROR);
        return;
      }
    }
  };

  const getWalletInformation = async (address) => {
    try {
      const ownerInfo = await contractInstance.methods
        .getOwnerInformation("0x48C3762fF86e96559b5C09047b1Df5882160eB4C")
        .call();
      return ownerInfo;
    } catch (error) {
      console.error("Retrieve owner information error:", error);
      throw error;
    }
  };

  const saveOwnerOnchain = async ({ ownership }) => {
    try {
      const tx = await contractInstance.methods
        .saveWalletInformation(
          "0x48C3762fF86e96559b5C09047b1Df5882160eB4C",
          ownership.title,
          ownership.fullName,
          ownership.sex,
          ownership.mobileNumber,
          ownership.emailAddress,
          ownership.occupation,
          ownership.dateOfBirth,
          ownership.placeOfBirth,
          ownership.country,
          ownership.stateOfOrigin
        )
        .send({ from: "0x48C3762fF86e96559b5C09047b1Df5882160eB4C" });

      console.log("Transaction sent:", tx);
      return tx;
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        activeTab,
        setActiveTab,
        onActiveTab,
        category,
        setCategory,
        showParent,
        setShowParent,
        showProperty,
        setShowProperty,
        selectedProperty,
        setSelectedProperty,
        propData,
        setPropData,
        selectedPropertyData,
        onPropertyClick,
        onBackClick,
        handleSingleSelection,
        singleSelection,
        setPropertyId,
        propertyId,
        fetchSingleRegistry,
        handleSingleSelection,
        status,
        saveOwnerOnchain,
        getWalletInformation,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  return useContext(PropertyContext);
};
