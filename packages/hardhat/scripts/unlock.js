/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:

  console.log("🎫 Unlocking MPTY");

  const { deployer } = await getNamedAccounts();

  const mptyCollectible = await ethers.getContract("MPTY", deployer);

  const hany = {
    description: "Unlocked MPTY",
    image: https://i.ibb.co/NW4K3WR/mpty-logo-square.jpg"
    name: "Test MPTY",
  };

  const uploaded = await ipfs.add(JSON.stringify(hany));

  await mptyCollectible.unlockItem(1, uploaded.path, {gasLimit:10000000});

  await sleep(delayMS);

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
