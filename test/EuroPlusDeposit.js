const utils = require("./utils/general");
const ERC20 = artifacts.require("IERC20")
const APContract = artifacts.require("./aps/APContract.sol");
const ProxyFactory = artifacts.require("./proxies/YieldsterVaultProxyFactory.sol");
const YieldsterVault = artifacts.require("./YieldsterVault.sol");
const EuroPlus = artifacts.require("./strategies/EuroPlus/EuroPlus.sol");
const EuroPlusMinter = artifacts.require("./strategies/EuroPlus/EuroPlusMinter.sol");

var abi = require('ethereumjs-abi');

function to18(n) {
    return web3.utils.toWei(n, "ether");
}
function from18(n) {
    return web3.utils.fromWei(n, "ether");
}
function to2(n) {
    return (n * 100).toString();
}
function from2(n) {
    return (n / 100).toString();
}

contract("Strategy Deposit", function (accounts) {
    let eurs, sEurs;
    let uCrvEursToken;
    let crvEURS;
    let proxyFactory, apContract;
    let yieldsterVaultMasterCopy;
    let euroPlus, euroPlusMinter;

    beforeEach(async function () {

        eurs = await ERC20.at("0xdB25f211AB05b1c97D595516F45794528a807ad8")
        sEurs = await ERC20.at("0xD71eCFF9342A5Ced620049e616c5035F1dB98620")
        uCrvEursToken = await ERC20.at("0x194eBd173F6cDacE046C53eACcE9B953F28411d1")
        crvEURS = await ERC20.at("0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A")

        await eurs.transfer(accounts[1], to2("8549"))
        // await sEurs.transfer(accounts[1], to18("100"))

        apContract = await APContract.deployed();
        euroPlus = await EuroPlus.deployed()
        yieldsterVaultMasterCopy = await YieldsterVault.deployed()
        proxyFactory = await ProxyFactory.deployed()
        euroPlusMinter = await EuroPlusMinter.deployed()

    });

    it("should create a new vault", async () => {
        testVaultData = await yieldsterVaultMasterCopy.contract.methods
            .setup(
                "Test",
                "T",
                accounts[0],
                apContract.address,
                accounts[0],
                []
            )
            .encodeABI();

        testVault = await utils.getParamFromTxEvent(
            await proxyFactory.createProxy(testVaultData),
            "ProxyCreation",
            "proxy",
            proxyFactory.address,
            YieldsterVault,
            "create Yieldster Vault"
        );

        console.log(
            "vault owner",
            await testVault.owner(),
            "other address",
            accounts[0]
        );

        console.log("Register Vault with APS")
        await testVault.registerVaultWithAPS();

        console.log("Set Vault Assets")
        await testVault.setVaultAssets(
            [eurs.address, sEurs.address, crvEURS.address, uCrvEursToken.address],
            [eurs.address, sEurs.address, crvEURS.address, uCrvEursToken.address],
            [],
            [],
        );

        console.log("set vault strategy and protocol")
        await testVault.setVaultStrategyAndProtocol(
            euroPlus.address,
            [
                crvEURS.address,
            ],
            [], []
        )


        //approve Tokens to vault
        await eurs.approve(testVault.address, to2("8549"), { from: accounts[1] })
        // await sEurs.approve(testVault.address, to18("100"), { from: accounts[1] })

        console.log("Activating vault strategy ", euroPlus.address)
        await testVault.setVaultActiveStrategy(euroPlus.address)
        console.log("Vault active strategies", (await testVault.getVaultActiveStrategy()))


        // Deposit to vault
        console.log("Vault NAV =", from18(await testVault.getVaultNAV()).toString())
        console.log("Vault Token Value =", from18(await testVault.tokenValueInUSD()).toString())
        console.log("eurs in User =", from2(await eurs.balanceOf(accounts[1])).toString())
        console.log("eurs in Vault =", from2((await eurs.balanceOf(testVault.address)).toString()))
        console.log("sEurs in User =", from18((await sEurs.balanceOf(accounts[1])).toString()))
        console.log("sEurs in Vault =", from18((await sEurs.balanceOf(testVault.address)).toString()))
        console.log("===========================DEPOSIT=============================")
        await testVault.deposit(eurs.address, to2("8549"), { from: accounts[1] });
        // await testVault.deposit(sEurs.address, to18("100"), { from: accounts[1] });
        console.log("Vault NAV =", from18(await testVault.getVaultNAV()).toString())
        console.log("Vault Token Value =", from18(await testVault.tokenValueInUSD()).toString())
        console.log("eurs in User =", from2(await eurs.balanceOf(accounts[1])).toString())
        console.log("eurs in Vault =", from2((await eurs.balanceOf(testVault.address)).toString()))
        console.log("sEurs in User =", from18((await sEurs.balanceOf(accounts[1])).toString()))
        console.log("sEurs in Vault =", from18((await sEurs.balanceOf(testVault.address)).toString()))

        //Withdraw from vault 
        // console.log("===========================WITHDRAW=============================")
        // console.log("Vault NAV =", from18(await testVault.getVaultNAV()).toString())
        // console.log("Vault Token Value =", from18(await testVault.tokenValueInUSD()).toString())
        // console.log("eurs in User =", from2(await eurs.balanceOf(accounts[1])).toString())
        // console.log("eurs in Vault =", from2((await eurs.balanceOf(testVault.address)).toString()))
        // console.log("sEurs in User =", from18((await sEurs.balanceOf(accounts[1])).toString()))
        // console.log("sEurs in Vault =", from18((await sEurs.balanceOf(testVault.address)).toString()))
        // crvEURS

        //Deposit into strategy
        console.log("euroPlus NAV =", from18((await euroPlus.getStrategyNAV()).toString()))
        console.log("euroPlus token value =", from18((await euroPlus.tokenValueInUSD()).toString()))
        console.log("euroPlus token vault balance =", from18((await euroPlus.balanceOf(testVault.address)).toString()))
        console.log("===================STRATEGY DEPOSIT=====================")
        let earnInstruction =
            web3.eth.abi.encodeParameters(['address[2]', 'uint256[2]', 'uint256', 'address[]', 'address[]'], [["0xdB25f211AB05b1c97D595516F45794528a807ad8", "0xD71eCFF9342A5Ced620049e616c5035F1dB98620"], [`${to2("7495")}`, `${to18("0")}`], "0", [], []]);

        await euroPlusMinter.earn(testVault.address, [eurs.address], [to2("7495")], earnInstruction)
        console.log("euroPlus NAV =", from18((await euroPlus.getStrategyNAV()).toString()))
        console.log("euroPlus token value =", from18((await euroPlus.tokenValueInUSD()).toString()))
        console.log("euroPlus token vault balance =", from18((await euroPlus.balanceOf(testVault.address)).toString()))
        console.log("euroPlus crvEURS tokens  =", from18((await crvEURS.balanceOf(euroPlus.address)).toString()))
        console.log("Vault NAV =", from18(await testVault.getVaultNAV()).toString())
        console.log("Vault Token Value =", from18(await testVault.tokenValueInUSD()).toString())

        // //Withdraw from Strategy
        // console.log("====================STRATEGY WITHDRAW===================================")
        // console.log("eurs in Vault", from2((await eurs.balanceOf(testVault.address)).toString()))
        // console.log("sEurs in Vault", from18((await sEurs.balanceOf(testVault.address)).toString()))
        // console.log("crvEURS in Vault", from18((await crvEURS.balanceOf(testVault.address)).toString()))
        // console.log("uCrvEursToken in Vault", from18((await uCrvEursToken.balanceOf(testVault.address)).toString()))
        // let withdrawInstruction = abi.simpleEncode("withdraw(uint256,address)", to18("50"), uCrvEursToken.address).toString('hex');
        // console.log("Instruction \n", withdrawInstruction)
        // await euroPlusMinter.mintStrategy(testVault.address, withdrawInstruction)
        // console.log("euroPlus NAV after strategy withdraw", from18((await euroPlus.getStrategyNAV()).toString()))
        // console.log("euroPlus token value after strategy withdraw", from18((await euroPlus.tokenValueInUSD()).toString()))
        // console.log("euroPlus token vault balance after strategy withdraw", from18((await euroPlus.balanceOf(testVault.address)).toString()))
        // console.log("euroPlus crvEURS tokens after strategy withdraw", from18((await crvEURS.balanceOf(euroPlus.address)).toString()))
        // console.log("eurs in Vault", from2((await eurs.balanceOf(testVault.address)).toString()))
        // console.log("sEurs in Vault", from18((await sEurs.balanceOf(testVault.address)).toString()))
        // console.log("crvEURS in Vault", from18((await crvEURS.balanceOf(testVault.address)).toString()))
        // console.log("uCrvEursToken in Vault", from18((await uCrvEursToken.balanceOf(testVault.address)).toString()))
        // //Withdraw from vault 
        // console.log("===========================WITHDRAW=============================")
        // await testVault.withdraw(eurs.address, to18("100"), { from: accounts[1] });
        // console.log("Vault NAV", from18(await testVault.getVaultNAV()).toString())
        // console.log("Vault Token Value", from18(await testVault.tokenValueInUSD()).toString())
        // console.log("eurs in User ", from2(await eurs.balanceOf(accounts[1])).toString())
        // console.log("eurs in Vault ", from2((await eurs.balanceOf(testVault.address)).toString()))
        // console.log("sEurs in User ", from18((await sEurs.balanceOf(accounts[1])).toString()))
        // console.log("sEurs in Vault ", from18((await sEurs.balanceOf(testVault.address)).toString()))

    });
});
