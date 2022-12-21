const { ethers, network, waffle } = require("hardhat");
const { expect } = require("chai");

describe("CryptoBet", function () {
  let CryptoBet;
  let cryptoBet;
  let CryptoBetFactory;
  let cryptobetfactoryCtr;
  let alice;
  let bob;
  let owner;
  let aliceProxyContract;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    CryptoBet = await ethers.getContractFactory("CryptoBet");
    cryptoBet = await CryptoBet.deploy(
      owner.address,
      "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
      ethers.utils.parseEther("1")
    );
    await cryptoBet.deployed();

    CryptoBetFactory = await ethers.getContractFactory("CryptoBetFactory");
    cryptobetfactoryCtr = await CryptoBetFactory.deploy(
      cryptoBet.address,
      owner.address
    );
    await cryptobetfactoryCtr.deployed();

    await cryptobetfactoryCtr.connect(alice).createInstance(alice.address);
    aliceProxyContract = await CryptoBet.attach(
      await cryptobetfactoryCtr.getProxy(alice.address)
    );
  });

  it("Master Contract should match exampleCryptoBetContract", async function () {
    expect(await cryptobetfactoryCtr.masterContract()).to.equal(cryptoBet.address);
  });

  it("Start Game", async function () {
     await cryptoBet.connect(owner).init(alice.address);
     await cryptoBet.connect(alice).startGame(100000000);
     expect(await cryptoBet.returnStartingPrice()).to.be.gt(0) 
     expect(await cryptoBet.returnGameTime()).to.be.gt(0); 
     expect(await cryptoBet.returnEntryAmount()).to.equal(ethers.utils.parseEther("1"))
  });
  it("Place A Bet", async function () {
     await cryptoBet.connect(owner).init(alice.address);
     await cryptoBet.connect(alice).startGame(100000000);
     await cryptoBet.connect(bob).placeBet(0, {value: ethers.utils.parseEther("1")});
     await cryptoBet.connect(alice).placeBet(1, { value: ethers.utils.parseEther("1") })
     const highBetters = await cryptoBet.returnHighBetters()
     expect(highBetters.length).to.equal(1)
     expect(highBetters.includes(bob.address)).to.equal(true);
     const lowBetters = await cryptoBet.returnLowBetters();
     expect(lowBetters.length).to.equal(1);
     expect(lowBetters.includes(alice.address)).to.equal(true);
     expect(await cryptoBet.addressToAmountBetted(bob.address)).to.be.gt(0);
     expect(await cryptoBet.addressToAmountBetted(alice.address)).to.be.gt(0);
     expect(await cryptoBet.hasBetted(alice.address)).to.equal(true);
     expect(await cryptoBet.hasBetted(bob.address)).to.equal(true);
  });
  it("Reward Winners", async function () {
     await cryptoBet.connect(owner).init(alice.address);
     await cryptoBet.connect(alice).startGame(100000);
     await cryptoBet.connect(alice).placeBet(0, { value: ethers.utils.parseEther("1") });
     await cryptoBet.connect(bob).placeBet(1, { value: ethers.utils.parseEther("1") });
     const contractBalanceOne = await waffle.provider.getBalance(cryptoBet.address)
     const aliceBalance = await waffle.provider.getBalance(alice.address);
     const bobBalance = await waffle.provider.getBalance(bob.address);
     await network.provider.send("evm_increaseTime", [31536000]);
     await network.provider.send("evm_mine");
     await cryptoBet.connect(alice).rewardWinners();
     expect(await cryptoBet.haveWinnersBeenRewarded()).to.equal(true);
     expect(await waffle.provider.getBalance(cryptoBet.address)).to.be.lt(contractBalanceOne);
     expect(await waffle.provider.getBalance(bob.address)).to.be.gt(bobBalance)
     await cryptoBet.connect(alice).withdraw();
     expect(await waffle.provider.getBalance(alice.address)).to.be.gt(aliceBalance);
  });
});
