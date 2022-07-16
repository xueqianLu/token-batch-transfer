const hre = require("hardhat");
const { userlist } = require('./userlist.test.json');

async function transfer(batch) {
	var addresses = [];
	var amounts = [];

	for(i=0; i < userlist.length; i++) {
		var addr = userlist[i].address;
		var amount = userlist[i].amount;
		addresses.push(addr);
		amounts.push(amount);
		if (addresses.length == 50) {
			console.log("batch transfer to user ", addresses.length);
			var tx = await batch.batchTransfer(addresses, amounts);
			await tx.wait();
			addresses = [];
			amounts = [];

		}
	}
	if(addresses.length > 0 ) {
		var tx = await batch.batchTransfer(addresses, amounts);
		await tx.wait();
		console.log("batch transfer to user ", addresses.length);
	}
	console.log("batch transfer finished.")
}

async function main() {
  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy();

  await token.deployed();
  console.log("deploy token contract at:", token.address);

  const Batch = await hre.ethers.getContractFactory("TokenBatchTransfer");
  const batch = await Batch.deploy(token.address);
  await batch.deployed();
  console.log("deploy batch transfer contract at:", batch.address, "token is ", token.address);
  token.transfer(batch.address, "100000000000000000000000");
  transfer(batch);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
