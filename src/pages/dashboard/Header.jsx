import React from "react";
import profile from "../../assets/dashboard/profile.svg";
import notif from "../../assets/dashboard/notif.svg";
import { useLocation } from "react-router-dom";
import { useContract } from "../../contexts/contractContext";
import { truncateWalletAddress } from "../../utils/truncateAddress";

function Header() {
  const location = useLocation();
  const { address } = useContract();
  let title;
  let subtitle;

  if (location.pathname === "/dashboard/1") {
    title = "Register a Land!";
    subtitle =
      "Register Your Land with Ease: Streamline the Process and Secure Your Property Rights with Our Trusted Land Registration Services.";
  } else if (location.pathname === "/dashboard/2") {
    title = "Lease a Property!";
    subtitle =
      "Lease a Property Hassle-Free: Simplify the Process and Safeguard Your Rights with Our Trusted Property Leasing Services.";
  }
  if (location.pathname === "/dashboard/5") {
    title = "Lease a Property!";
    subtitle =
      "Lease a Property Hassle-Free: Simplify the Process and Safeguard Your Rights with Our Trusted Property Leasing Services.";
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col mb-[5.28vh]">
        <h1 className="font-semibold text-[1.43rem] ">{title}</h1>
        <p className="w-[41.3021vw] leading-snug">{subtitle}</p>
      </div>

      <div className="flex gap-[10px] items-center ">
        <div className="text-end">
          <h1 className="font-semibold">Etherlink Testnet</h1>
          <p className="flex items-center gap-[7px] hover:underline hover:text-white/75 cursor-pointer text-[#009FBD]">
            {truncateWalletAddress(address)}
          </p>
        </div>
        <div className="relative">
          <img
            src={profile}
            alt="profile"
            className="w-[5.2vw] h-[5.2vw] rounded-full border-[1.5px] border-dashed border-[#009FBD]"
          />

          <div className="absolute top-0 right-0 w-[25px] h-[25px] rounded-full bg-[#009FBD]">
            <img className="mx-1" src={notif} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
