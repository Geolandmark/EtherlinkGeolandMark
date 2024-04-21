import axios from "axios";
import { toast } from 'react-toastify';

export const sendFileToIPFS = async (image,parcelId) => {
  try {
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: {
        image,
      },
      headers: {
        pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

    toast.success(`${ImgHash} success while uploading nft details. Try again later`);
    console.log(ImgHash);
  } catch (error) {
    toast.error("Error sending File to IPFS: ");
    console.log("Error sending File to IPFS: ");
    console.log(error);
  }
};
