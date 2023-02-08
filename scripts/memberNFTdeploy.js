const fs = require("fs");

const main = async () => {
    const addr1 = "0x4EE788c14aE06fa80eb6137e31551c90f15A294A";
    const addr2 = "0xe1463b8a67BC465759b47936BdEd901700e9C3D8";
    const addr3 = "0xAe38477f3211c31e40E84d4d1c57E0d0D7Dc0953";

    const tokenURI1 = "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata1.json";
    const tokenURI2 = "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata2.json";
    const tokenURI3 = "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata3.json";
    const tokenURI4 = "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata4.json";
    const tokenURI5 = "ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata5.json";

    // デプロイ
    const MemberNFT = await ethers.getContractFactory("MemberNFT");
    const memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();

    console.log(`Contract deployed to: https://goerli.etherscan.io/address/${memberNFT.address}`);

    // NFTミント
    let tx = await memberNFT.nftMint(addr1, tokenURI1);
    await tx.wait();
    console.log("NFT#1 minted...");
    tx = await memberNFT.nftMint(addr1, tokenURI2);
    await tx.wait();
    console.log("NFT#2 minted...");
    tx = await memberNFT.nftMint(addr2, tokenURI3);
    await tx.wait();
    console.log("NFT#3 minted...");
    tx = await memberNFT.nftMint(addr2, tokenURI4);
    await tx.wait();
    console.log("NFT#4 minted...");

    // コントラクトアドレスの書き出し
    fs.writeFileSync("./memberNFTContract.js",
    `
    module.exports = "${memberNFT.address}"
    `
    );
}

const memberNFTDeploy = async () => {
    try {
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

memberNFTDeploy();