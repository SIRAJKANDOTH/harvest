const APContract = artifacts.require("./aps/APContract.sol");
const StockDeposit = artifacts.require("./smartStrategies/deposit/StockDeposit.sol");
const StockWithdraw = artifacts.require("./smartStrategies/deposit/StockWithdraw.sol");
const SafeMinter = artifacts.require("./safeUtils/SafeMinter.sol")
const YieldsterVault = artifacts.require("./YieldsterVault.sol");
const ProxyFactory = artifacts.require("./proxies/YieldsterVaultProxyFactory.sol");

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(
        APContract,
        "0x20996567dBE5c7B1b4c144bac7EE955a17EB23c6",
        "0x477FC30a79881304b07EEc704081e14288bE6670",
        "0xeABbB9D2bace2970361f3e5e15E9f63b14397439",
        "0xAE9a070bed8b80050e3b8A26c169496b55C00D94",
        "0x507F9C130d6405Cd001A9073Adef371dD9fA3F72",
        "0x0dAA47FAC1440931A968FA606373Af69EEcd9b83",
        "0xc98435837175795d216547a8edc9e0472604bbda",
        "0x0E6B1f325dD47420823843ff96942a8a627C79A4"
    );

    const apContract = await APContract.deployed();

    await deployer.deploy(StockDeposit);
    await deployer.deploy(StockWithdraw);

    const stockDeposit = await StockDeposit.deployed()
    const stockWithdraw = await StockWithdraw.deployed()

    //Adding Assets
    console.log("adding assets")
    await apContract.addAsset("DAI", "DAI Coin", "0x6B175474E89094C44Da98b954EedeAC495271d0F")
    await apContract.addAsset("USDC", "USD Coin", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")
    await apContract.addAsset("USDT", "USDT Coin", "0xdac17f958d2ee523a2206206994597c13d831ec7")
    await apContract.addAsset("BUSD", "BUSD Coin", "0x4fabb145d64652a948d72533023f6e7a623c7c53")
    await apContract.addAsset("EURS", "EURS Coin", "0xdB25f211AB05b1c97D595516F45794528a807ad8")
    await apContract.addAsset("sEURS", "sEURS Coin", "0xD71eCFF9342A5Ced620049e616c5035F1dB98620")


    //adding Protocols
    console.log("adding protocols")
    await apContract.addProtocol(
        "yearn Curve.fi crvUSDP",
        "crvUSDP",
        "0xC4dAf3b5e2A9e93861c3FBDd25f1e943B8D87417"
    );
    await apContract.addProtocol(
        "yearn Curve.fi crvUSDN",
        "crvUSDN",
        "0x3B96d491f067912D18563d56858Ba7d6EC67a6fa"
    );
    await apContract.addProtocol(
        "yearn Curve.fi crvALUSD",
        "crvALUSD",
        "0xA74d4B67b3368E83797a35382AFB776bAAE4F5C8"
    );
    await apContract.addProtocol(
        "yearn Curve.fi crvLUSD",
        "crvLUSD",
        "0x5fA5B62c8AF877CB37031e0a3B2f34A78e3C56A6"
    );
    await apContract.addProtocol(
        "yearn Curve.fi crvBUSD",
        "crvBUSD",
        "0x6Ede7F19df5df6EF23bD5B9CeDb651580Bdf56Ca"
    );
    await apContract.addProtocol(
        "yearn Curve.fi crvEURS",
        "crvEURS",
        "0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A"
    );

    //Adding Stock withdraw and deposit to APContract
    await apContract.setStockDepositWithdraw(
        stockDeposit.address,
        stockWithdraw.address
    );

    await deployer.deploy(SafeMinter, accounts[0])
    const safeMinter = await SafeMinter.deployed()
    await apContract.setSafeMinter(safeMinter.address);

    await deployer.deploy(YieldsterVault)
    const yieldsterVaultMasterCopy = await YieldsterVault.deployed()

    await deployer.deploy(ProxyFactory, yieldsterVaultMasterCopy.address, apContract.address)
    const proxyFactory = await ProxyFactory.deployed();

    await apContract.addProxyFactory(proxyFactory.address);


};
