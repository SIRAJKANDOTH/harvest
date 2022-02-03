const Web3 = require("web3")
const web3 = new Web3("http://localhost:8545")
const BN = web3.utils.BN;
let estimatedgas;
// MIM, 3CRV, alUSD, Frax, USDN
//to estimate gas cost of GasCheck function
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
const GasCheck = async () => {
    try {
      let convexCrvABI=require('./build/contracts/ConvexCRV.json').abi
      let netId=await web3.eth.net.getId()
      // 02console.log("netId==",netId)
      //let convexCrvData=convexCrvABI.networks[netId]
        const converCrv= new web3.eth.Contract(convexCrvABI,"0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD");
        const enc= await web3.eth.abi.encodeFunctionSignature({
          name: 'harvest',
          type: 'function',
          inputs: [{
     
          }]
      })
 
      // console.log("encoded enc ",enc)
 
      estimatedgas=await web3.eth.estimateGas({
          to: "0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD",
          data: enc
      });
      // console.log("estimated gas is",estimatedgas);    
     
    } catch (error) {
        console.log(`gas estimation error: ${error}`)
    }
 
  }

  const calculateReward = async () => {
    try {
  let extraRewardsValue=[]; // to store the amount of extraReward Earned
  let extraReward=[]; // to store address of extraReward Tokens earned
  let rewardInUSD=[]; //to store the price of reward token in USD
 
      let cvx = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
      let cvxcrv = "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7";
      let usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      let crv = "0xD533a949740bb3306d119CC777fa900bA034cd52";
 
      let convexRewardContractAddress ="0xCF50b810E57Ac33B91dCF525C6ddd9881B139332";
      let cvxCrvRewardContractAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";
 
 
      let ERC20=require('./build/contracts/IERC20.json').abi;
      let apContractABI=require('./build/contracts/APContract.json').abi;
      let convexCrvABI=require('./build/contracts/ConvexCRV.json').abi
     // let convexCrvMinterABI=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/ConvexCRVMinter.json').abi;
      let IRewardsABI=require("./build/contracts/IRewards.json").abi
 
      let apContract=new web3.eth.Contract(apContractABI,"0x984F84520495f499Fa67E3316CA8CfffBB87f54E");
      let converCrv= new web3.eth.Contract(convexCrvABI,"0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD");
      //let converCrvMinter=new web3.eth.Contract(convexCrvMinterABI,"0x7D63b1518403936DcC5b91DE608a9E24D9f62D66");
      let convexRewardContract= new web3.eth.Contract(IRewardsABI,convexRewardContractAddress);
      let cvxCrvRewardContract= new web3.eth.Contract(IRewardsABI,cvxCrvRewardContractAddress);
 
 
      let extraRewardLength=await cvxCrvRewardContract.methods.extraRewardsLength().call();
      console.log("extraRewardLength is",extraRewardLength)
      // console.log("this changed");
      let cvxBal=await convexRewardContract.methods.balanceOf("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call()
      // console.log("balance in proper decimals",await from18(cvxBal));
     
      console.log("cvxBal is(balanceOf)",cvxBal)
      let cvxcrvBal=await cvxCrvRewardContract.methods.balanceOf("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call()
      console.log("cvxcrvBal is(balanceOf)",cvxcrvBal)
 
      let cvxUSD=await apContract.methods.getUSDPrice(cvx).call();
      console.log("cvxUSD",cvxUSD)
      let cvxcrvUSD=await apContract.methods.getUSDPrice(crv).call();
      console.log("cvxcrvUSD",cvxcrvUSD)

 
      let NAV=((from18(cvxBal)*(cvxUSD/10**18))+(from18(cvxcrvBal)*(cvxcrvUSD/10**18)))
      console.log("NAV is(balanceOf)",NAV)
      let cvxcrv_earned=await cvxCrvRewardContract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call();
            console.log("earned cvxcrv",cvxcrv_earned);
            let cvx_earned=await convexRewardContract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call();
            console.log("earned cvx",cvx_earned);
            let NAV_earned=((from18(cvx_earned)*(cvxUSD/10**18))+(from18(cvxcrv_earned)*(cvxcrvUSD/10**18)))
            // console.log("NAV (earned)",NAV_earned);
      if(extraRewardLength>0){
      // let user="0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B"; //convexCrv.address(address(this))
     
     
      for (i = 0; i < extraRewardLength; i++){
            

          // extraRewardsValue[i]=await cvxRewardContract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call();
            // console.log("RewardsValue earned by strategy",extraRewardsValue[i] )
          extraReward[i]=await cvxCrvRewardContract.methods.extraRewards(i).call();  //no getting exact revert token
         console.log("extraReward conrtract",extraReward[i] );
          //to find the reward Token
           let extraRewardContract=new web3.eth.Contract(IRewardsABI,extraReward[i])
          let rewardToken=await extraRewardContract.methods.rewardToken().call()
          let rewardTokenBalanceContract  =new web3.eth.Contract(ERC20,rewardToken)

          console.log("extra rewardToken is",rewardToken)
          //await extraRewardContract.methods.getReward().call()
          // if(extraRewardsValue[i]>0){
          //   await rewardTokenBalanceContract.methods.transfer("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD",extraRewardsValue[i])
          // }
          // console.log("hey")
          // let rewardTokenBalance_new=await extraRewardContract.methods.balanceOf("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call()
          // console.log("reward contract balance(rewardtoken.balanceof(strategy))",rewardTokenBalance_new);
          let rewardTokenBalance=await extraRewardContract.methods.balanceOf("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call()
          let rewardTokenBalance_earned=await extraRewardContract.methods.earned("0x320f41a905D2cd4Dc0FbC19bEb78e809A4cc43AD").call()
          console.log("extra rewardTokenBalance(earned)",rewardTokenBalance_earned);
          

            console.log("extra rewardTokenBalance(balanceof)",rewardTokenBalance)

          rewardInUSD[i]=await apContract.methods.getUSDPrice(rewardToken).call() 
          // console.log("extra reward USD price",rewardInUSD[i]);
          //get price coingecko
            NAV+=(from18(rewardTokenBalance)*(rewardInUSD[i]/10**18));
            NAV_earned+=(from18(rewardTokenBalance_earned))*((rewardInUSD[i])/10**18);
            console.log("NAV (when earn is calld)",NAV_earned);
          //NAV+=(extraRewardsValue[i]*rewardInUSD[i]);
      }
 
      }
      console.log("NAV is",NAV)
      let Threshold=(5/100)*NAV;
      // console.log("Threshold" ,Threshold.toString())
      console.log("Threshold(5% Nav)" ,Threshold)
       await GasCheck();
      // console.log("after GasCheck")
      console.log("estimatedgas:",estimatedgas)
      let price =0.0003 ;
      let gascost=estimatedgas*price;
      console.log("gas price in USD",price);
      console.log("Gas cost",gascost);
      

      
      if(gascost<Threshold){
        await converCrv.methods.harvest();
        console.log("harvest() called");
      }
      else{
        console.log("gas cost is higher than threshold,harvest not called");
      }
     
    } catch (error) {
        console.log(`error inside GasCheck check ${error} `)
    }
 
  }
  calculateReward();