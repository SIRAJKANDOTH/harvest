const Web3 = require("web3")
const web3 = new Web3("http://localhost:7545")
const BN = web3.utils.BN;
const calculateReward = async (rewardContract) => {
  try {
let extraRewardsValue=[]; // to store the amount of extraReward Earned
let extraRewards=[]; // to store address of extraReward Tokens earned
let rewardInUSD=[]; //to store the price of reward token in USD


    let convexRewardContractAddress ="0xCF50b810E57Ac33B91dCF525C6ddd9881B139332"; 
    let cvxCrvRewardContractAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";


    let ERC20=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/IERC20.json').abi;
    let apContractABI=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/APContract.json').abi;
    let convexCrvABI=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/ConvexCRV.json').abi
    let convexCrvMinterABI=require('C:/Users/96879/yieldster/yieldster-vault/build/contracts/ConvexCRVMinter.json').abi;
    let IRewardsABI=require("C:/Users/96879/yieldster/yieldster-vault/build/contracts/IRewards.json").abi


    let converCrv= new web3.eth.Contract(convexCrvABI,"0x6df7a3FEf141E9E5791358219d8c0d4f58d394e4");
    let converCrvMinter=new web3.eth.Contract(convexCrvMinterABI,"0x7D63b1518403936DcC5b91DE608a9E24D9f62D66");
    let convexRewardContract= new web3.eth.Contract(IRewardsABI,convexRewardContractAddress);
    let cvxCrvRewardContract= new web3.eth.Contract(IRewardsABI,cvxCrvRewardContractAddress);


    //   //-------------------------------tokens--------------------------------//
  //   dai = await ERC20.at("0x6B175474E89094C44Da98b954EedeAC495271d0F")
  //   usdt = await ERC20.at("0xdac17f958d2ee523a2206206994597c13d831ec7")
  //   usdn = await ERC20.at("0x674C6Ad92Fd080e4004b2312b45f796a192D27a0")
  //   usdc = await ERC20.at("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")
  //   frax = await ERC20.at("0x853d955acef822db058eb8505911ed77f175b99e")
  //   uCrvUSDNToken = await ERC20.at("0x4f3E8F405CF5aFC05D68142F3783bDfE13811522")
  //   crv3 = await ERC20.at("0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490")
  //   cvx=await ERC20.at("0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B")
  //   crv=await ERC20.at("0xD533a949740bb3306d119CC777fa900bA034cd52")
  //   cvxcrv=await ERC20.at("0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7")
  //   //-------------------------------tokens--------------------------------//

  //   //-----------------------BEGIN--TOKEN-TRANSFER------------------------------------------------------//
  // await usdt.methods.transfer(accounts[1], to6("200"))
  //   await usdt.transfer(accounts[1], to6("200"))
  //   await usdc.transfer(accounts[1], to6("200"))
  //   await usdn.transfer(accounts[1], to18("200"))
  //   await frax.transfer(accounts[1], to18("200"))
  //   await uCrvUSDNToken.transfer(accounts[1], to18("200"))
  //   await crv3.transfer(accounts[1], to18("200"))
  //  //-------------------------END--TOKEN-TRANSFER------------------------//

  //  //------------approve tokens to vault-------------------------//
  
  //  await usdt.approve(testVault.address, to6("200"), { from: accounts[1] })
  //  await usdc.approve(testVault.address, to6("200"), { from: accounts[1] })
  //  await usdn.approve(testVault.address, to18("200"), { from: accounts[1] })
  //   await frax.approve(testVault.address, to18("200"), { from: accounts[1] })
  //   await uCrvUSDNToken.approve(testVault.address, to18("200"), { from: accounts[1] })
  //   await crv3.approve(testVault.address, to18("200"), { from: accounts[1] })
  //  //------------ end -approve tokens to vault-------------------------//


  //  console.log("===========================DEPOSIT=============================")
  //       await testVault.methods.deposit(usdt.address, to6("200"), { from: accounts[1] }).call();
  //       await testVault.methods.deposit(usdc.address, to6("200"), { from: accounts[1] }).call();
  //        //await testVault.deposit(frax.address, to18("200"), { from: accounts[1] });
  //        await testVault.methods.deposit(uCrvUSDNToken.address, to18("200"), { from: accounts[1] }).call();
  //        await testVault.methods.deposit(crv3.address, to18("200"), { from: accounts[1] }).call();
  //        await testVault.methods.deposit(usdn.address, to18("200"), { from: accounts[1] }).call();

  //       console.log("===========================DEPOSIT ENDS=============================")
  //  //create instances of required contracts
  //  console.log("===================STRATEGY DEPOSIT=====================")
  //  let earnInstruction =
  //      web3.eth.abi.encodeParameters(['address[3]', 'uint256[3]', 'uint256', 'address[]', 'uint256[]'], [["0x6B175474E89094C44Da98b954EedeAC495271d0F", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "0xdac17f958d2ee523a2206206994597c13d831ec7"], [`${to18("0")}`, `${to6("100")}`, `${to6("100")}`], "1", ["0x4f3E8F405CF5aFC05D68142F3783bDfE13811522","0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490","0x674C6Ad92Fd080e4004b2312b45f796a192D27a0"] ,[`${to18("100")}`,`${to18("100")}`,`${to18("100")}`]]);           
  //    await converCrvMinter.earn(testVault.address, [usdc.address, usdt.address,uCrvUSDNToken.address,crv3.address,usdn.address], [to6("100"), to6("100"),to18("100"),to18("100"),to18("100")], earnInstruction)


//---------------------------------------------------------
let extraRewardLength=await rewardContract.methods.extraRewardsLength().call();
if(extraRewardLength>0){
  let user="0x6df7a3FEf141E9E5791358219d8c0d4f58d394e4"; //convexCrv.address(address(this))
  let cvxBal=await convexRewardContract.methods.balanceOf("0x6df7a3FEf141E9E5791358219d8c0d4f58d394e4")
  let cvxcrvBal=await cvxCrvRewardContract.methods.balanceOf("0x6df7a3FEf141E9E5791358219d8c0d4f58d394e4")
  
  for (uint256 i = 0; i < extraRewardLength; i++){
    extraRewardsValue[i]=await rewardContract.methods.earned("0x6df7a3FEf141E9E5791358219d8c0d4f58d394e4").call();
    extraRewards[i]=await cvxCrvRewardContract.methods.rewardToken().call();  //no getting exact revert token
    rewardInUSD[i]=await priceModule.methods.getUSDPrice(extraRewards[i]).call() //get price coingecko

  }

}








   //---------------------------------------------
    let netId=await web3.eth.net.getId()
    console.log("netId==",netId)
    
    
   let extraRewardLength=await cvxCrvRewardContract.methods.extraRewardsLength().call();
   console.log("extra reward length of cvxCrvReward contract is==",extraRewardLength);


   let extraReward=await cvxCrvRewardContract.methods.extraRewards(0).call(); // array
   console.log("extraReward is",extraReward);

   let extraRewardToken=await cvxCrvRewardContract.methods.rewardToken().call(); 
    console.log("extraRewardToken is ==",extraRewardToken)

   let rewardEarned=await cvxCrvRewardContract.methods.earned("0x6df7a3FEf141E9E5791358219d8c0d4f58d394e4").call();
   console.log("extraReward earned by this contract is ",rewardEarned);


  // token[i]=IRewards(IRewards(cvxcrvRewardContract).extraRewards(i)).rewardToken();
  console.log("hello")
  
    
  } catch (error) {
      console.log(`error ${error}`)
  }

}
calculateReward(rewardContractAddress);

// function checkForHarvest(ConvexCRV){
	
//     //create instances of required contracts
//     let convexRewardContract ="0xCF50b810E57Ac33B91dCF525C6ddd9881B139332"; 
//     let cvxCrvRewardContract = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e";
//     let apContractABI=require('C:/Users/s96879\yieldster\yieldster-vault\build\contracts\APContract.json').abi;
//     let convexCrvABI=require('build\contracts\ConvexCRV.json').abi
//     let convexCrv= new web3.eth.Contract(convexCrvABI, '0x7dF98189D32aa4e92649dBe5d837126bE4e53d1B');


//      let apcontract=await IAPContract.at(apcontract_address)
  
//      let amountConvexRewards = await convexRewardContract(contract_address).call();
//      const amountCvxCRVrewards =  await cvxCrvRewardContract(contract_address).call();
   
//     const cvxUSDPrice = apcontract.methods.getUSDPrice(cvxToken_adress).call();
//     const cvxcrvUSDPrice = apcontract.methods.getUSDPrice(cvxcrv_Token_adress).call();
//     let Nav=(amountCvxCRVrewards *cvxcrvUSDPrice )+(amountConvexRewards *cvxUSDPrice);
//     // check for extra rewards in reward contract 1
//     const extraRewards_convex_length= await convexRewardContract.methods.extraRewardsLength().call();
//     // check
//     if (extraRewards_convex_length >0){
//           for(var i=0;i<extraRewards_convex_length;i++){
//               const rewardTokencontractAddress=await convex_rewardContract.methods.extraRewards(i).call();
//               const rewardTokenAddress=await IRewards.at(rewardTokencontractAddress).rewardToken().call();
//               //const extraRewardAmount= IERC20.at(rewardTokenAddress).methods.balanceOf(contract_address);
//                     const extraRewardAmount=IRewards.at(convexRewardContract).earned(address(this));
  
//           let USDValue=apcontract.methods.getUSDPrice(rewardTokenAddress).call();
//               let asset_value=extraRewardAmount*USDValue;
//               Nav+=asset_value;
//           }
//      } 
//     // check for extra rewards in reward contract 2
  
//     const extraRewards_cvxcrv_lenght= await cvxCrvRewardContract.methods.extraRewardsLength().call();
//     if (extraRewards_cvxcrv_lenght >0){
//            for(let i=0;i<extraRewards_cvxcrv_lenght;i++){
//               const rewardTokencontractAddress=await cvxCRVrewardContract.methods.extraRewards(i).call();
//               const rewardTokenAddress=await IRewards.at(rewardTokencontractAddress).rewardToken().call();
//              // const extraRewardAmount= IERC20.at(rewardTokenAddress).methods.balanceOf(contract_address);
//            const extraRewardAmount=IRewards.at(cvxCrvRewardContract).earned(address(this));
//               let USDValue=apcontract.methods.getUSDPrice(rewardTokenAddress).call();
//               let asset_value=extraRewardAmount*USDValue;
  
//               Nav+=asset_value;
  
  
//           }
//   } 
   
//     const Threshold=(5/100)*Nav;
  
//     // find out the gas for calling harvest function
//     //contract instance is the instance of convexcrv.sol
//     // _gasprice ???
//     const gas=await contractInstance.methods.harvest().estimateGas({from:address,price:_gasprice});
//     const gasCost=gas*_gasprice;
  
//     if(gasCost<Threshold){
  
//         //call harvest method
//          await contractInstance.methods.harvest().call();
//     };
//   }



 //checkForHarvest(ConvexCRV)