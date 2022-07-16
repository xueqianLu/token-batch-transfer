require("@nomicfoundation/hardhat-toolbox");

// Define mnemonic for accounts.
let mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  // NOTE: this fallback is for development only!
  // When using other networks, set the secret in .env.
  // DO NOT commit or share your mnemonic with others!
  mnemonic = "test test test test test test test test test test test test";
}

let privateKey = process.env.PRIVATE_KEY;
const accounts = { mnemonic };

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      accounts,
      gas: 10000000,
      gasPrice: 10000000000,
    },
    cmp:{
	    url: "http://18.142.56.104",
	    accounts: [privateKey],
    },
    testnet:{
	    //url: "https://galaxy.block.caduceus.foundation",
	    url: "http://154.86.159.8:38545",
	    accounts: [privateKey],
    },
    mainnet:{
	    url: "https://hpbnode.com",
	    accounts: [privateKey],
    },
  },
};
