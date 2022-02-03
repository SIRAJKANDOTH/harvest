// TO DO MINT LOGIC ON BOTH FUNCTIONS(EXCEPT CONVEX REWARD CONTRACT) AND BN implementation

const Web3 = require("web3")
const web3 = new Web3("http://localhost:8545")
const BN = web3.utils.BN;
  function to18(n) {return web3.utils.toWei(n, "ether");}
  function from18(n) {return web3.utils.fromWei(n, "ether");}
  function to6(n) {return web3.utils.toWei(n, "Mwei");}
  function from6(n) {return web3.utils.fromWei(n, "Mwei");}


//   const convexCrv= new web3.eth.Contract(convexCrvABI,"0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD");


// req variables
      let cvx = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
      let cvxcrv = "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7";
      let crv = "0xD533a949740bb3306d119CC777fa900bA034cd52";
      let crv3="0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490";
      let convexRewardContractAddress ="0xCF50b810E57Ac33B91dCF525C6ddd9881B139332";
      let cvxCrvRewardContractAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";
      let basepool_address="0x4a2631d090e8b40bBDe245e687BF09e5e534A239";
      let convexCrvABI=require('./build/contracts/ConvexCRV.json').abi
      let ERC20=require('./build/contracts/IERC20.json').abi;
      let apContractABI=require('./build/contracts/APContract.json').abi;
      let IRewardsABI=require("./build/contracts/IRewards.json").abi
    //   create contract instances
    let apContract=new web3.eth.Contract(apContractABI,"0x984F84520495f499Fa67E3316CA8CfffBB87f54E");
    let convexCrv= new web3.eth.Contract(convexCrvABI,"0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD");
    let convexRewardContract= new web3.eth.Contract(IRewardsABI,convexRewardContractAddress);
    let cvxCrvRewardContract= new web3.eth.Contract(IRewardsABI,cvxCrvRewardContractAddress);
    let base_pool_contract=new web3.eth.Contract(IRewardsABI,basepool_address);
    // other variables
    let NAV=new BN();
    // CRV CRV3 CVX are rewards from cvcxrv contract
    let crv_reward,cvxcrv_reward,CRV,CRV3,CVX;
    // gettokenprices;
    let crv_USD,cvxcrv_USD,cvx_USD,crv3_USD,rewardToken;
    // crv_USD=await apContract.methods.getUSDPrice(crv).call()
    // cvxcrv_USD=await apContract.methods.getUSDPrice(crv).call()
    // cvx_USD=await apContract.methods.getUSDPrice(crv).call()
    // crv3_USD=await apContract.methods.getUSDPrice(rewardToken).call()


    const setUSDvalues= async()=>{
        crv_USD=await apContract.methods.getUSDPrice(crv).call()
    cvxcrv_USD=await apContract.methods.getUSDPrice(crv).call()
    cvx_USD=await apContract.methods.getUSDPrice(cvx).call()
    crv3_USD=await apContract.methods.getUSDPrice(crv3).call()


    }
    setUSDvalues();
    
    // function to find basepool rewards
    const CalcBasepoolReward= async ()=>{
        
         crv_reward=await base_pool_contract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call();
        //  console.log("CRV",crv_reward);
        // TODO
        // MINT LOGIC
        // NAV+=(from18(crv_reward))*((crv_USD)/10**18);

       

    } 

    const CalcCVXRewards= async ()=>{
        
         cvxcrv_reward=await convexRewardContract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call();
         NAV+=(new BN(from18(cvxcrv_reward)))*(new BN((cvx_USD)));
        //  let NAVofCvx=(new BN(cvxEarned)*(new BN(cvxUSD)))
        //  console.log(NAV)
        crv_USD=await apContract.methods.getUSDPrice(crv).call()
        // console.log("price",cvx_USD)
         
         
    }

    const CalcCVXcrv= async ()=>{

       CRV=await cvxCrvRewardContract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call();
    //    extra reward calculation(3crv)
         let extraReward =await cvxCrvRewardContract.methods.extraRewards(0).call();
         let extraRewardContract=new web3.eth.Contract(IRewardsABI,extraReward)
          rewardToken=await extraRewardContract.methods.rewardToken().call()
         CRV3 =await extraRewardContract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call();
        //  NAV+=(from18(CRV))*((crv_USD)/10**18)+(from18(CRV3))*((crv3_USD)/10**18)
        //  MINT LOGIC TO FIND OUT CVX

 



    }
     
     CalcBasepoolReward();
     CalcCVXRewards();
     CalcCVXcrv();
     setUSDvalues();

     
     setTimeout(() => { console.log("-------------------basepool--------------") }, 2000);
     setTimeout(() => { console.log("CRV",crv_reward); }, 2000);
     setTimeout(() => { console.log("----------convex reward contract---------") }, 2000);
     setTimeout(() => {  console.log("cvxcrv",cvxcrv_reward); }, 2000);
     setTimeout(() => { console.log("----------CVXCRV REWARD CONTRACT----------") }, 2000);
     setTimeout(() => {  console.log("Crv earned",CRV); }, 4000);
     setTimeout(() => {  console.log("3crv earned",CRV3); }, 4000);
     setTimeout(() => {  console.log("NAV",NAV); }, 10000);
    //  NAV+=(new BN(cvxcrv_reward))*(new BN(cvx_USD));
    //  console.log(NAV)


    //  nav calc

    
    

     
    

