import React from "react";
import vec from "../../assets/vec.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { STATE } from "../../utils/stateConstants";
import { toast } from "react-toastify";
import { useContract } from "../../contexts/contractContext";
import LoadingSpinner from "../../utils/spinner";

function Prompt() {
  const location = useLocation();
  const navigate = useNavigate();
  const {mintGeoToken, handleStatus, status } = useContract();
  const data = location.state;

  const handleMintToken = async () => {
    handleStatus(STATE.LOADING);

    try {
      await mintGeoToken(data.address, data.parcelNumber);

      navigate("/assets");
      handleStatus(STATE.SUCCESS);

      toast.success("Asset Minted successfully!");
    } catch (err) {
      toast.error(err || "An Error has occured. Please try again.");
      handleStatus(STATE.ERROR);
    }
  };

  document.title = "Geolandmark | Prompt";

  return (
    <div>
      <div className="fixed">
        {status === STATE.LOADING && <LoadingSpinner />}
      </div>
      {status !== STATE.LOADING && (
        <div className="transparent-backdrop">
          <div
            className={`flex justify-center items-center  h-screen w-screen px-[25vw] py-[15vh] overflow-y-none`}
          >
            <div
              className={`relative px-[1.82vw] bg-black w-full h-full bg-opacity-100 rounded-[45.75px] py-[7.031vh] `}
              style={{ fontFamily: "Whyte Inktrap" }}
            >
              <div className="flex justify-center items-center bg-black">
                <div className=" flex flex-col text-white justify-center items-center h-full">
                  <h2 className="text-2xl font-black">
                    Mint Your Asset Token!
                  </h2>
                  <img
                    src={vec}
                    alt=""
                    className="mt-1 w-[10.52vw] h-[1.94vh] "
                  />

                  <div className="mt-12 w-[38.0208vw] text-center text-zinc-400 text-lg font-medium leading-snug">
                    Unlock the full potential of your assets by minting them
                    into tokens on our platform. Experience enhanced liquidity,
                    fractional ownership opportunities, and increased
                    accessibility to the market. Don't miss out on the
                    benefits—mint your asset today!
                  </div>
                  <div
                    className={`flex justify-center items-center w-[15.89vw] h-[5.37vh] text-lg mt-6
                   bg-cyan-600 rounded-lg  cursor-pointer`}
                    onClick={handleMintToken}
                  >
                    
                    Mint
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Prompt;
