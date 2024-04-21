import React, { useState } from "react";
import blue from "../../assets/blue.svg";
import leftdown from "../../assets/left-down.svg";
import rightdown from "../../assets/right-down.svg";
import leftup from "../../assets/left-up.svg";
import rightup from "../../assets/right-up.svg";
import middleup from "../../assets/middle-up.svg";
import middledown from "../../assets/middle-down.svg";
import quote from "../../assets/quote.svg";
import swiperData from "../../json/swiperData";
import prev from "../../assets/prev.svg";
import next from "../../assets/next.svg";


function PageSix() {
  const [moveRight, setMoveRight] = useState(0);
  const [moveLeft, setMoveLeft] = useState(0);
  const [active, setActive] = useState(0);

  const handleNext = () => {
    if (moveRight === 0) {
      setMoveRight(1);
      setMoveLeft(0);
      setActive(1);
    } else if (moveRight === 1) {
      setMoveRight(2);
      setMoveLeft(1);
      setActive(2);
    } else if (moveRight === 2) {
      setMoveRight(0);
      setMoveLeft(2);
      setActive(0);
    }
    console.log(swiperData[active].name);
  };

  const handlePrev = () => {
    if (moveLeft === 0) {
      setMoveRight(2);
      setMoveLeft(0);
      setActive(2);
    } else if (moveLeft === 1) {
      setMoveRight(0);
      setMoveLeft(1);
      setActive(0);
    } else if (moveLeft === 2) {
      setMoveRight(1);
      setMoveLeft(2);
      setActive(1);
    }
    console.log(swiperData[active].name);
  };

  return (
    <div className="bg-black/95  pt-[11.67vh] pb-[24.91vh] px-[4.17vw] flex flex-col items-center ">
      <h2 className="text-white text-center md:text-start font-black text-xl md:text-[1.875rem]  ">
        What Our Clients Say About Us!
      </h2>
      <img
        src={blue}
        alt=""
        className="mb-[1vh] md:mb-[5.65vh] mx-auto md:mx-0 w-[28.50vw] md:w-auto "
      />
      <p className="text-[#B9B9B9] font-bold text-center mb-[12.5vh] ">
        Real People, Real Experiences: Testimonials from GeoLandmark Users
      </p>
      return (
      <div className="flex items-center justify-center gap-[8.92vw] mb-[7.78vh]  ">
        <div className="w-[15.73vw] h-[31.67vh] relative ">
          <img src={leftdown} alt="" className=" " />
          <img
            src={leftup}
            alt=""
            className=" absolute top-[-1.8519vh] left-[1.0417vw] "
          />
          <div className="absolute flex flex-col items-center top-[1rem] w-full left-[2.6667vw] text-[#B9B9B9] ">
            <img
              src={swiperData[moveLeft].img}
              alt=""
              className="w-[3.95vw] h-[3.95vw] rounded-full "
            />
            <h3 className="font-bold text-sm ">
              {" "}
              {swiperData[moveLeft].name}{" "}
            </h3>
            <h4 className="text-xs ">{swiperData[moveLeft].title}</h4>
            <img src={quote} alt="" className="w-[1.14vw] " />
            <p className="text-[0.625rem] text-center ">
              {swiperData[moveLeft].comment}
            </p>
          </div>
        </div>
        <div className="w-[21.61vw] h-[40.09vh] relative ">
          <img src={middledown} alt="" className=" " />
          <img
            src={middleup}
            alt=""
            className=" absolute top-[0px] left-[-20px] "
          />
          <div className="absolute flex flex-col items-center top-[-1rem] w-full text-[#B9B9B9] ">
            <img
              src={swiperData[active].img}
              alt=""
              className="w-[5.31vw] h-[5.31vw] rounded-full "
            />
            <h3 className="font-bold ">{swiperData[active].name}</h3>
            <h4 className="text-sm ">{swiperData[active].title}</h4>
            <img src={quote} alt="" className="w-[2.14vw] mt-4 " />
            <p className="text-[0.75rem] text-center w-[18.02vw] ">
              {swiperData[active].comment}
            </p>
          </div>
        </div>
        <div className="w-[15.73vw] h-[31.67vh] relative">
          <img src={rightdown} alt="" className=" " />
          <img
            src={rightup}
            alt=""
            className=" absolute top-[-1.8519vh] right-[1.0417vw] "
          />
          <div className="absolute flex flex-col items-center top-[1rem] w-full right-[2.6667vw] text-[#B9B9B9] ">
            <img
              src={swiperData[moveRight].img}
              alt=""
              className="w-[3.95vw] h-[3.95vw] rounded-full "
            />
            <h3 className="font-bold text-sm ">{swiperData[moveRight].name}</h3>
            <h4 className="text-xs ">{swiperData[moveRight].title}</h4>
            <img src={quote} alt="" className="w-[1.14vw] " />
            <p className="text-[0.625rem] text-center ">
              {swiperData[moveRight].comment}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[5.78vw] ">
        <button onClick={handlePrev}>
          <img src={prev} alt="" />
        </button>
        <div className="flex items-center justify-center gap-2">
          <button className={`w-2 h-2 rounded-full bg-white`}></button>
          <button className={`w-2 h-2 rounded-full bg-white`}></button>
          <button className={`w-2 h-2 rounded-full bg-white`}></button>
          <button className={`w-2 h-2 rounded-full bg-white`}></button>
          <button className={`w-2 h-2 rounded-full bg-white`}></button>
        </div>
        <button onClick={handleNext}>
          <img src={next} alt="" />
        </button>
      </div>
    </div>
  );
}

export default PageSix;
