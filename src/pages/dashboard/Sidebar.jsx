import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import home from "../../assets/dashboard/home.svg";
import { Link } from "react-router-dom";
import logo from "../../assets/dashboard/logo.svg";
import logo2 from "../../assets/dashboard/logo2.svg";
import collapse from "../../assets/dashboard/collapse.svg";
import expand from "../../assets/dashboard/expand.svg";
import market from "../../assets/dashboard/market.svg";
import reg from "../../assets/dashboard/register.svg";
import rent from "../../assets/dashboard/rent.svg";
import history from "../../assets/dashboard/history.svg";
import settings from "../../assets/dashboard/settings.svg";
import logout from "../../assets/dashboard/logout.svg";
import Settings from "./Settings";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();

  const handleTabClick = (id) => {
    setActiveTab(id);
    if (id === 1) {
      navigate(`/assets`);
    } else if (id === 2) {
      navigate(`/dashboard/1`);
    } else if (id === 3) {
      navigate(`/dashboard/1`);
    } else if (id === 4) {
      navigate(`/dashboard/1`);
    } else if (id === 5) {
      navigate(`/dashboard/1`);
    } else if (id === 6) {
      navigate(`/dashboard/1`);
    }
  };

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const navItems = [
    {
      id: 1,
      name: "Home",
      icon: home,
      disable: false,
    },
    {
      id: 2,
      name: "Register a Land",
      icon: reg,
      disable: true,
    },
    {
      id: 3,
      name: "Rent / Lease",
      icon: rent,
      disable: true,
    },
    {
      id: 4,
      name: "History",
      icon: history,
      disable: true,
    },
    {
      id: 5,
      name: "Settings",
      icon: settings,
      disable: true,
    },
  ];

  return (
    <div className=" relative flex flex-col justify-between h-full  ">
      {isExpanded ? (
        <Link to="/assets">
          <img src={logo2} alt="" className=" mb-[8.75vh] w-[17.45vw] " />
        </Link>
      ) : (
        <Link to="/assets">
          <img src={logo} alt="" className="mb-[8.75vh] w-[2.08vw] " />
        </Link>
      )}
      <div className="w-full flex flex-col gap-[3.43vh]">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-[1.0417vw] py-[0.83vh] px-[0.47vw] rounded-sm ${
              activeTab === item.id ? "bg-[#009FBD]" : "bg-none"
            }
            ${item.disable === true ? "cursor-not-allowed" : "cursor-pointer"}
            `}
            onClick={() => handleTabClick(item.id)}
          >
            <img src={item.icon} alt="" />
            {isExpanded && (
              <h6
                className={`${activeTab ? "text-white" : "text-[#B9B9B9] "}
              ${item.disable === true ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {item.name}
              </h6>
            )}
          </div>
        ))}

        <img
          src={isExpanded ? collapse : expand}
          alt=""
          className="absolute right-[-22px] top-[10vh] "
          onClick={handleExpand}
        />
      </div>
      <div
        className={`flex items-center gap-[1.0417vw] py-[0.83vh] px-[0.47vw] rounded-sm `}
      >
        <img src={logout} alt="" />
        {isExpanded && <h6 className={` text-[#B9B9B9] `}>Logout</h6>}
      </div>
    </div>
  );
};

export default Sidebar;
