import React, { useState, useEffect } from "react";
import filter from "../../assets/marketplace/filter.svg";
import search from "../../assets/marketplace/search.svg";
import Property from "./Property";
import { useProperty } from "../../contexts/propertyContext";
import Hero from "./Hero";
import { STATE } from "../../utils/stateConstants";
import { useContract } from "../../contexts/contractContext";
import LoadingSpinner from "../../utils/spinner";

function Market() {
  const { activeTab, onActiveTab, onPropertyClick } = useProperty();

  const [fetchedData, setFetchedData] = useState([]);
  const { fetchAllData, handleStatus, status } = useContract();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllData();
        setFetchedData(data.slice().reverse());
      } catch (error) {
        console.error("Error fetching pinned data:", error);
        handleStatus(STATE.ERROR);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <div className="fixed">
        {status === STATE.LOADING && <LoadingSpinner />}
      </div>
      {status === STATE.SUCCESS && (
        <div>
          <Hero />
          <div className="px-[4.17vw] pt-6 pb-[36.30vh] text-white bg-[#1B1B1B]">
            <div className="flex items-center justify-between h-[4.91vh] mb-[7.69vh] ">
              <div className="flex gap-[1.04vw] items-center h-full ">
                <button
                  className={`${
                    activeTab === "All"
                      ? "bg-[#009FBD] text-white"
                      : "border-[1px] border-[#009FBD] text-[#B9B9B9] "
                  }  px-[1.56vw] h-full rounded-[0.625rem] `}
                  onClick={() => onActiveTab("All", "All")}
                >
                  All
                </button>
                <button
                  className={`${
                    activeTab === "Basic"
                      ? "bg-[#009FBD] text-white"
                      : "border-[1px] border-[#009FBD] text-[#B9B9B9] "
                  }   px-[1.56vw] h-full rounded-[0.625rem]  `}
                  onClick={() => onActiveTab("Basic", "Basic")}
                >
                  Tokenzed Asset
                </button>
              </div>
              <div className="h-full flex items-center gap-[0.73vw] ">
                <div className="border-[1px] border-[#009FBD] w-[4.91vh] flex items-center justify-center rounded-sm h-full ">
                  <img src={filter} alt="" className="w-[1.25vw] " />
                </div>
                <div className="bg-[#D9D9D9] h-full w-[20.94vw] rounded-sm flex items-center gap-[0.73vw] pl-[1.04vw] text-black ">
                  <img src={search} alt="" className="w-[1.25vw] " />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="bg-[#D9D9D9] w-full h-full outline-none placeholder:text-black"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-[1.927vw] gap-y-[7.13vh]">
              {fetchedData.map((item) => (
                <Property
                  key={item.id}
                  item={item}
                  activeTab={activeTab}
                  onPropertyClick={onPropertyClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Market;
