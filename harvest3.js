// TO DO MINT LOGIC ON BOTH FUNCTIONS(EXCEPT CONVEX REWARD CONTRACT) AND BN implementation

const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");
const BN = web3.utils.BN;
function to18(n) {
  return web3.utils.toWei(n, "ether");
}
function from18(n) {
  return web3.utils.fromWei(n, "ether");
}
function to6(n) {
  return web3.utils.toWei(n, "Mwei");
}
function from6(n) {
  return web3.utils.fromWei(n, "Mwei");
}

//   const convexCrv= new web3.eth.Contract(convexCrvABI,"strategyAddress");

// req variables
let cvx = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
let cvxcrv = "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7";
let crv = "0xD533a949740bb3306d119CC777fa900bA034cd52";
let crv3 = "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490";
let convexRewardContractAddress = "0xCF50b810E57Ac33B91dCF525C6ddd9881B139332";
let cvxCrvRewardContractAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";
let basepool_address = "0x4a2631d090e8b40bBDe245e687BF09e5e534A239";
let convexCrvABI = require("./build/contracts/ConvexCRV.json").abi;
let ERC20 = require("./build/contracts/IERC20.json").abi;
let apContractABI = require("./build/contracts/APContract.json").abi;
let IRewardsABI = require("./build/contracts/IRewards.json").abi;
let ITokenMinterABI = require("./build/contracts/ITokenMinter.json").abi;
let minterdeployedaddress = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
//   create contract instances
let ITokenMinterContract = new web3.eth.Contract(
  ITokenMinterABI,
  minterdeployedaddress
);
// THINGS TO ADD
let cvx_cvxcrv_nav,cvx_basepool_nav;
// console.log(ITokenMinterContract);
let apContract = new web3.eth.Contract(
  apContractABI,
  "0x984F84520495f499Fa67E3316CA8CfffBB87f54E"
);
 let strategyAddress = "0x21c45f8A4Bff6eD1afb264C6017B6Ec48BaED58F";
let convexCrv = new web3.eth.Contract(convexCrvABI, strategyAddress);
let convexRewardContract = new web3.eth.Contract(
  IRewardsABI,
  convexRewardContractAddress
);
let cvxCrvRewardContract = new web3.eth.Contract(
  IRewardsABI,
  cvxCrvRewardContractAddress
);
let base_pool_contract = new web3.eth.Contract(IRewardsABI, basepool_address);

// other variables
let NAV = new BN("0");
// console.log(typeof NAV);
let num1 = new BN(NAV);
// console.log(typeof num1);
let num = new BN(new BN(NAV).add(new BN("10")));
// console.log(num.toString());
let NAV1 = new BN("0");
let NAV2 = new BN("0");
let NAV3 = new BN("0");
let NAV4 = new BN("0");

// CRV CRV3 CVX are rewards from cvcxrv contract
let crv_reward, cvxcrv_reward, CRV, CRV3, CVX;
let NavEffective=new BN("0");
// gettokenprices;
let crv_USD, cvxcrv_USD, cvx_USD, crv3_USD, rewardToken;

const start = async () => {
  const calcNav = () => {};
  // console.log("NUM", num);
  // console.log("mum type", typeof num);
  const setUSDvalues = async () => {
    crv_USD = await apContract.methods.getUSDPrice(crv).call();
    cvxcrv_USD = await apContract.methods.getUSDPrice(crv).call();
    cvx_USD = await apContract.methods.getUSDPrice(cvx).call();
    crv3_USD = await apContract.methods.getUSDPrice(crv3).call();
  };
  await setUSDvalues();
  function decimals(n, d) {
    if (typeof n !== "number" || typeof d !== "number") return false;
    n = parseFloat(n) || 0;
    return n.toFixed(d);
  }

  // function to find basepool rewards
  const CalcBasepoolReward = async () => {
    crv_reward = await base_pool_contract.methods
      .earned(strategyAddress)
      .call();

    // TODO
    // MINT LOGIC
    cvx_basepool_nav=await mint(crv_reward);
    
    console.log("basepool cvx nav",cvx_basepool_nav);
    NAV1 =
      (new BN(crv_reward) / new BN((10 ** 18).toString())) *
      (new BN(crv_USD) / new BN((10 ** 18).toString()));
    // console.log("nav 1", NAV1.toString());
    NavEffective+=new BN(new BN("NAV1").add(new BN("cvx_basepool_nav")))
  };

  const CalcCVXRewards = async () => {
    cvxcrv_reward = await convexRewardContract.methods
      .earned(strategyAddress)
      .call();
    // NAV += parseInt(
    //   (new BN(cvxcrv_reward) / new BN((10 ** 18).toString())) *
    //     (new BN(cvxcrv_USD) / new BN((10 ** 18).toString()))
    // );
    NAV2 =
      (new BN(cvxcrv_reward) / new BN((10 ** 18).toString())) *
      (new BN(cvxcrv_USD) / new BN((10 ** 18).toString()));
    console.log("nav 2", NAV2.toString());
    NavEffective+=new BN(new BN("NAV2").add(new BN("0")))
  };
  CalcCVXRewards()

  const CalcCVXcrv = async () => {
    CRV = await cvxCrvRewardContract.methods.earned(strategyAddress).call();
    //    extra reward calculation(3crv)
    let extraReward = await cvxCrvRewardContract.methods.extraRewards(0).call();
    let extraRewardContract = new web3.eth.Contract(IRewardsABI, extraReward);
    rewardToken = await extraRewardContract.methods.rewardToken().call();
    CRV3 = await extraRewardContract.methods.earned(strategyAddress).call();
    console.log("crv3",CRV3);
    // NAV += parseInt(
    //   (new BN(CRV3) / new BN((10 ** 18).toString())) *
    //     (new BN(crv3_USD) / new BN((10 ** 18).toString()))
    // );
    // NAV += parseInt(
    //   (new BN(CRV) / new BN((10 ** 18).toString())) *
    //     (new BN(crv_USD) / new BN((10 ** 18).toString()))
    // );
    NAV3 =
      (new BN(CRV3) / new BN((10 ** 18).toString())) *
      (new BN(crv3_USD) / new BN((10 ** 18).toString()));
    NAV4 =
      (new BN(CRV) / new BN((10 ** 18).toString())) *
      (new BN(crv_USD) / new BN((10 ** 18).toString()));
    console.log("nav 3", NAV3.toString());

    console.log("nav 4", NAV4.toString());
    // let Nav = new BN(new BN(NAV3).add(new BN(NAV4)));
    //  console.log("actural NAV is",Nav.toString())
    ////////////////////////////////////////////////////////////////////
   

    //  MINT LOGIC TO FIND OUT CVX
     cvx_cvxcrv_nav=await mint(CRV);
    // console.log("cvxcrv contract cvx nav",cvx_cvxcrv_nav);
    NavEffective+=new BN(new BN("NAV3").add(new BN("NAV4")).add(new BN("cvx_cvxcrv_nav")))
    console.log("NavEffective",NavEffective)
  };

//  CalcBasepoolReward();
  // CalcCVXRewards();
  // CalcCVXcrv();
  // calcNav();
  //  setUSDvalues();

  setTimeout(() => {
    console.log("-------------basepool Rewards--------------");
  }, 2000);
  setTimeout(() => {
    console.log("CRV", crv_reward);
  }, 2000);

  setTimeout(() => {
    console.log("----------convex reward contract---------");
  }, 2000);
  setTimeout(() => {
    console.log("cvxcrv", cvxcrv_reward);
  }, 2000);
  setTimeout(() => {
    console.log("----------CVXCRV REWARD contract----------");
  }, 2000);
  setTimeout(() => {
    console.log("Crv earned", CRV);
  }, 4000);
  setTimeout(() => {
    console.log("3crv earned", CRV3);
  }, 4000);
  console.log("fuckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")

  setTimeout(() => {
    console.log(typeof(NAV1),typeof(NAV2),typeof(NAV3),typeof(NAV4),typeof(cvx_basepool_nav),typeof(cvx_cvxcrv_nav))

  }, 10000);
  // setTimeout(() => {
    console.log("Nav effectiveee",(NAV1)+(NAV2)+(NAV3)+(NAV4))
    // +(cvx_basepol_nav)+(cvx_cvxcrv_nav)

  // }, 25000);
  setTimeout(() => {
    console.log("type of unresolved",typeof(cvx_basepol_nav),typeof(cvx_cvxcrv_nav))


  }, 25000);
  //  NAV.toString();

  //  setTimeout(() => {  console.log("NAV",parseInt(NAV)); }, 5000);

  setTimeout(() => {
    console.log("effective NAV", "0.00316890075");
  }, 5000);
  // let a = mint(".0000000000003");



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  NAV1,NAV2,NAV3,NAV4,cvx_basepool_nav,cvx_cvxcrv_nav
  // console.log(typeof(NAV1),typeof(NAV2),typeof(NAV3),typeof(NAV4),typeof(cvx_basepool_nav),typeof(cvx_cvxcrv_nav))

  //  setTimeout(() => {  console.log("NAV is",); }, 5000);
};
const mint = async (crvAmount) => {
  try {
    let maxSupply = await ITokenMinterContract.methods.maxSupply().call();

    // console.log("maxsupply", maxSupply);
    let totalCliffs = await ITokenMinterContract.methods.totalCliffs().call();
    // console.log("totalCliffs===", totalCliffs);

    // let totalSupplyContract = new web3.eth.Contract(VaultStorageABI, crv)
    let supply = await ITokenMinterContract.methods.totalSupply().call();
    // console.log("type of supply", typeof supply);
    // console.log("total supplyyyyyy", supply);
    // console.log("type of max supplyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",typeof(totalCliffs));
    let reductionPerCliff = new BN(new BN(maxSupply)).div(new BN(totalCliffs));
    // console.log("reduction per clifff", typeof reductionPerCliff);
    //check value
    // console.log("reductionPerCliff", reductionPerCliff.toString());

    let cvxToBeMinted = crvAmount;
    // console.log("cvx ", cvxToBeMinted); // is initially required ?

    if (parseInt(supply) == 0) {
      console.log("entered supply==0 loop");
      cvxToBeMinted = crvAmount;

      // console.log("cvxToBeMinted=", cvxToBeMinted);
    }
    let cliff = new BN(new BN(supply)).div(new BN(reductionPerCliff));
    // console.log("cliff=", cliff.toString());
    // console.log(
    //   "types of cliff and total cliff ",
    //   typeof cliff,
    //   typeof totalCliffs
    // );
    if (parseInt(cliff.toString()) < parseInt(totalCliffs)) {
      console.log("entered the cliff < total cliff looop");
      reduction = totalCliffs - cliff;
      crvAmount = new BN(crvAmount);
      cvxToBeMinted = crvAmount.mul(new BN(reduction)).div(new BN(totalCliffs));
      // cvxToBeMinted = crvAmount*(reduction)/(totalCliffs);
      let cvx_amount = new BN(cvxToBeMinted).div(new BN((10 ** 18).toString()));
      // console.log("siuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", typeof cvx_amount);
      // console.log("cvxToBeMinted=", cvxToBeMinted.toString());

      let amtTillMax = maxSupply.sub(supply);
      if (cvxToBeMinted > amtTillMax) {
        cvxToBeMinted = amtTillMax;
      }
    }

    // console.log("cvx To be minted=", cvxToBeMinted.toString());
    let cvxUSD = await apContract.methods.getUSDPrice(cvx).call();
    // console.log("cvxUSD=", cvxUSD);

   let NAVofCVXminted = new BN(
      new BN(cvxToBeMinted.toString()).mul(new BN(cvxUSD.toString()))
    );
    let NAVofCVXmintedd = NAVofCVXminted.div(new BN((10 ** 18).toString()));
    let NAV_mint =
      (new BN(cvxToBeMinted) / new BN((10 ** 18).toString())) *
      (new BN(cvxUSD) / new BN((10 ** 18).toString()));
    // console.log("type of mint nav", typeof NAV_mint);
     console.log("mint nav", NAV_mint);
    return NAV_mint;

    // console.log("NAVofCVXmintedd=", NAVofCVXmintedd.toString())
    // console.log("NAVofCVXminted=", NAVofCVXminted.toString())
  } catch (error) {
    console.log(`error inside mint function ${error} ${error.length}`);
  }
};

start();
