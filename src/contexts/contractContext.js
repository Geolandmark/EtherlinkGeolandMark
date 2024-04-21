import { useState, useContext, createContext, useRef } from "react";
import Web3 from "web3";
import abi1 from "../contractFIle/AssetRegistry.json";
import abi2 from "../contractFIle/GeoToken.json";
import { pinAssetOnIPFs, retrieveDataFromPinata } from "../services/pinata";
import { STATE } from "../utils/stateConstants";

const ContractContext = createContext();
export const ContractProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const walletAddressRef = useRef(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isTxn, setIsTxn] = useState(false);
  const [onChainData, setOnchainData] = useState();
  const [status, setStatus] = useState(STATE.IDLE);

  const handleStatus = (state) => {
    setStatus(state);
  };

  const onChainStatus = (status) => {
    setIsTxn(status);
  };
  const handleChainData = (data) => {
    setOnchainData(data);
  };

  const web3 = new Web3(window.ethereum);

  walletAddressRef.current = localStorage.getItem("walletAddress");

  const changeAddress = () => {
    walletAddressRef.current = localStorage.getItem("walletAddress");
  };

  const initUser = async (data) => {
    setUser(data.user);
    setToken(data.auth);
    runLogoutTimer(data.auth.expiryInSeconds * 1000);
    data.auth.expiryDate =
      new Date().getTime() + data.auth.expiryInSeconds * 1000;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...data,
      })
    );
  };
  function runLogoutTimer(time) {
    setTimeout(() => {
      logout();
    }, time);
  }
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const setAddress = (address) => {
    setWalletAddress(address);
  };

  const assetContractAddress = process.env.REACT_APP_ASSET_CONTRACT_ADDRESS;
  const nftContractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

  const contractInstance1 = new web3.eth.Contract(
    abi1.abi,
    assetContractAddress
  );
  const contractInstance2 = new web3.eth.Contract(abi2.abi, nftContractAddress);

  const saveParcelAssetOnchain = async (data) => {
    const ipfs = await pinAssetOnIPFs(data);
    try {
      const tx = await contractInstance1.methods
        .saveParcelInformation(
          data.ownership.address,
          data.owner.parcelNumber,
          ipfs.Timestamp,
          ipfs.IpfsHash,
          false,
          `https://${ipfs.IpfsHash}`
        )
        .send({ from: data.ownership.address, type: 0 });
      return tx;
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  };

  const fetchDataByParcelId = async (address, parcelId) => {
    handleStatus(STATE.LOADING);
    try {
      const result = await contractInstance1.methods
        .getParcelByParcelId(address, parcelId)
        .call();
      const data = await retrieveDataFromPinata(result.ipfsHash);
      handleStatus(STATE.SUCCESS);

      return data;
    } catch (error) {
      console.error("Error fetching data from blockchain:", error);
      handleStatus(STATE.ERROR);

      throw error;
    }
  };
  const fetchIpfsHashByParcelId = async (address, parcelId) => {
    try {
      const result = await contractInstance1.methods
        .getSingleParcelIpfsHash(address, parcelId)
        .call();

      return result;
    } catch (error) {
      console.error("Error fetching data from blockchain:", error);
      throw error;
    }
  };

  const mintGeoToken = async (address, parcelId) => {
    try {
      const cid = await fetchIpfsHashByParcelId(address, parcelId);
      const url = `${process.env.REACT_APP_PINATA_GATEWAY_URL}/ipfs/${cid}?pinataGatewayToken=${process.env.REACT_APP_PINATA_GATEWAY_TOKEN}`;
      const tx = await contractInstance2.methods
        .safeMint(address, parcelId, url)
        .send({ from: address, type: 0 });

      return tx;
    } catch (error) {
      console.error("Error sending transaction:..", error);
      throw error;
    }
  };

  const fetchAllData = async () => {
    let data = [];
    try {
      handleStatus(STATE.LOADING);

      const result = await contractInstance1.methods.getAllParcels().call();

      if (Array.isArray(result)) {
        const promiseArray = result.map(async (item, index) => {
          const allData = await retrieveDataFromPinata(item);
          handleStatus(STATE.SUCCESS);
          return allData.data;
        });

        const resolvedData = await Promise.all(promiseArray);

        data = [...data, ...resolvedData];

        return data;
      }
    } catch (error) {
      console.error("Error fetching data from blockchain:", error);
      throw error;
    }
  };

  const fetchMapData = async () => {
    let data = [];
    try {
      handleStatus(STATE.LOADING);

      const result = await contractInstance1.methods.getAllParcels().call();

      if (Array.isArray(result)) {
        const promiseArray = result.map(async (item, index) => {
          const allData = await retrieveDataFromPinata(item);
          handleStatus(STATE.SUCCESS);
          return allData.data;
        });

        const resolvedData = await Promise.all(promiseArray);

        data = [...data, ...resolvedData];

        return data;
      }
    } catch (error) {
      console.error("Error fetching data from blockchain:", error);
      throw error;
    }
  };

  const getTokenURI = async (tokenId) => {
    try {
      const result = await contractInstance2.methods.tokenURI(tokenId).call();

      handleStatus(STATE.SUCCESS);

      return result;
    } catch (error) {
      console.error("Error fetching data from blockchain:", error);
      handleStatus(STATE.ERROR);

      throw error;
    }
  };

  const connectToWallet = async () => {
    setIsWalletConnected(false);

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();

        const selectedAccount = accounts[0];

        setWalletAddress(selectedAccount);

        localStorage.setItem("walletAddress", selectedAccount);

        setIsWalletConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        return null;
      }
    } else {
      console.error("No compatible wallet provider detected");
      return null;
    }
  };

  const disconnectWallet = async () => {
    try {
      if (web3.currentProvider && web3.currentProvider.close) {
        await web3.currentProvider.close();
        console.log("Wallet disconnected successfully");

        setWalletAddress(null);
        walletAddressRef.current = null;
        localStorage.removeItem("walletAddress");
        console.log("Wallet address removed from local storage");
      } else {
        console.warn("Provider does not support disconnecting");
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        initUser,
        logout,
        user,
        setUser,
        userData,
        setUserData,
        connectToWallet,
        walletAddress,
        setAddress,
        isWalletConnected,
        setIsWalletConnected,
        saveParcelAssetOnchain,
        address: walletAddressRef.current,
        changeAddress,
        fetchDataByParcelId,
        fetchAllData,
        mintGeoToken,
        onChainStatus,
        isTxn,
        handleChainData,
        onChainData,
        handleStatus,
        status,
        fetchMapData,
        disconnectWallet,
        getTokenURI,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
export const useContract = () => useContext(ContractContext);
