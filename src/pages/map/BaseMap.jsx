import React, {useEffect, useState} from "react";
import { BaseMap as Map } from "../../lib/leaflets";
import Navbar from "../landing/Navbar";
import { useContract } from "../../contexts/contractContext";

function BaseMap() {
const { fetchAllData } = useContract()
const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching pinned data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(fetchedData, "2324")
  return (
    <div className="bg-opacity-70 bg-black w-full h-[100vh] px-[4.17vw] py-[3.52vh] flex flex-col justify-center gap-4 ">
      <Navbar />
      <div className="text-center">
        <Map fetchedData={fetchedData} />
      </div>
    </div>
  );
}

export default BaseMap;
