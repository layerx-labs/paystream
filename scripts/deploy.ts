import { ethers } from "hardhat";

async function main() {
  const Sablier = await ethers.getContractFactory("Sablier");
  const sablier = await Sablier.deploy();

  await sablier.deployed();

  console.log("Sablier Deployed at ", sablier.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
