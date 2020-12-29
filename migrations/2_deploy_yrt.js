var yrToken = artifacts.require("./yrToken.sol");
var GnosisSafe = artifacts.require("./GnosisSafe.sol");

// module.exports =  async function(deployer) {
//    let token = await deployer.deploy(yrToken,400000000000);
//    await deployer.deploy(GnosisSafe,token);
// };

module.exports =  function(deployer) {
   deployer.deploy(yrToken,400000000000)
   .then(()=>{
      return deployer.deploy(GnosisSafe,yrToken.address)
   });
};
