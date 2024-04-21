import React, { useState, useEffect, useRef } from "react";
import Step1 from "../assets/step1.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { STATE } from "../utils/stateConstants";
import { general_input_styles } from "../utils";
import { label_styles } from "../utils";
import { input_container_styles } from "../utils";

export const OwnerStep = ({ saveOwnerData, ownerCurrentState, nextStep }) => {
  const ownershipRef = useRef("");
  const [status, setStatus] = useState(STATE.IDLE);
  const [ownershipType, setOwnershipType] = useState("");

  const selectOwnershipType = (e) => {
    ownershipRef.current = e.target.value;
    setOwnershipType(e.target.value);
  };

  const step1 = async (values, _methods) => {
    setStatus(STATE.LOADING);
    const userObj = {
      parcelNumber: values.parcelNumber,
      area: values.area,
      ownershipType: ownershipType,
      address: values.address,
      value: values.value,
      landUse: values.ownershipType,
      legalDescription: values.legalDescription,
    };

    if (userObj) {
      saveOwnerData(userObj);
      nextStep();
    }
  };

  useEffect(() => {}, [ownerCurrentState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      parcelNumber: ownerCurrentState.parcelNumber || "",
      area: ownerCurrentState.area || "",
      ownershipType: ownerCurrentState.ownershipType || "",
      address: ownerCurrentState.address || "",
      value: ownerCurrentState.value || "",
      landUse: ownerCurrentState.landUse || "",
      legalDescription: ownerCurrentState.legalDescription || "",
    },
    validationSchema: Yup.object({
      parcelNumber: Yup.string().required("Plan number is required."),
      area: Yup.number().required("Area in (sqm)."),
      ownershipType: Yup.string().optional(),
      address: Yup.string().required("Address is required."),
      value: Yup.number().optional(),
      landUse: Yup.string().optional(),
      legalDescription: Yup.string().required("Address is required."),
    }),
    onSubmit: (values, methods) => {
      step1(values, methods);
    },
  });

  return (
    <div className="flex flex-col">
      <img src={Step1} alt="step1" className="w-full" />
      <div className="mt-[6.2037vh] text-zinc-400 text-xl font-bold leading-snug">
        Property Information.
      </div>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        method="POST"
        onChange={formik.handleChange}
      >
        <div className="flex flex-col w-full mt-[5.4630vh] gap-[4.1667vh]">
          <div>
            <label
              htmlFor="parcelNumber"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Parcel Number
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              placeholder="Parcel Number"
              name="parcelNumber"
              value={formik.values.parcelNumber}
              className={general_input_styles}
            />
            {formik.touched.parcelNumber && formik.errors.parcelNumber && (
              <div className="inline-block text-red-600">
                {formik.errors.parcelNumber}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="area"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Area (sqm)
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              placeholder="Area (sqm)"
              name="area"
              value={formik.values.area}
              className={general_input_styles}
            />
            {formik.touched.area && formik.errors.area && (
              <div className="inline-block text-red-600">
                {formik.errors.area}
              </div>
            )}
          </div>

          <div>
            <div className={input_container_styles}>
              <label htmlFor="ownershipType" className={label_styles}>
                Ownership Type
              </label>
              <select
                id="ownershipType"
                onChange={selectOwnershipType}
                value={ownershipRef.current}
                placeholder="Enter Ownership Type"
                className={general_input_styles}
                required
              >
                <option value="ownership type">- Choose one - </option>
                <option value="individual">Individual</option>
                <option value="corporation">Corporation</option>
              </select>
            </div>
            {formik.touched.ownershipType && formik.errors.ownershipType && (
              <div className="inline-block text-red-600">
                {formik.errors.ownershipType}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Address
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Address"
              name="address"
              value={formik.values.address}
              className={general_input_styles}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="inline-block text-red-600">
                {formik.errors.address}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="value"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Estimated Value ($)
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              placeholder="Estimated value of your assets"
              name="value"
              value={formik.values.value}
              className={general_input_styles}
            />
            {formik.touched.value && formik.errors.value && (
              <div className="inline-block text-red-600">
                {formik.errors.value}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="landUse"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              LandUse
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="land Use"
              name="landUse"
              value={formik.values.landUse}
              className={general_input_styles}
            />
            {formik.touched.landUse && formik.errors.landUse && (
              <div className="inline-block text-red-600">
                {formik.errors.landUse}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="legalDescription"
              className="mb-1 text-base font-bold text-[#B9B9B9]"
            >
              Legal Description
            </label>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Legal Description"
              name="legalDescription"
              value={formik.values.legalDescription}
              className={`${general_input_styles} h-[20vh]`}
            />

            {formik.touched.legalDescription &&
              formik.errors.legalDescription && (
                <div className="inline-block text-red-600">
                  {formik.errors.legalDescription}
                </div>
              )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className=" w-[8.2292vw] h-[4.3519vh]  bg-cyan-600 bg-opacity-40 rounded-[10px]"
            >
              Proceed
            </button>
          </div>
        </div>
      </form>
      <div
        className={`relative flex flex-col justify-center items-center gap-2 
          `}
      ></div>
    </div>
  );
};
