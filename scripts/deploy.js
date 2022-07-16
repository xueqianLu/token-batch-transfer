const hre = require("hardhat");

async function main() {
  const token = "0xaB06f2bEd629106236dA27fdc41E90654aD75C09";
  const Batch = await hre.ethers.getContractFactory("TokenBatchTransfer");
  const batch = await Batch.deploy(token);

  await batch.deployed();

  console.log("deploy batch transfer contract at:", batch.address, "token is ", token);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
