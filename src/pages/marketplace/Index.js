import React from "react";
import Market from "./Market";
import Footer from "../landing/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {  
  return (
    <div className="">
      <Market  />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Index;
