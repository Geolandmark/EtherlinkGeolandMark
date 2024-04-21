const { ethers } = require("hardhat");

async function deployMyContract() {
  const [deployer] = await ethers.getSigners();
  const contractArguments = [`${process.env.REACT_APP_DEPLOY_ADDRESS}`];

  console.log("Deploying contract with the account:", deployer.address);

  const AssetRegistry = await ethers.getContractFactory("AssetRegistry");

  const assetRegistry = await AssetRegistry.deploy();

  await assetRegistry.waitForDeployment();

  const GeoToken = await ethers.getContractFactory("GeolandMarkToken");

  const geoToken = await GeoToken.deploy(...contractArguments);

  console.log(geoToken.target,"geoTokenContractAddress")

  console.log(assetRegistry.target,"assetRegistryContractAddress")

}

deployMyContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });