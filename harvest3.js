// TO DO MINT LOGIC ON BOTH FUNCTIONS(EXCEPT CONVEX REWARD CONTRACT) AND BN implementation

const Web3 = require("web3")
const web3 = new Web3("http://localhost:8545")
const BN = web3.utils.BN;
  function to18(n) {return web3.utils.toWei(n, "ether");}
  function from18(n) {return web3.utils.fromWei(n, "ether");}
  function to6(n) {return web3.utils.toWei(n, "Mwei");}
  function from6(n) {return web3.utils.fromWei(n, "Mwei");}


//   const convexCrv= new web3.eth.Contract(convexCrvABI,"strategyAddress");


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
      let ITokenMinterABI=require("./build/contracts/ITokenMinter.json").abi;
      let minterdeployedaddress="0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
    //   create contract instances
    let ITokenMinterContract=new web3.eth.Contract(apContractABI,minterdeployedaddress);
    let apContract=new web3.eth.Contract(apContractABI,"0x984F84520495f499Fa67E3316CA8CfffBB87f54E");
    let strategyAddress="0x78c8cBb3042CE92F07053E519ab7f564bDEce9C2";
    let convexCrv= new web3.eth.Contract(convexCrvABI,strategyAddress);
    let convexRewardContract= new web3.eth.Contract(IRewardsABI,convexRewardContractAddress);
    let cvxCrvRewardContract= new web3.eth.Contract(IRewardsABI,cvxCrvRewardContractAddress);
    let base_pool_contract=new web3.eth.Contract(IRewardsABI,basepool_address);
    
    // other variables
    let NAV=new BN("0");
    console.log(typeof(NAV))
    let num1=new BN(NAV);
    console.log(typeof(num1));
    let num=new BN((new BN(NAV)).add(new BN("10")))
    // console.log(num.toString());
    let NAV1=new BN("0");
    let NAV2=new BN("0");
    let NAV3=new BN("0");
    let NAV4=new BN("0");
    

    // CRV CRV3 CVX are rewards from cvcxrv contract
    let crv_reward,cvxcrv_reward,CRV,CRV3,CVX;
    // gettokenprices;
    let crv_USD,cvxcrv_USD,cvx_USD,crv3_USD,rewardToken;
    

    const start= async()=>{
      const calcNav=()=>{
        let Nav=new BN(new BN(NAV1).add(new BN(NAV2)))
        console.log("actural NAV is",Nav.toString())
      }
      console.log("NUM",num);
      console.log("mum type",typeof(num));
    const setUSDvalues= async()=>{
        crv_USD=await apContract.methods.getUSDPrice(crv).call()
    cvxcrv_USD=await apContract.methods.getUSDPrice(crv).call()
    cvx_USD=await apContract.methods.getUSDPrice(cvx).call()
    crv3_USD=await apContract.methods.getUSDPrice(crv3).call()


    }
     await setUSDvalues();
     function decimals(n, d) {
      if ((typeof n !== 'number') || (typeof d !== 'number'))
        return false;
           n = parseFloat(n) || 0;
       return n.toFixed(d);
       }
    
    // function to find basepool rewards
    const CalcBasepoolReward= async ()=>{
        
         crv_reward=await base_pool_contract.methods.earned(strategyAddress).call();
                
        // TODO
        // MINT LOGIC
          // NAV1=new BN(NAV1).add((new BN(crv_reward))/(new BN((10**18).toString()))*(new BN(crv_USD)/new BN((10**18).toString())))
         console.log(typeof("NAV 1 TYPE",NAV1))
        

    } 

    const CalcCVXRewards= async ()=>{
        

         cvxcrv_reward=await convexRewardContract.methods.earned(strategyAddress).call();
         NAV+=parseInt((new BN(cvxcrv_reward))/(new BN((10**18).toString()))*(new BN(cvxcrv_USD)/new BN((10**18).toString())))
          NAV2=(new BN(cvxcrv_reward))/(new BN((10**18).toString()))*(new BN(cvxcrv_USD)/new BN((10**18).toString()))       
         
         
    }

    const CalcCVXcrv= async ()=>{

       CRV=await cvxCrvRewardContract.methods.earned(strategyAddress).call();
    //    extra reward calculation(3crv)
         let extraReward =await cvxCrvRewardContract.methods.extraRewards(0).call();
         let extraRewardContract=new web3.eth.Contract(IRewardsABI,extraReward)
          rewardToken=await extraRewardContract.methods.rewardToken().call()
         CRV3 =await extraRewardContract.methods.earned(strategyAddress).call();
         NAV+=parseInt((new BN(CRV3))/(new BN((10**18).toString()))*(new BN(crv3_USD)/new BN((10**18).toString())))
         NAV+=parseInt((new BN(CRV))/(new BN((10**18).toString()))*(new BN(crv_USD)/new BN((10**18).toString())))
         NAV3=(new BN(CRV3))/(new BN((10**18).toString()))*(new BN(crv3_USD)/new BN((10**18).toString()))
         NAV4=(new BN(CRV))/(new BN((10**18).toString()))*(new BN(crv_USD)/new BN((10**18).toString()))
        //  MINT LOGIC TO FIND OUT CVX


    }


     
     
       CalcBasepoolReward();
     CalcCVXRewards();
     CalcCVXcrv();
      calcNav();
    //  setUSDvalues();

     
     setTimeout(() => { console.log("-------------basepool Rewards--------------") }, 2000);
     setTimeout(() => { console.log("CRV",crv_reward); }, 2000);
     setTimeout(() => { console.log("----------convex reward contract---------") }, 2000);
     setTimeout(() => {  console.log("cvxcrv",cvxcrv_reward); }, 2000);
     setTimeout(() => { console.log("----------CVXCRV REWARD contract----------") }, 2000);
     setTimeout(() => {  console.log("Crv earned",CRV); }, 4000);
     setTimeout(() => {  console.log("3crv earned",CRV3); }, 4000);
    //  NAV.toString();
    
     setTimeout(() => {  console.log("NAV",parseInt(NAV)); }, 5000);
    //  setTimeout(() => {  console.log("NAV is",); }, 5000);
    }
    const mint = async (crvAmount) => {
      try {
          console.log("============called mint()=============")
          let maxSupply = await ITokenMinterContract.methods.maxSupply().call()
          let totalCliffs = await ITokenMinterContract.methods.totalCliffs().call()
          console.log("totalCliffs===", totalCliffs)
  
          let totalSupplyContract = new web3.eth.Contract(VaultStorageABI, crv)
          let supply = await totalSupplyContract.methods.totalSupply().call()
          console.log("supply===", supply)
  
          let reductionPerCliff = maxSupply / totalCliffs;     //check value
          console.log("reductionPerCliff===", reductionPerCliff)
  
          let cvxToBeMinted = crvAmount;
          console.log("cvx =====", cvxToBeMinted)    // is initially required ?
  
          if (supply == 0) {
              cvxToBeMinted = crvAmount;
              console.log("hello")
              console.log("cvxToBeMinted=", cvxToBeMinted)
          }
          let cliff = supply / (reductionPerCliff);
          console.log("cliff=", cliff)
  
          if (cliff < totalCliffs) {
              reduction = totalCliffs - (cliff);
  
              cvxToBeMinted = cvxCrvEarned.mul(reduction).div(totalCliffs);
              console.log("cvxToBeMinted=", cvxToBeMinted)
  
              let amtTillMax = maxSupply.sub(supply);
              if (cvxToBeMinted > amtTillMax) {
                  cvxToBeMinted = amtTillMax;
              }
  
          }
  
          console.log("cvx To be minted=", cvxToBeMinted)
          let cvxUSD = await apContract.methods.getUSDPrice(cvx).call();
          console.log("cvxUSD=", cvxUSD)
  
          NAVofCVXminted = new BN(new BN(cvxToBeMinted.toString()).mul(new BN(cvxUSD.toString())))
          console.log("NAVofCVXminted=", NAVofCVXminted)
      }
      catch (error) {
          console.log(`error inside mint function ${error} )
      }
  }
  
  
  start();
    //  NAV+=(new BN(cvxcrv_reward))*(new BN(cvx_USD));
    //  console.log(NAV)


    //  nav calc
  //   console.log("amount",(new BN(crv_reward))/(new BN((10**18).toString())));
  //   console.log("proper price",new BN(crv_USD)/new BN((10**18).toString()));
  // //  console.log("prop foramt",new BN('1234').add(new BN('1')).toString());
  //    //(new BN(10**18)))
  //    console.log("earned crv in biggest unit",new BN(crv_reward)/  (new BN((10**18).toString)))
  //    console.log("before dividing",(new BN(crv_reward)*new BN(crv_USD)));
     

    
    

     
    

