import React, { useState, useEffect } from "react";
import Step2 from "../assets/step2.svg";
import { STATE } from "../utils/stateConstants";
import { useFormik } from "formik";
import * as Yup from "yup";
import Upload from "../assets/upload.svg";
import { useMedia } from "../contexts/mediaContex";
import MediaLoader from "./fileLoader";
const formData = new FormData();

export const ParcelStep = ({
  prevStep,
  nextStep,
  landParcelCurrentState,
  saveLandParcelData,
}) => {
  const [isGeo, setIsGeo] = useState(true);
  const activateGeoSystem = () => {
    setIsGeo(true);
  };
  const activateCartSystem = () => {
    setIsGeo(false);
  };
  const {
    cOf,
    uploadCof,
    surveyPlan,
    uploadSurveyPlan,
    uploadPropertyVisualization,
    propertyVisualization,
  } = useMedia();

  const [status, setStatus] = useState(STATE.IDLE);
  const [ownerShipDoc, setOwnershipDoc] = useState();
  const [assetImage, setAssetImage] = useState();
  const [surveyPlanDoc, setSurveyPlan] = useState();

  const saveOwnerShipDoc = (event) => {
    setOwnershipDoc(event.target.files[0]);
    uploadCof(event);
  };
  const saveAssetImage = (event) => {
    setAssetImage(event.target.files[0]);
    uploadPropertyVisualization(event);
  };
  const saveSurveyPlan = (event) => {
    setSurveyPlan(event.target.files[0]);
    uploadSurveyPlan(event);
  };

  formData.append("ownershipDoc", ownerShipDoc);
  formData.append("surveyPlanDoc", surveyPlanDoc);
  formData.append("assetImage", assetImage);

  const step2 = async (values, methods) => {
    setStatus(STATE.LOADING);
    const userObj = {
      isAreaType: isGeo,
      ...(isGeo
        ? {
            geographicCoordinates: [
              { point1: { px: formik.values.px1, py: formik.values.py1 } },
              {
                point2: {
                  px: formik.values.px2 || formik.values.px1,
                  py: formik.values.py2 || formik.values.py1,
                },
              },
              {
                point3: {
                  px: formik.values.px3 || formik.values.px1,
                  py: formik.values.py3 || formik.values.py1,
                },
              },
              {
                point4: {
                  px: formik.values.px4 || formik.values.px1,
                  py: formik.values.py4 || formik.values.py1,
                },
              },
            ],
          }
        : {
            geographicCoordinates: [
              { point1: { px: formik.values.px1, py: formik.values.py1 } },
              { point2: { px: formik.values.px2, py: formik.values.py2 } },
              { point3: { px: formik.values.px3, py: formik.values.py3 } },
              { point4: { px: formik.values.px4, py: formik.values.py4 } },
            ],
          }),
      document: {
        ownershipDocument: ownerShipDoc || "",
        surveyPlanDocument: surveyPlanDoc || "",
        assetImage: assetImage || "",
      },
    };

    if (landParcelCurrentState) {
      saveLandParcelData(userObj);
      nextStep();
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      px1: landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.px || "",
      py1: landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.py || "",
      px2:
        landParcelCurrentState?.geographicCoordinates?.[1]?.point2?.px ||
        landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.px,
      py2:
        landParcelCurrentState?.geographicCoordinates?.[1]?.point2?.py ||
        landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.py,
      px3:
        landParcelCurrentState?.geographicCoordinates?.[2]?.point3?.px ||
        landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.px,
      py3:
        landParcelCurrentState?.geographicCoordinates?.[2]?.point3?.py ||
        landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.py,
      px4:
        landParcelCurrentState?.geographicCoordinates?.[3]?.point4?.px ||
        landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.px,
      py4:
        landParcelCurrentState?.geographicCoordinates?.[3]?.point4?.py ||
        landParcelCurrentState?.geographicCoordinates?.[0]?.point1?.py,
      parcelImage: assetImage,
    },
    validationSchema: Yup.object({
      px1: Yup.string().required("This field is required."),
      py1: Yup.string().required("This field is required."),
      px2: Yup.string().optional("This field is required."),
      py2: Yup.string().optional("This field is required."),
      px3: Yup.string().optional("This field is required."),
      py3: Yup.string().optional("This field is required."),
      px4: Yup.string().optional("This field is required."),
      py4: Yup.string().optional("This field is required."),
      py4: Yup.string().optional("This field is required."),
      parcelImage: Yup.string().required("Upload a parcel image"),
    }),
    onSubmit: (values, methods) => {
      step2(values, methods);
    },
  });
  console.log(landParcelCurrentState, "hheheh");
  return (
    <div className="flex- flex-col">
      <img src={Step2} alt="step2" className="w-full" />
      <div className="mt-[6.3704vh]">
        <div className="text-zinc-400 text-xl font-bold leading-snug text-center">
          Legal Documents
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div>
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="text-zinc-400 text-base font-semibold leading-[0.9vw]">
                Upload Asset Image
              </div>
              <div>
                <label htmlFor="fileInput1" className="cursor-pointer">
                  <div className="flex flex-col gap-2 justify-center items-center w-full h-[18.8889vh] bg-zinc-900 rounded-[10px] border border-zinc-400 border-dashed">
                    <img src={Upload} alt="upload" className="w-[2.3vw]" />
                    <div className="text-cyan-600 text-lg font-semibold underline leading-tight">
                      Select a File to Upload
                    </div>
                    <div className="text-zinc-400 text-base font-normal leading-[0.9vw]">
                      Or Drag and Drop it here
                    </div>
                  </div>
                </label>
                <input
                  name="parcelImage"
                  id="fileInput1"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={saveAssetImage}
                  onBlur={formik.handleBlur}
                />
                {!assetImage ? (
                  <div className="text-red-600">
                    {formik.errors.parcelImage}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <MediaLoader media={propertyVisualization} />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="text-zinc-400 text-base font-semibold leading-[0.9vw]">
                Proof Of Ownership
              </div>
              <div>
                <label htmlFor="fileInput2" className="cursor-pointer">
                  <div className="flex flex-col gap-2 justify-center items-center w-full h-[18.8889vh] bg-zinc-900 rounded-[10px] border border-zinc-400 border-dashed">
                    <img src={Upload} alt="upload" className="w-[2.3vw]" />
                    <div className="text-cyan-600 text-lg font-semibold underline leading-tight">
                      Select a File to Upload
                    </div>
                    <div className="text-zinc-400 text-base font-normal leading-[0.9vw]">
                      Or Drag and Drop it here
                    </div>
                  </div>
                </label>
                <input
                  id="fileInput2"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={saveOwnerShipDoc}
                />
              </div>
            </div>

            <div>
              <MediaLoader media={cOf} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="text-zinc-400 text-base font-semibold leading-[0.9vw]">
                Upload Survey Plan
              </div>
              <div>
                <label htmlFor="fileInput3" className="cursor-pointer">
                  <div className="flex flex-col gap-2 justify-center items-center w-full h-[18.8889vh] bg-zinc-900 rounded-[10px] border border-zinc-400 border-dashed">
                    <img src={Upload} alt="upload" className="w-[2.3vw]" />
                    <div className="text-cyan-600 text-lg font-semibold underline leading-tight">
                      Select a File to Upload
                    </div>
                    <div className="text-zinc-400 text-base font-normal leading-[0.9vw]">
                      Or Drag and Drop it here
                    </div>
                  </div>
                </label>
                <input
                  id="fileInput3"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={saveSurveyPlan}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
            </div>
            <div>
              <MediaLoader media={surveyPlan} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[6.2037vh] text-zinc-400 text-xl font-bold text-center leading-snug">
        Spatial Attribute
      </div>
      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        encType="multipart/form-data"
        method="POST"
      >
        <div className="flex flex-col w-full mt-[2.4630vh] gap-[4.1667vh]">
          {/* ... */}

          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex flex-col ">
              <div className="flex w-full justify-between my-4">
                <div
                  onClick={activateGeoSystem}
                  className={`${
                    isGeo ? "" : "text-zinc-300 text-opacity-40"
                  } cursor-pointer w-[14.5vw]  text-base flex flex-col items-center font-bold leading-[0.9vw]`}
                >
                  Point Co-ordinates
                  <div
                    className={`${
                      isGeo ? "bg-cyan-600" : "bg-zinc-300 bg-opacity-40"
                    } w-[13.8542vw] h-1  rounded-[100px]`}
                  />
                </div>
                <div
                  onClick={activateCartSystem}
                  className={`${
                    !isGeo ? "" : "text-zinc-300 text-opacity-40"
                  }  w-[14.5vw] text-zinc-400 text-base flex flex-col items-center font-bold leading-[0.9vw]`}
                >
                  Area Co-ordiantes
                  <div
                    className={`${
                      !isGeo ? "bg-violet-500" : "bg-zinc-300 bg-opacity-40 "
                    } w-[13.8542vw] h-1  rounded-[100px]`}
                  />
                </div>
              </div>
              <div className="w-full flex justify-around">
                {isGeo ? (
                  <>
                    <div>Latitude</div>
                    <div>Longtitude</div>
                  </>
                ) : (
                  <>
                    <div>Latitude</div>
                    <div>Longtitude</div>
                  </>
                )}
              </div>
            </div>
            {!isGeo ? (
              <div className="flex  flex-col items-ceneter gap-2">
                <div className="w-full flex flex-col ">
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Point1"
                        name="px1"
                        value={formik.values.px1}
                        className="w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />

                      {formik.touched.px1 && formik.errors.px1 && (
                        <div className="text-red-600">{formik.errors.px1}</div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="point1"
                        name="py1"
                        value={formik.values.py1}
                        className="w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />

                      {formik.touched.py1 && formik.errors.py1 && (
                        <div className="text-red-600">{formik.errors.py1}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col ">
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="point2"
                        name="px2"
                        value={formik.values.px2}
                        className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />
                      {formik.touched.px2 && formik.errors.px2 && (
                        <div className="text-red-600">{formik.errors.px2}</div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        placeholder="point2"
                        name="py2"
                        value={formik.values.py2}
                        className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />
                      {formik.touched.py2 && formik.errors.py2 && (
                        <div className="text-red-600">{formik.errors.py2}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col ">
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="point3"
                        name="px3"
                        value={formik.values.px3}
                        className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />
                      {formik.touched.px3 && formik.errors.px3 && (
                        <div className="text-red-600">{formik.errors.px3}</div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="point3"
                        name="py3"
                        value={formik.values.py3}
                        className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />

                      {formik.touched.py3 && formik.errors.py3 && (
                        <div className="text-red-600">{formik.errors.py3}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col ">
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="point4"
                        name="px4"
                        value={formik.values.px4}
                        className=" w-[14.1146vw]  px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />

                      {formik.touched.px4 && formik.errors.px4 && (
                        <div className="text-red-600">{formik.errors.px4}</div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="point4"
                        name="py4"
                        value={formik.values.py4}
                        className=" w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                      />

                      {formik.touched.py4 && formik.errors.py4 && (
                        <div className="text-red-600">{formik.errors.py4}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col ">
                <div className="w-full flex justify-between">
                  <div className="flex flex-col">
                    <input
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Point1"
                      name="px1"
                      value={formik.values.px1}
                      className="w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                    />

                    {formik.touched.px1 && formik.errors.px1 && (
                      <div className="text-red-600">{formik.errors.px1}</div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="point1"
                      name="py1"
                      value={formik.values.py1}
                      className="w-[14.1146vw] px-2 text-[#1B1B1B] text-sm placeholder:text-[#1B1B1B] h-[4.91vh] rounded-[7px] bg-zinc-300 "
                    />

                    {formik.touched.py1 && formik.errors.py1 && (
                      <div className="text-red-600">{formik.errors.py1}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* ... */}
        </div>

        <div className="flex justify-around mt-6 py-12">
          <button
            onClick={prevStep}
            className="w-[8.2292vw] h-[4.3519vh] border border-cyan-600 bg-opacity-40 rounded-[10px]"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-[8.2292vw] h-[4.3519vh] bg-cyan-600 bg-opacity-40 rounded-[10px]"
          >
            Proceed
          </button>
        </div>
      </form>{" "}
    </div>
  );
};
