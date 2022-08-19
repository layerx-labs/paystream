import { HttpNetworkConfig } from 'hardhat/types'
import { ethers } from "hardhat";
import hre from "hardhat";
import  { Web3Connection, ERC20 }  from "@taikai/dappkit" ;

/**
 * Deploys a Bepro Token Contract and Paystream Contract
 */
async function main() {

  const networkConfg = hre.config.networks[hre.network.name] as HttpNetworkConfig;
  const options = {
    web3Host: networkConfg.url,
    skipWindowAssignment: true
  };
  const accounts = await hre.ethers.getSigners();
  console.log("Deploying to ", hre.network.name, " with ", accounts[0].address);
  // Connect to the RPC Endpoint
  const web3Connection = new Web3Connection(options);
  await web3Connection.start();



  // 2. BEPRO DEPLOY

  console.log(`Deploying Bepro Contract...`)
  const deployer = new ERC20(web3Connection);
    // Load abi contract is only needed for deploy actions
  await deployer.loadAbi();
  const tx = await deployer.deployJsonAbi(
    "Bepro Network", // the name of the token
    "BEPRO", // the symbol of the token
    300*10**9, // capital
    "0xf15CC0ccBdDA041e2508B829541917823222F364" // the owner of the total amount of the tokens (your address)
  );
    
  console.log(`Bepro Contract Deployed at ${tx.contractAddress}`)

  // 2. PAYSTREAM DEPLOY
  console.log(`Deploying Paystream Contract...`)

  const Sablier = await ethers.getContractFactory("Sablier");
  const sablier = await Sablier.deploy();  
  await sablier.deployed();
  console.log("Paystream Contract Deployed at ", sablier.address);
  
  return sablier.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=> {
  process.exitCode = 0;
  process.exit();
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
