import React, { useState, useEffect } from "react";
import { STATE } from "../../utils/stateConstants";
import { useContract } from "../../contexts/contractContext";


function PropertyDetails(props) {
  const [parcel, setParcel] = useState();
  const { status } = useContract();
  console.log(parcel, "uru");

  useEffect(() => {
    setParcel(props.parcel);
  }, [props]);

  const [toggleContent, setToggleContent] = useState("landInformation");

  const handleToggle = (content) => {
    setToggleContent(content);
  };

  return (
    <>
      {status == STATE.SUCCESS && (
        <div className="flex items-center justify-center w-full ">
          <div className="w-full self-start">
            <div className="flex items-center gap-20 font-bold">
              <h1
                className={`text-lg font-black  mb-4  cursor-pointer ${
                  toggleContent === "landInformation"
                    ? "text-[#865DFF]"
                    : "text-[#009FBD]"
                }  `}
                onClick={() => handleToggle("landInformation")}
              >
                Asset Information
              </h1>
              <h1
                className={`text-lg font-black  mb-4 ${
                  toggleContent === "ownerInformation"
                    ? "text-[#865DFF]"
                    : "text-[#009FBD]"
                }  cursor-pointer`}
                onClick={() => handleToggle("ownerInformation")}
              >
                Owner Information
              </h1>
              <h1
                className={`text-lg font-black  mb-4  cursor-pointer  ${
                  toggleContent === "blockchaInInformation"
                    ? "text-[#865DFF]"
                    : "text-[#009FBD]"
                } `}
                onClick={() => handleToggle("blockchaInInformation")}
              >
                Blockchain Information
              </h1>
              <h1
                className={`text-lg font-black  mb-4  cursor-pointer  ${
                  toggleContent === "tokenInformation"
                    ? "text-[#865DFF]"
                    : "text-[#009FBD]"
                } `}
                onClick={() => handleToggle("tokenInformation")}
              >
                Token Information
              </h1>
            </div>
            <div className=" h-1 bg-[#009fbd] bg-opacity-40 "></div>

            <div className="mt-[2.96vh] text-[#B9B9B9] ">
              {toggleContent === "landInformation" && (
                <div>
                  <p className="mb-[3.05vh]">{parcel?.owner.description}</p>
                  <div className="text-uppercase flex justify-start gap-40">
                    <div>
                      <div className="mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-medium text-bold text-lg">
                          Asset Type
                        </h5>
                        <p className="text-[#B9B9B9]">land parcel</p>
                      </div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-medium text-bold  text-lg">
                          Area (SQM)
                        </h5>
                        <p className="text-[#B9B9B9]">{parcel?.owner?.area}</p>
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-medium text-bold text-lg ">
                          Parcel Number
                        </h5>
                        <p className="text-[#B9B9B9]">
                          {parcel?.owner.parcelNumber}
                        </p>
                      </div>
                      <div className="">
                        <h5 className="text-[#865DFF] text-lg text-bold flex items-center gap-2 ">
                          value($)
                        </h5>
                        <p className="text-[#B9B9B9] ">
                          #{parcel?.owner.value}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-[2.13vh] ">
                        <h5 className="text-[#865DFF]  text-lg text-bold flex items-center gap-2 ">
                          Ownership Type
                        </h5>
                        <p className="text-[#B9B9B9] ">
                          {parcel?.owner?.ownershipType}
                        </p>
                      </div>
                      <div className="">
                        <h5 className="text-[#865DFF] font-bold text-lg flex items-center gap-2 ">
                          Address
                        </h5>
                        <p className="text-[#B9B9B9]">
                          {parcel?.owner?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h1
                    className={`text-lg font-black  mb-4  text-white mt-[3.05vh]`}
                    onClick={() => handleToggle("zoningInformation")}
                  >
                    Spatial Coordinates Information
                  </h1>
                  <div className=" h-1 bg-white bg-opacity-40"></div>
                  <div className="flex justify-between mt-[2.13vh]">
                    <div className="flex justify-start w-full gap-12">
                      <div className="flex flex-col mb-[2.13vh] items-center ">
                        <h5 className="text-[#009FBD] font-medium text-sm ">
                          POINTS
                        </h5>
                        {parcel?.landParcel.geographicCoordinates.map(
                          (cord, index) => {
                            const displayIndex = index + 1;

                            return (
                              <p
                                key={index}
                                className="text-lg text-[#B9B9B9] font-bold"
                              >
                                {displayIndex}
                              </p>
                            );
                          }
                        )}
                      </div>
                      <div className="flex flex-col ">
                        <h5 className="text-[#009FBD] font-medium text-sm flex items-center gap-2 ">
                          EASTINGS
                        </h5>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[0]?.point1
                              ?.px
                          }
                        </p>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[1]?.point2
                              ?.px
                          }
                        </p>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[2]?.point3
                              ?.px
                          }
                        </p>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[3]?.point4
                              ?.px
                          }
                        </p>
                      </div>
                      <div className="">
                        <h5 className="text-[#009FBD] font-medium text-sm flex items-center gap-2 ">
                          NORTHINGS
                        </h5>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[0]?.point1
                              ?.py
                          }
                        </p>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[1]?.point2
                              ?.py
                          }
                        </p>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[2]?.point3
                              ?.py
                          }
                        </p>
                        <p className="text-lg text-[#B9B9B9] font-bold ">
                          {
                            parcel?.landParcel?.geographicCoordinates[3]?.point4
                              ?.py
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {toggleContent === "blockchaInInformation" && (
                <div>
                  <div className="flex justify-start gap-40 ">
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Blockchain
                        </h5>
                        <div className="flex flex-row bg-white px-2 rounded-md">
                          <img
                            src="https://testnet-explorer.etherlink.com/assets/network_logo.svg"
                            alt="texos"
                          />
                        </div>
                      </div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Currency Symbol
                        </h5>
                        XTZ
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Sequencer
                        </h5>
                        Decentralized
                      </div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold  text-lg">
                          Security
                        </h5>
                        MEV protection
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          L2 finality time
                        </h5>
                        ~ 750ms
                      </div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold  text-lg">
                          Status
                        </h5>
                        Alive
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Data posted on L1
                        </h5>
                        ~ 15 seconds
                      </div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-bold  text-lg">
                          L1 Chain
                        </h5>
                        Tezos
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              )}
              {toggleContent === "ownerInformation" && (
                <div className="pb-4">
                  <div className="flex  justify-start gap-40">
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg ">
                          Full Name
                        </h5>
                        <p className="text-lg text-[#B9B9B9] ">
                          {parcel?.ownership.title} {parcel?.ownership.fullName}
                        </p>
                      </div>
                      <div className="mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg flex items-center gap-2 ">
                          Email Address
                        </h5>
                        <p className="text-lg text-[#B9B9B9]">
                          --Confidential--
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Place Of Birth
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          --Confidential--
                        </p>
                      </div>

                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Sex
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          {parcel?.ownership?.sex || "null"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          State Of Origin
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          --Confidential--
                        </p>
                      </div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Country
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          {parcel?.ownership?.country || "null"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Occupation
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          {parcel?.ownership?.occupation || "null"}
                        </p>
                      </div>

                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Contact Information
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          --Confidential--
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {toggleContent === "tokenInformation" && (
                <div className="pb-4">
                  <div className="flex  justify-start gap-40">
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg ">
                          Token
                        </h5>
                        <p className="text-lg text-[#B9B9B9] ">GeoToken</p>
                      </div>
                      <div className="mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg flex items-center gap-2 ">
                          TokenId
                        </h5>
                        <p className="text-lg text-[#B9B9B9]">
                          {parcel?.owner.parcelNumber}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          smart contract Address
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          {process.env.REACT_APP_NFT_CONTRACT_ADDRESS}
                        </p>
                      </div>

                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          Token Symbol
                        </h5>
                        <p className="texttext-[#B9B9B9] ">GTK</p>
                      </div>
                    </div>
                    <div>
                      <div className=" mb-[2.13vh] ">
                        <h5 className="text-[#865DFF] font-bold text-lg">
                          token URI
                        </h5>
                        <p className="texttext-[#B9B9B9] ">
                          {props.tokenURI}
                        </p>
                      </div>

                     
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyDetails;
