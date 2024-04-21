import React, { useEffect, useState } from "react";
import Index from "./Index";
import vec from "../../assets/vec.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { signin } from "../../services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";
import { STATE } from "../../utils/stateConstants";
import Lock from "../../assets/lock.svg";
import EyeHide from "../../assets/eyeslash.svg";
import EyeUnhide from "../../assets/eye.svg";
import Messages from "../../assets/messages1.svg";
import { Link } from "react-router-dom";
import SumsubWebSdk from "@sumsub/websdk-react";
import snsWebSdk from "@sumsub/websdk";

export default function AppSignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [status, setStatus] = useState(STATE.IDLE);

  const path = location.pathname;
  const auth = useAuth();

  const handleLogin = async (values, methods) => {
    try {
      setStatus(STATE.LOADING);
      console.log(values, "vae");
      const response = await signin(values);
      setStatus(STATE.SUCCESS);
      console.log(response);
      if (response.data.success && !response.data.data) {
        toast.success(response.data.message);
        return;
      }
      await auth.initUser(response.data.data);
      console.log(response, "ress");

      navigate("/assets");
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setStatus(STATE.ERROR);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Minimum of 3")
        .required("Password is required"),
    }),
    onSubmit: (values, methods) => {
      handleLogin(values, methods);
    },
  });

  document.title = "Geolandmark | Login";

  return (
    <Index path={path}>
      <div id="sumsub-websdk-container"></div>

      <div className="flex flex-col text-white justify-center items-center">
        <h2 className="text-2xl font-black">Log In!</h2>
        <img src={vec} alt="" className="mt-2 w-[10.52vw] h-[1.94vh] " />
        <p className="text-[#B9B9B9] px-[17.676vw text-center font-bold mt-2 leading-tight text-sm w-[55vw]">
          Log In to your GeoLandmark Account! <br></br>
          Gain access to a range of features and tools that simplify land
          registration and management.
        </p>
        <form
          onSubmit={formik.handleSubmit}
          onChange={formik.handleChange}
          className="flex flex-col mt-4 gap-6 items-center"
        >
          <div className="flex flex-col gap-4 justify-around items-center h-[35vh]  ">
              <div className="flex flex-col w-[28.176vw]">
                <label
                  htmlFor="email"
                  className="mb-1 text-base  font-bold text-[#B9B9B9]"
                >
                  E-mail Address
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                  ${
                    !formik.errors?.email && formik.touched?.email
                      ? "focus:border-cyan-600"
                      : ""
                  }
                    ${
                      formik.errors?.email && formik.touched?.email
                        ? "border-[#C63737] border-[1.5px]"
                        : "border-[rgba(18,18,18,0.3)]"
                    }`}
                >
                  <img src={Messages} alt="" className="w-[1.25vw] " />

                  <input
                    id="first_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="E-mail Address"
                    type="email"
                    name="email"
                    className={`py-2 rounded-lg bg-zinc-300 w-[25vw] text-black
                `}
                    style={{ outline: "none" }}
                  />
                </div>
                <div
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "inline-block text-red-600"
                      : "hidden"
                  } `}
                >
                  {formik.touched.email &&
                    formik.errors.email &&
                    formik.errors.email}
                </div>
              </div>

              <div className="relative flex flex-col w-[28.176vw]">
                <label
                  htmlFor="password"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  Password.
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                   `}
                >
                  <img src={Lock} alt="" className="w-[1.25vw] " />
                  <input
                    required
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password."
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="py-2 rounded-lg bg-zinc-300 w-[23vw] text-black"
                    style={{ outline: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? EyeHide : EyeUnhide}
                      alt=""
                      className="w-[1.65vw]"
                    />
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-[28.176vw]">
                <label
                  htmlFor="email"
                  className="mb-1 text-base  font-bold text-[#B9B9B9]"
                >
                  E-mail Address
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                  ${
                    !formik.errors?.email && formik.touched?.email
                      ? "focus:border-cyan-600"
                      : ""
                  }
                    ${
                      formik.errors?.email && formik.touched?.email
                        ? "border-[#C63737] border-[1.5px]"
                        : "border-[rgba(18,18,18,0.3)]"
                    }`}
                >
                  <img src={Messages} alt="" className="w-[1.25vw] " />

                  <input
                    id="first_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="E-mail Address"
                    type="email"
                    name="email"
                    className={`py-2 rounded-lg bg-zinc-300 w-[25vw] text-black
                `}
                    style={{ outline: "none" }}
                  />
                </div>
                <div
                  className={`${
                    formik.touched.email && formik.errors.email
                      ? "inline-block text-red-600"
                      : "hidden"
                  } `}
                >
                  {formik.touched.email &&
                    formik.errors.email &&
                    formik.errors.email}
                </div>
              </div>

              <div className="relative flex flex-col w-[28.176vw]">
                <label
                  htmlFor="password"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  Password.
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                   `}
                >
                  <img src={Lock} alt="" className="w-[1.25vw] " />
                  <input
                    required
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password."
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="py-2 rounded-lg bg-zinc-300 w-[23vw] text-black"
                    style={{ outline: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? EyeHide : EyeUnhide}
                      alt=""
                      className="w-[1.65vw]"
                    />
                  </button>
                </div>
              </div>
              <div className="relative flex flex-col w-[28.176vw]">
                <label
                  htmlFor="password"
                  className="mb-1 text-lg  font-bold text-[#B9B9B9]"
                >
                  Password.
                </label>
                <div
                  className={`flex w-[28.176vw] justify-around rounded-lg bg-zinc-300 h-[5.91vh]
                   `}
                >
                  <img src={Lock} alt="" className="w-[1.25vw] " />
                  <input
                    required
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password."
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="py-2 rounded-lg bg-zinc-300 w-[23vw] text-black"
                    style={{ outline: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? EyeHide : EyeUnhide}
                      alt=""
                      className="w-[1.65vw]"
                    />
                  </button>
                </div>
              </div>

          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              type="submit"
              className="w-[11.2500vh] h-[5.3704vh] bg-cyan-600 bg-opacity-40 rounded-[10px] text-xs"
            >
              proceed..
            </button>
            <Link to="/register">
              <span className="text-zinc-400 text-base font-medium leading-snug">
                Don’t have an Account yet?
              </span>
              <span className="text-cyan-600 text-bae font-medium leading-snug cursor-pointer">
                {` `}
                Sign Up
              </span>
            </Link>
          </div>
        </form>
      </div>
    </Index>
  );
}
