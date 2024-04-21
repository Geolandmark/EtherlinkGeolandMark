import React, { useState, useEffect } from "react";
import Step3 from "../assets/step3.svg";
import { useNavigate } from "react-router-dom";
import { STATE } from "../utils/stateConstants";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { general_input_styles } from "../utils";
import { label_styles } from "../utils";
import { input_container_styles } from "../utils";
import { useMedia } from "../contexts/mediaContex";
import { useContract } from "../contexts/contractContext";
import { pinFileToIpfs } from "../services/pinata";
import { useMultiStepForm } from "./UseMultiStepForm";

export const LandOwnerShipStep = ({
  prevStep,
  saveLandOwnershipData,
  ownershipCurrentState,
  ownerCurrentState,
  landParcelCurrentState,
}) => {
  const navigate = useNavigate();
  const { propertyVisualization } = useMedia();

  const [isNegotiable, setIsNegotiable] = useState(true);

  const gateWayUrl = process.env.REACT_APP_PINATA_GATEWAY_URL;
  const pinataGatewayToken = process.env.REACT_APP_PINATA_GATEWAY_TOKEN;

  const { saveParcelAssetOnchain, address, onChainStatus, handleStatus } =
    useContract();

  const step3 = async (values, _methods) => {
    handleStatus(STATE.LOADING);

    const userObj = {
      title: formik.values.title,
      fullName: formik.values.fullName,
      mail: formik.values.email,
      phoneNum: formik.values.phoneContact,
      description: formik.values.propertyDesc,
      price: formik.values.propertyPrice,
      isNegotiable: isNegotiable,
      images: propertyVisualization,
      occupation: formik.values.occupation,
      birthDate: formik.values.birthDate,
    };

    saveLandOwnershipData(userObj);

    let parcelImageCID;
    let ownerShipDocumentCID;
    let surveyPlanCID;

    parcelImageCID = await pinFileToIpfs(
      landParcelCurrentState?.document?.assetImage,
      "parcelImage"
    );
    ownerShipDocumentCID = await pinFileToIpfs(
      landParcelCurrentState?.document?.assetImage,
      "proofOfOwnership"
    );
    surveyPlanCID = await pinFileToIpfs(
      landParcelCurrentState?.document?.assetImage,
      "surveyPlan"
    );

    const allData = {
      owner: { ...ownerCurrentState },
      landParcel: { ...landParcelCurrentState },
      ownership: {
        address: address,
        title: formik.values.title,
        fullName: formik.values.fullName,
        sex: formik.values.sex,
        emailAddress: formik.values.emailAddress,
        mobileNumber: formik.values.mobileNumber,
        occupation: formik.values.occupation,
        dateOfBirth: formik.values.dateOfBirth,
        placeOfBirth: formik.values.placeOfBirth,
        country: formik.values.country,
        stateOfOrigin: formik.values.stateOfOrigin,
        legalIdentityNo: formik.values.legalIdentityNo,
      },
      file: {
        parcelImage: `${gateWayUrl}/ipfs/${parcelImageCID}?pinataGatewayToken=${pinataGatewayToken}`,
        ownerShipDocument: `${gateWayUrl}/ipfs/${ownerShipDocumentCID}?pinataGatewayToken=${pinataGatewayToken}`,
        surveyPlan: `${gateWayUrl}/ipfs/${surveyPlanCID}?pinataGatewayToken=${pinataGatewayToken}`,
      },
    };

    try {
      onChainStatus(false);

      await saveParcelAssetOnchain(allData);

      navigate(`/prompt`, {
        state: {
          parcelNumber: ownerCurrentState.parcelNumber,
          address: address,
        },
      });

      onChainStatus(true);

      handleStatus(STATE.SUCCESS);

      useMultiStepForm(1)

      toast.success("Asset uploaded onchain successfully!");
    } catch (err) {
      toast.error(err || "An Error has occured. Please try again.");
      handleStatus(STATE.ERROR);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: ownershipCurrentState.title || "",
      fullName: ownershipCurrentState.fullName || "",
      emailAddress: ownershipCurrentState.emailAddress || "",
      mobileNumber: ownershipCurrentState.mobileNumber || "",
      occupation: ownershipCurrentState.occupation || "",
      sex: ownershipCurrentState.sex || "",
      dateOfBirth: ownershipCurrentState.dateOfBirth || "",
      placeOfBirth: ownershipCurrentState.placeOfBirth || "",
      country: ownershipCurrentState.country || "",
      stateOfOrigin: ownershipCurrentState.stateOfOrigin || "",
      legalIdentityNo: ownershipCurrentState.legalIdentityNo || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      fullName: Yup.string().required("Full Name is required."),
      emailAddress: Yup.string().required("emailAddress is required."),
      mobileNumber: Yup.string().required("Mobile number is required."),
      occupation: Yup.string().required("Your occupation."),
      sex: Yup.string().required("Indicate your gender."),
      dateOfBirth: Yup.string().required("dateOfBirth required"),
      placeOfBirth: Yup.string().required("placeOfbirth required"),
      country: Yup.string().required("country required"),
      stateOfOrigin: Yup.string().required("state og origin required"),
      legalIdentityNo: Yup.string().required("Identification number required"),
    }),
    onSubmit: (values, methods) => {
      step3(values, methods);
    },
  });

  return (
    <>
      <div className="flex flex-col">
        <img src={Step3} alt="step3" className="w-full" />

        <div className="mt-[6.2037vh] text-zinc-400 text-xl font-bold leading-snug text-center">
          Contact Information
        </div>
        <form
          onSubmit={formik.handleSubmit}
          onChange={formik.handleChange}
          encType="multipart/form-data"
          method="POST"
        >
          <div className="flex flex-col w-full mt-8 gap-[2.1667vh]">
            <div className={`w-[5vw] ${input_container_styles}`}>
              <label htmlFor="title" className={label_styles}>
                Title
              </label>
              <select
                id="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                placeholder="title"
                className={general_input_styles}
                name="title"
              >
                <option value="nil">- Choose - </option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
              </select>
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-600  w-[15vw]">
                  {formik.errors.title}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Full Name
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Full Name"
                name="fullName"
                value={formik.values.fullName}
                className={general_input_styles}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-600">{formik.errors.fullName}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="legalIdentityNo"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Legal Identity Number.
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Identity Number"
                name="legalIdentityNo"
                value={formik.values.legalIdentityNo}
                className={general_input_styles}
              />
              {formik.touched.legalIdentityNo &&
                formik.errors.legalIdentityNo && (
                  <div className="text-red-600">
                    {formik.errors.legalIdentityNo}
                  </div>
                )}
            </div>
            <div>
              <label
                htmlFor="emailAddress"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                E-mail Address
              </label>
              <input
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                name="emailAddress"
                value={formik.values.emailAddress}
                className={general_input_styles}
              />
              {formik.touched.emailAddress && formik.errors.emailAddress && (
                <div className="text-red-600">{formik.errors.emailAddress}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Mobile Number.
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Mobile Number"
                name="mobileNumber"
                value={formik.values.mobileNumber}
                className={general_input_styles}
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                <div className="text-red-600">{formik.errors.mobileNumber}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="occupation"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Occupation.
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Occupation"
                name="occupation"
                value={formik.values.occupation}
                className={general_input_styles}
              />
              {formik.touched.occupation && formik.errors.occupation && (
                <div className="text-red-600">{formik.errors.occupation}</div>
              )}
            </div>
          </div>

          <div className="w-full flex mt-6 flex-wrap justify-between gap-2 ">
            <div className="w-[14vw]">
              <label
                htmlFor="sex"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Gender
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Indicate your gender"
                name="sex"
                value={formik.values.sex}
                className={general_input_styles}
              />
              <div
                className={`${
                  formik.touched.sex && formik.errors.sex
                    ? "inline-block text-red-600"
                    : "hidden"
                } `}
              >
                {formik.touched.sex && formik.errors.sex && formik.errors.sex}
              </div>
            </div>
            <div className="w-[14vw]">
              <label
                htmlFor="dateOfDate"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Date of Birth
              </label>
              <input
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="dateOfBirth"
                placeholder=" Title"
                value={formik.values.dateOfBirth}
                className={general_input_styles}
              />
              <div
                className={`${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "inline-block text-red-600"
                    : "hidden"
                } `}
              >
                {formik.touched.dateOfBirth &&
                  formik.errors.dateOfBirth &&
                  formik.errors.dateOfBirth}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-8 gap-[2.1667vh]">
            <div>
              <label
                htmlFor="placeOfBirth"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Place of Birth.
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Place of Birth"
                name="placeOfBirth"
                value={formik.values.placeOfBirth}
                className={general_input_styles}
              />
              {formik.touched.placeOfBirth && formik.errors.placeOfBirth && (
                <div className="text-red-600">{formik.errors.placeOfBirth}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="stateOfOrigin"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                State of Origin.
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="State of Origin"
                name="stateOfOrigin"
                value={formik.values.stateOfOrigin}
                className={general_input_styles}
              />
              {formik.touched.stateOfOrigin && formik.errors.stateOfOrigin && (
                <div className="text-red-600">
                  {formik.errors.stateOfOrigin}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="country"
                className="mb-1 text-base  font-bold text-[#B9B9B9]"
              >
                Country.
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nationality"
                name="country"
                value={formik.values.country}
                className={general_input_styles}
              />
              {formik.touched.country && formik.errors.country && (
                <div className="text-red-600">{formik.errors.country}</div>
              )}
            </div>
          </div>
          <div className="flex justify-around mt-6 py-12">
            <button
              onClick={prevStep}
              className=" w-[8.2292vw] h-[4.3519vh] border  border-cyan-600 bg-opacity-40 rounded-[10px]"
            >
              Back
            </button>
            <button
              type="submit"
              className=" w-[8.2292vw] h-[4.3519vh]  bg-cyan-600 bg-opacity-40 rounded-[10px]"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
