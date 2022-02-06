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
  //const toAddress = "0xA2cA49d8262d0cB7Ad8bB6814Acd929D7D0f1A8B"
  const toAddress = "0xaDEbeAB3FA4197d6CE37b5e0D1A9863A249c1e10";

  console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  const { deployer } = await getNamedAccounts();
  const mptyCollectible  = await ethers.getContract("MPTY", deployer);

  canvas = {
    name: "Untitled by Studio C.A.R.E",
    description: "2020 / Design drawing \n\n Website: https://www.studio-c-a-r-e.com \n\n Instagram: https://www.instagram.com/studio.care.rotterdam/",
    image: "https://i.ibb.co/NW4K3WR/mpty-logo-square.jpg",
    external_url: "https://www.studio-c-a-r-e.com",
    attributes: [
      { instagram: "@studio.care.rotterdam" },
      { artist: "Studio C.A.R.E" },
    ],
}

  const uploaded = await ipfs.add(JSON.stringify(canvas));
  console.log("Minting MPTY Canvas with IPFS hash ("+uploaded.path+")")

  console.log(await mptyCollectible.mintItem(toAddress,uploaded.path,{gasLimit:10000000}))

  await sleep(delayMS)


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
