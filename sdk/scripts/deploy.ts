import { ethers } from "hardhat";
import  { Web3Connection, ERC20 }  from "@taikai/dappkit" ;

async function main() {
  const Sablier = await ethers.getContractFactory("Sablier");
  const sablier = await Sablier.deploy();

  await sablier.deployed();

  console.log("Sablier Deployed at ", sablier.address);

  
  const options = {
    web3Host: "http://localhost:8545",
    skipWindowAssignment: true
  };

  // Connect to the RPC Endpoint
  const web3Connection = new Web3Connection(options);
  await web3Connection.start();

  const deployer = new ERC20(web3Connection);
    // Load abi contract is only needed for deploy actions
  await deployer.loadAbi();

  const tx = await deployer.deployJsonAbi(
    "BEPRO", // the name of the token
    "BEPRO", // the symbol of the token
    300000000, // capital
    "0xf15CC0ccBdDA041e2508B829541917823222F364" // the owner of the total amount of the tokens (your address)
  );
    
  console.log(`Deployed BEPRO at ${tx.contractAddress}`)
  return tx.contractAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
