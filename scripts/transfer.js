const hre = require("hardhat");
const { userlist } = require('./userlist.json');

async function transfer(batch) {
	var addresses = [];
	var amounts = [];

	for(i=0; i < userlist.length; i++) {
		var addr = userlist[i].address;
		var amount = userlist[i].amount;
		addresses.push(addr);
		amounts.push(amount);
		if (addresses.length == 50) {
			var tx = await batch.batchTransfer(addresses, amounts);
			await tx.wait();
			addresses = [];
			amounts = [];
			console.log("batch transfer to user ", addresses.length);
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
  const addr = "";
  const batch = await hre.ethers.getContractAt("TokenBatchTransfer", addr);
  console.log("deploy batch transfer contract at:", batch.address);
  await transfer(batch);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
