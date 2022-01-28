const Web3 = require("web3")
const web3 = new Web3("http://localhost:7545")
const BN = web3.utils.BN;

import IERC20 from '.build/contracts/IERC20.json'
import ConvexCRV from '.build/contracts/ConvexCRV.json'
function checkForHarvest(ConvexCRV){
	
    //create instances of required contracts
    const convexRewardContract = await IRewards.at("0xCF50b810E57Ac33B91dCF525C6ddd9881B139332") 
    const cvxCrvRewardContract = await IRewards.at("0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e")
    const apcontract=await IAPContract.at(apcontract_address)
  
    const amountConvexRewards = await convexRewardContract(contract_address).call();
    const amountCvxCRVrewards =  await cvxCrvRewardContract(contract_address).call();
   
    const cvxUSDPrice = apcontract.methods.getUSDPrice(cvxToken_adress).call();
    const cvxcrvUSDPrice = apcontract.methods.getUSDPrice(cvxcrv_Token_adress).call();
    let Nav=(amountCvxCRVrewards *cvxcrvUSDPrice )+(amountConvexRewards *cvxUSDPrice);
    // check for extra rewards in reward contract 1
    const extraRewards_convex_length= await convexRewardContract.methods.extraRewardsLength().call();
    // check
    if (extraRewards_convex_length >0){
          for(var i=0;i<extraRewards_convex_length;i++){
              const rewardTokencontractAddress=await convex_rewardContract.methods.extraRewards(i).call();
              const rewardTokenAddress=await IRewards.at(rewardTokencontractAddress).rewardToken().call();
              //const extraRewardAmount= IERC20.at(rewardTokenAddress).methods.balanceOf(contract_address);
                    const extraRewardAmount=IRewards.at(convexRewardContract).earned(address(this));
  
          let USDValue=apcontract.methods.getUSDPrice(rewardTokenAddress).call();
              let asset_value=extraRewardAmount*USDValue;
              Nav+=asset_value;
          }
     } 
    // check for extra rewards in reward contract 2
  
    const extraRewards_cvxcrv_lenght= await cvxCrvRewardContract.methods.extraRewardsLength().call();
    if (extraRewards_cvxcrv_lenght >0){
           for(let i=0;i<extraRewards_cvxcrv_lenght;i++){
              const rewardTokencontractAddress=await cvxCRVrewardContract.methods.extraRewards(i).call();
              const rewardTokenAddress=await IRewards.at(rewardTokencontractAddress).rewardToken().call();
             // const extraRewardAmount= IERC20.at(rewardTokenAddress).methods.balanceOf(contract_address);
           const extraRewardAmount=IRewards.at(cvxCrvRewardContract).earned(address(this));
              let USDValue=apcontract.methods.getUSDPrice(rewardTokenAddress).call();
              let asset_value=extraRewardAmount*USDValue;
  
              Nav+=asset_value;
  
  
          }
  } 
   
    const Threshold=(5/100)*Nav;
  
    // find out the gas for calling harvest function
    //contract instance is the instance of convexcrv.sol
    // _gasprice ???
    const gas=await contractInstance.methods.harvest().estimateGas({from:address,price:_gasprice});
    const gasCost=gas*_gasprice;
  
    if(gasCost<Threshold){
  
        //call harvest method
         await contractInstance.methods.harvest().call();
    };
  }



  checkForHarvest(ConvexCRV)