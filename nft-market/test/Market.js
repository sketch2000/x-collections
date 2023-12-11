const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Market", async function () {
  let usdt, mynft, market, account1, account2;

  this.beforeEach(async () => {
    [account1, account2] = await ethers.getSigners();

    let USDT = await ethers.getContractFactory("cUSDT");
    usdt = await USDT.deploy();

    let NFT = await ethers.getContractFactory("NFTM");
    mynft = await NFT.deploy(account1.address);

    let Market = await ethers.getContractFactory("Market");
    market = await Market.deploy(usdt.target, mynft.target);

    await mynft.safeMint(account2.address);
    await mynft.safeMint(account2.address);

    // usdt.connect account2, or it use the first account(account1)
    await usdt.approve(market.target, "10000000000000000");
  });

  it("its erc20 address should be usdt", async () => {
    expect(await market.erc20()).to.equal(usdt.target);
  });

  it("its erc721 address should be mynft", async () => {
    expect(await market.erc721()).to.equal(mynft.target);
  });

  it("account2 should have 2 NFTs", async () => {
    expect(await mynft.balanceOf(account2.address)).to.equal(2);
  });

  it("account1 should hava ustc", async () => {
    //  1e+26
    expect(await usdt.balanceOf(account1.address)).to.equal(
      "100000000000000000000000000"
    );
  });

  it("account2 can list two nfts in market", async () => {
    // price 3 to evm calldata
    const price = "0x00";

    expect(
      await mynft["safeTransferFrom(address,address,uint256,bytes)"](
        account2.address,
        market.target,
        0,
        price
      )
    ).to.emit(market, "NewOrder");

    expect(
      await mynft["safeTransferFrom(address,address,uint256,bytes)"](
        account2.address,
        market.target,
        1,
        price
      )
    ).to.emit(market, "NewOrder");
  });
});
