// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
const fs = require('fs-extra');
const path = require('path');
const { constants, ethers } = require('ethers');

require('dotenv').config();
async function main() {
	const [deployer] = await hre.ethers.getSigners();
	const hyperverseAdmin = deployer.address;
	console.log('Deploying contracts with the account:', deployer.address);
	console.log('Account balance:', (await deployer.getBalance()).toString());

	const CryptoBetContract = await hre.ethers.getContractFactory('CryptoBet');
	const cryptoBetContract = await CryptoBetContract.deploy(
    hyperverseAdmin,
    "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    ethers.utils.parseEther("0.001")
  );
	await cryptoBetContract.deployed();

	const CryptoBetFactoryContract = await hre.ethers.getContractFactory(
    "CryptoBetFactory"
  );
	const cryptoBetFactoryContract = await CryptoBetFactoryContract.deploy(
    cryptoBetContract.address,
    hyperverseAdmin
  );
	await cryptoBetFactoryContract.deployed();

	console.log(
    `[${hre.network.name}] CryptoBet Contract deployed to: ${cryptoBetContract.address}`
  );
	console.log(`[${hre.network.name}] CryptoBet Factory deployed to: ${cryptoBetFactoryContract.address}`);

	const env = JSON.parse(fs.readFileSync('contracts.json').toString());
	env[hre.network.name] = env[hre.network.name] || {};
	env[hre.network.name].testnet = env[hre.network.name].testnet || {};

	env[hre.network.name].testnet.contractAddress = cryptoBetContract.address;
	env[hre.network.name].testnet.factoryAddress = cryptoBetFactoryContract.address;

	// Save contract addresses back to file
	fs.writeJsonSync('contracts.json', env, { spaces: 2 });
	if (process.env.LOCALDEPLOY) {
		let proxyAddress = constants.AddressZero;
		const instanceTnx = await cryptoBetFactoryContract.createInstance(
			deployer.address,
			);
		instanceTnx.wait();
		console.log('Instance Created', instanceTnx.hash);
		while (proxyAddress === constants.AddressZero) {
			try {
				proxyAddress = await cryptoBetFactoryContract.getProxy(deployer.address);
			} catch (error) {
				proxyAddress = constants.AddressZero;
			}
		}
	}
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	// .then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

module.exports = { main };
