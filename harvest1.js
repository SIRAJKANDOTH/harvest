const Web3 = require("web3")
const web3 = new Web3("http://localhost:7545")
const BN = web3.utils.BN;
var estimatedgas;
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

// let gasPercent = '500';
// totalEarnedAMount = '1000000000000000000000000';
// let harvestCriteria=(new BN(totalEarnedAMount)).mul((new BN(gasPercent)).div(new BN('10000')))

// let totalGas = '10000000000000'

// if((new BN(totalGas)).lt(harvestCriteria)) {
//     //Then call harvest
// }


//to estimate gas cost of harvest function
const harvest = async () => {
    try {
      let convexCrvABI=require('./build/contracts/ConvexCRV.json').abi
      let netId=await web3.eth.net.getId()
      console.log("netId==",netId)
      //let convexCrvData=convexCrvABI.networks[netId]
        const converCrv= new web3.eth.Contract(convexCrvABI,"0xE589F110d6e3F631011353AC9C071576c55D0e7c");
        const enc= await web3.eth.abi.encodeFunctionSignature({
          name: 'harvest',
          type: 'function',
          inputs: [{
      
          }]
      })
  
      console.log("encoded enc ",enc)
  
      estimatedgas=await web3.eth.estimateGas({
          to: "0xE589F110d6e3F631011353AC9C071576c55D0e7c", 
          data: enc
      });
      console.log("estimated gas is",estimatedgas);    
      
    } catch (error) {
        console.log(`error ${error}`)
    }
  
  }

  const calculateReward = async () => {
    try {
  let extraRewardsValue=[]; // to store the amount of extraReward Earned
  let extraReward=[]; // to store address of extraReward Tokens earned
  let rewardInUSD=[]; //to store the price of reward token in USD
      let convexPool=[]; // to store array retured from poolInfo
      let poolId=13;

      let dai = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
      //let usdt = "0xdac17f958d2ee523a2206206994597c13d831ec7"
      let usdn = "0x674C6Ad92Fd080e4004b2312b45f796a192D27a0"
      let usdc = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      let frax = "0x853d955acef822db058eb8505911ed77f175b99e"
      let uCrvUSDNToken = "0x4f3E8F405CF5aFC05D68142F3783bDfE13811522"
      let crv3 = "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490"
    //  let cvx="0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B"
     // let crv="0xD533a949740bb3306d119CC777fa900bA034cd52"
     // let cvxcrv="0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7"


        const vaultAddress="0xfFe2d0F01Cd7cC096F3426a1a9Ea8a1cd992bA58";
        const vaultActiveStrategy="0x6D3Ed0f0aD4B4a514707cd3a63bBBF05261c29D0";
      let cvx = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
      let cvxcrv = "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7";
      let usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      let crv = "0xD533a949740bb3306d119CC777fa900bA034cd52";
  
      const convexDeposit = "0xF403C135812408BFbE8713b5A23a04b3D48AAE31";
      const convexRewardContractAddress ="0xCF50b810E57Ac33B91dCF525C6ddd9881B139332"; 
      const cvxCrvRewardContractAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";
  
  
      let ERC20=require('./build/contracts/IERC20.json').abi;
      let apContractABI=require('./build/contracts/APContract.json').abi;
      let convexCrvABI=require('./build/contracts/ConvexCRV.json').abi
     // let convexCrvMinterABI=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/ConvexCRVMinter.json').abi;
      let IRewardsABI=require("./build/contracts/IRewards.json").abi
      let IConvexABI=require('./build/contracts/IConvex.json').abi
      let IYieldsterVaultABI=require('./build/contracts/IYieldsterVault.json').abi
      let yieldsterVaultABI=require("./build/contracts/YieldsterVault.json").abi
  
      let apContract=new web3.eth.Contract(apContractABI,"0x6612C12093356C7B873F390f2940ad8d9F9E7924");
      let converCrv= new web3.eth.Contract(convexCrvABI,"0xE589F110d6e3F631011353AC9C071576c55D0e7c");
      //let converCrvMinter=new web3.eth.Contract(convexCrvMinterABI,"0x7D63b1518403936DcC5b91DE608a9E24D9f62D66");
      let convexRewardContract= new web3.eth.Contract(IRewardsABI,convexRewardContractAddress);
      let cvxCrvRewardContract= new web3.eth.Contract(IRewardsABI,cvxCrvRewardContractAddress);
      let convexDepositContract= new web3.eth.Contract(IConvexABI,convexDeposit);
      let yieldsterVaultContract=new web3.eth.Contract(yieldsterVaultABI,vaultAddress);

      let earnInstruction =
       web3.eth.abi.encodeParameters(['address[3]', 'uint256[3]', 'uint256', 'address[]', 'uint256[]'], [["0x6B175474E89094C44Da98b954EedeAC495271d0F", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xdac17f958d2ee523a2206206994597c13d831ec7"], [`${to18("0")}`, `${to6("2000")}`, `${to6("2000")}`], "1", ["0x4f3E8F405CF5aFC05D68142F3783bDfE13811522","0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490","0x674C6Ad92Fd080e4004b2312b45f796a192D27a0"] ,[`${to18("2000")}`,`${to18("2000")}`,`${to18("2000")}`]]);
        //console.log("earnInstruction=",earnInstruction)


    //  console.log("hey",await yieldsterVaultContract.methods.earn([usdc.address, usdt.address,uCrvUSDNToken.address,crv3.address,usdn.address], [to6("2000"), to6("2000"),to18("2000"),to18("2000"),to18("2000")], earnInstruction).call());
     
    //encoding earn functionCAll

    
    
    convexPool=await convexDepositContract.methods.poolInfo(poolId).call();
      console.log("base Reward pool=",convexPool[3])
    //  await convexDepositContract.methods.deposit(poolId,new BN('100'),true).send({from:"0x1c9335a34528882A2d80E944B641396177251b99"})
      let extraRewardLength=await cvxCrvRewardContract.methods.extraRewardsLength().call();
      console.log("extraRewardLength is",extraRewardLength)
      let earned=await cvxCrvRewardContract.methods.earned("0xE589F110d6e3F631011353AC9C071576c55D0e7c").call();
        console.log("earned=",earned)

        let earned2=await cvxCrvRewardContract.methods.earned(vaultAddress).call();
        console.log("earned=",earned2)
      let cvxBal=await convexRewardContract.methods.balanceOf("0xE589F110d6e3F631011353AC9C071576c55D0e7c").call()
      
      console.log("cvxBal is",cvxBal)
      let cvxcrvBal=await cvxCrvRewardContract.methods.balanceOf("0xE589F110d6e3F631011353AC9C071576c55D0e7c").call()
      console.log("cvxcrvBal is",cvxcrvBal)
  
      let cvxUSD=await apContract.methods.getUSDPrice(cvx).call();
      console.log("cvxUSD",cvxUSD)
      let cvxcrvUSD=await apContract.methods.getUSDPrice(crv).call();
      console.log("cvxcrvUSD",cvxcrvUSD)

  
      let NAV=((cvxBal*cvxUSD)+(cvxcrvBal*cvxcrvUSD))
      console.log("NAV is",NAV)
  
      if(extraRewardLength>0){
      let user="0xE589F110d6e3F631011353AC9C071576c55D0e7c"; //convexCrv.address(address(this))
      
      
      for (let i = 0; i < extraRewardLength; i++){
          extraRewardsValue[i]=await cvxCrvRewardContract.methods.earned("0xE589F110d6e3F631011353AC9C071576c55D0e7c").call();
            console.log("extraRewardsValue earned by address(this)",extraRewardsValue[i] )
          extraReward[i]=await cvxCrvRewardContract.methods.extraRewards(i).call();  //no getting exact revert token
         // console.log("extraReward ",extraReward[i] )
          //to find the reward Token
           let extraRewardContract=new web3.eth.Contract(IRewardsABI,extraReward[i])
          let rewardToken=await extraRewardContract.methods.rewardToken().call()
          let rewardTokenBalanceContract  =new web3.eth.Contract(ERC20,rewardToken)

          console.log("rewardToken is",rewardToken)
          //await extraRewardContract.methods.getReward().call()
          if(extraRewardsValue[i]>0){
            await rewardTokenBalanceContract.methods.transfer("0xE589F110d6e3F631011353AC9C071576c55D0e7c",extraRewardsValue[i])
          }
          console.log("hey")
          
          let rewardTokenBalance=await rewardTokenBalanceContract.methods.balanceOf("0xE589F110d6e3F631011353AC9C071576c55D0e7c").call()
            console.log("rewardTokenBalance",rewardTokenBalance)
          rewardInUSD[i]=await apContract.methods.getUSDPrice(rewardToken).call() //get price coingecko
          NAV+=(rewardTokenBalance*rewardInUSD[i]);
          //NAV+=(extraRewardsValue[i]*rewardInUSD[i]);
      }
  
      }
      console.log("NAV is",NAV)
      let Threshold=(5/100)*NAV;
      console.log("Threshold" ,Threshold)
      await harvest();
      console.log("after harvest")
      console.log("estimatedgas",estimatedgas)
      if(estimatedgas<Threshold){
        await converCrv.methods.harvest().send()
        console.log("helloo in if")
      }
      
    } catch (error) {
        console.log(`error ${error}`)
    }
  
  }
  calculateReward();
































// const Web3 = require("web3")
// const web3 = new Web3("http://localhost:7545")
// const BN = web3.utils.BN;
// const poolId=13
// var estimatedgas;
// let gasPercent = '500';
// //totalEarnedAMount = '1000000000000000000000000';
// // let harvestCriteria=(new BN(totalEarnedAMount)).mul((new BN(gasPercent)).div(new BN('10000')))

// // let totalGas = '10000000000000'

// // if((new BN(totalGas)).lt(harvestCriteria)) {
// //     //Then call harvest
// // }
// //to estimate gas cost of harvest function
// const harvest = async () => {
//     try {
//       let convexCrvABI=require('C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/ConvexCRV.json').abi
//       let netId=await web3.eth.net.getId()
//       console.log("netId==",netId)
//       //let convexCrvData=convexCrvABI.networks[netId]
//         const converCrv= new web3.eth.Contract(convexCrvABI,"0xE589F110d6e3F631011353AC9C071576c55D0e7c");
//         const enc= await web3.eth.abi.encodeFunctionSignature({
//           name: 'harvest',
//           type: 'function',
//           inputs: [{
      
//           }]
//       })
  
//       console.log("encoded enc ",enc)
  
//       estimatedgas=await web3.eth.estimateGas({
//           to: "0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B", 
//           data: enc
//       });
//       console.log("estimated gas is",estimatedgas);    
      
//     } catch (error) {
//         console.log(`error ${error}`)
//     }
  
//   }

//   const calculateReward = async () => {
//     try {
//   let extraRewardsValue=[]; // to store the amount of extraReward Earned
//   let extraReward=[]; // to store address of extraReward Tokens earned
//   let rewardInUSD=[]; //to store the price of reward token in USD
  
//       let cvx = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
//       let cvxcrv = "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7";
//       let usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
//       let crv = "0xD533a949740bb3306d119CC777fa900bA034cd52";
  
//       let convexRewardContractAddress ="0xCF50b810E57Ac33B91dCF525C6ddd9881B139332"; 
//       let cvxCrvRewardContractAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";
  
  
//       let ERC20=require('C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/IERC20.json').abi;
//       let apContractABI=require('C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/APContract.json').abi;
//       let convexCrvABI=require('C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/ConvexCRV.json').abi
//      // let convexCrvMinterABI=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/ConvexCRVMinter.json').abi;
//       let IRewardsABI=require("C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/IRewards.json").abi
  
//       let apContract=new web3.eth.Contract(apContractABI,"0x7ABEECDdc747B1854b6E9B78025180b40068e771");
//       let converCrv= new web3.eth.Contract(convexCrvABI,"0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B");
//       //let converCrvMinter=new web3.eth.Contract(convexCrvMinterABI,"0x7D63b1518403936DcC5b91DE608a9E24D9f62D66");
//       let convexRewardContract= new web3.eth.Contract(IRewardsABI,convexRewardContractAddress);
//       let cvxCrvRewardContract= new web3.eth.Contract(IRewardsABI,cvxCrvRewardContractAddress);
  
  
//       let extraRewardLength=await cvxCrvRewardContract.methods.extraRewardsLength().call();
//       console.log("extraRewardLength is",extraRewardLength)
//       let cvxBal=await convexRewardContract.methods.balanceOf("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B").call()
      
//       console.log("cvxBal is",cvxBal)
//       let cvxcrvBal=await cvxCrvRewardContract.methods.balanceOf("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B").call()
//       console.log("cvxcrvBal is",cvxcrvBal)
  
//       let cvxUSD=await apContract.methods.getUSDPrice(cvx).call();
//       console.log("hello")
//       console.log("cvxUSD",cvxUSD)
//       let cvxcrvUSD=await apContract.methods.getUSDPrice(crv).call();
//       console.log("cvxcrvUSD",cvxcrvUSD)

  
//       let NAV=((cvxBal*cvxUSD)+(cvxcrvBal*cvxcrvUSD))
//       console.log("NAV is",NAV)
  
//       if(extraRewardLength>0){
//       let user="0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B"; //convexCrv.address(address(this))
      
      
//       for (i = 0; i < extraRewardLength; i++){
//           extraRewardsValue[i]=await cvxCrvRewardContract.methods.earned("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B").call();
//             console.log("extraRewardsValue earned by address(this)",extraRewardsValue[i] )
//           extraReward[i]=await cvxCrvRewardContract.methods.extraRewards(i).call();  //no getting exact revert token
//          // console.log("extraReward ",extraReward[i] )
//           //to find the reward Token
//            let extraRewardContract=new web3.eth.Contract(IRewardsABI,extraReward[i])
//           let rewardToken=await extraRewardContract.methods.rewardToken().call()
//           let rewardTokenBalanceContract  =new web3.eth.Contract(ERC20,rewardToken)

//           console.log("rewardToken is",rewardToken)
//           //await extraRewardContract.methods.getReward().call()
//           if(extraRewardsValue[i]>0){
//             await rewardTokenBalanceContract.methods.transfer("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B",extraRewardsValue[i])
//           }
//           console.log("hey")
          
//           let rewardTokenBalance=await rewardTokenBalanceContract.methods.balanceOf("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B").call()
//           console.log("rewardTokenBalance",rewardTokenBalance)
//           rewardInUSD[i]=await apContract.methods.getUSDPrice(rewardToken).call() //get price coingecko
//           NAV+=(rewardTokenBalance*rewardInUSD[i]);
//           //NAV+=(extraRewardsValue[i]*rewardInUSD[i]);
//       }
  
//       }
//       console.log("NAV is",NAV)
//       let Threshold=(5/100)*NAV;
//       console.log("Threshold" ,Threshold)
//       await harvest();
//       console.log("after harvest")
//       console.log("estimatedgas",estimatedgas)
//       if(estimatedgas<Threshold){
//         await converCrv.methods.harvest().send()
//         console.log("helloo in if")
//       }
      
//     } catch (error) {
//         console.log(`error ${error}`)
//     }
  
//   }
//   calculateReward();

// // const calculateReward = async (rewardContract) => {
// //   try {
// // let extraRewardsValue=[]; // to store the amount of extraReward Earned
// // let extraRewards=[]; // to store address of extraReward Tokens earned
// // let rewardInUSD=[]; //to store the price of reward token in USD

// //     let cvx = "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B";
// //     let cvxcrv = "0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7";

// //     let convexRewardContractAddress ="0xCF50b810E57Ac33B91dCF525C6ddd9881B139332"; 
// //     let cvxCrvRewardContractAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";


// //     let ERC20=require('C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/IERC20.json').abi;
// //     let apContractABI=require('C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/APContract.json').abi;
// //     let convexCrvABI=require('C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/ConvexCRV.json').abi
// //    // let convexCrvMinterABI=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/ConvexCRVMinter.json').abi;
// //     let IRewardsABI=require("C:/Users/Admin/Yieldster-Framework/yieldster-vault/yieldster-vault/build/contracts/IRewards.json").abi

// //     let apContract=new web3.eth.Contract(apContractABI,"0x7ABEECDdc747B1854b6E9B78025180b40068e771");
// //     let converCrv= new web3.eth.Contract(convexCrvABI,"0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B");
// //     //let converCrvMinter=new web3.eth.Contract(convexCrvMinterABI,"0x7D63b1518403936DcC5b91DE608a9E24D9f62D66");
// //     let convexRewardContract= new web3.eth.Contract(IRewardsABI,convexRewardContractAddress);
// //     let cvxCrvRewardContract= new web3.eth.Contract(IRewardsABI,cvxCrvRewardContractAddress);


// //     let extraRewardLength=await rewardContract.methods.extraRewardsLength().call();
// //     let cvxBal=await convexRewardContract.methods.balanceOf("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B")
// //     let cvxcrvBal=await cvxCrvRewardContract.methods.balanceOf("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B")

// //     let cvxUSD=await apContractABI.methods.getUSDPrice(cvx);
// //     let cvxcrvUSD=await apContractABI.methods.getUSDPrice(cvxcvr);

// //     let NAV=((cvxBal*cvxUSD)+(cvxcrvBal*cvxcrvUSD))

// //     if(extraRewardLength>0){
// //     let user="0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B"; //convexCrv.address(address(this))
    
    
// //     for (i = 0; i < extraRewardLength; i++){
// //         extraRewardsValue[i]=await rewardContract.methods.earned("0xd4d5BFC4992b1BD4D13CD95E67523B32c9c2DB9B").call();
// //         extraRewards[i]=await cvxCrvRewardContract.methods.rewardToken().call();  //no getting exact revert token
// //         rewardInUSD[i]=await apContract.methods.getUSDPrice(extraRewards[i]).call() //get price coingecko
// //         NAV+=(extraRewardsValue[i]*rewardInUSD[i]);

// //     }

// //     }

// //     let Threshold=(5/100)*NAV;
// //     harvest();
// //     if(estimatedgas<Threshold){
// //     await converCrv.methods.harvest().call()
// //     }
    
// //   } catch (error) {
// //       console.log(`error ${error}`)
// //   }

// // }
// // calculateReward(rewardContractAddress);

   
