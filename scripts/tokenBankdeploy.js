const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async () => {
    const addr1 = "0x4EE788c14aE06fa80eb6137e31551c90f15A294A";
    const addr2 = "0xe1463b8a67BC465759b47936BdEd901700e9C3D8";
    const addr3 = "0xAe38477f3211c31e40E84d4d1c57E0d0D7Dc0953";
    const addr4 = "0x9966bF764C40Ee76E484c2989a94039758EA7067";

    // デプロイ
    const TokenBank = await ethers.getContractFactory("TokenBank");
    const tokenBank = await TokenBank.deploy("TokenBank", "TBK", memberNFTAddress);
    await tokenBank.deployed();

    console.log(`Contract deployed to: https://goerli.etherscan.io/address/${tokenBank.address}`);

    // トークン移転
    let tx = await tokenBank.transfer(addr2, 300);
    await tx.wait();
    console.log("transferred to addr2")
    tx = await tokenBank.transfer(addr3, 200);
    await tx.wait();
    console.log("transferred to addr3")
    tx = await tokenBank.transfer(addr4, 100);
    await tx.wait();
    console.log("transferred to addr4")

    // Verifyで読み込むargument.jsを生成
    fs.writeFileSync("./argument.js",
    `
    module.exports = [
        "TokenBank",
        "TBK",
        "${memberNFTAddress}"
    ]
    `
    );

    // フロントエンドアプリが読み込むcontract.jsを生成
    fs.writeFileSync("./contract.js",
    `
    export const memberNFTAddress = ${memberNFTAddress};
    export const tokenBankAddress = ${tokenBank.address};
    `
    );
}

const TokenBankDeploy = async () => {
    try {
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

TokenBankDeploy();