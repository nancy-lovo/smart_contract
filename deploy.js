const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  process.env.ACCOUNT_MNEMONIC,
  process.env.RINKEBY_ENDPOINT
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    const result = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
      .send({ from: accounts[0], gas: "1000000" });

    console.log(
      "Deployed contract to rinkeby network at",
      result.options.address
    );
    provider.engine.stop();
  } catch (error) {
    console.log(error);
  }
};
deploy();
