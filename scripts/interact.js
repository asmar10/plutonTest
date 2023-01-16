require("dotenv").config();
const { contracts } = require("hardhat");
const { ethers } = require("hardhat");
const hre = require("hardhat");


async function main() {
    const _uris = ['https://gateway.pinata.cloud/ipfs/QmQ4QgNjPafZ2iB37e1YwPj5GgeYdEXyiFxMMYjE9L3m3f',
        "https://gateway.pinata.cloud/ipfs/QmWRuiSN419iCspcuSDEPwTVyhoSrBPLvic72zwZkXnyx7",
        "https://gateway.pinata.cloud/ipfs/QmWykfbZkpnvY3Qprooxu2L98JtBZxu84MKH1doVQsFCAN"]

    const [deployer] = await ethers.getSigners();

    const token = await hre.ethers.getContractAt("token", "0x38bdaef1a30a2d58239532B511D275e722aC65D6")
    const nft = await hre.ethers.getContractAt("nft", "0x1D0d6E8f3384beCE4b124611a88A6C1287E202EC")


    try {
        await token.approve(nft.address, 50000000000, { from: deployer.address, gasLimit: 6000000 });

        for (let i = 0; i < 3; i++) {
            await nft.createNft(deployer.address, _uris[i], { from: deployer.address, gasLimit: 6000000 });
        }

        // for (let i = 0; i < 2; i++) {
        //     await nft.createNft(deployer.address, "https://gateway.pinata.cloud/ipfs/QmTjv5Dde76ukRB85cGuYDzhiX8WbpXvaQk8Kj1nMLY8qX", { from: deployer.address, gasLimit: 6000000 });
        // }
        // await nft.createNft(deployer.address, "https://gateway.pinata.cloud/ipfs/QmTjv5Dde76ukRB85cGuYDzhiX8WbpXvaQk8Kj1nMLY8qX", { from: deployer.address, gasLimit: 6000000 });
        // if (await nft.getCurrentId() == 3) {
        //     for (let i = 0; i < 3; i++) {
        //         await nft._setTokenURI(i, _uris[i], { from: deployer.address, gasLimit: 6000000 });
        //     }
        // }

    }
    catch (err) {
        console.log(err)
    }

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
