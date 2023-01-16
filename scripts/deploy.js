
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const initialSupply = 50000000000

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("token");
  const token = await Token.deploy(50000000000);//5 tkns

  console.log("Token Contract deployed at:", token.address)

  const NFT = await ethers.getContractFactory("nft");
  const nft = await NFT.deploy(token.address)

  console.log("Nft contract deployed at: ", nft.address)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
