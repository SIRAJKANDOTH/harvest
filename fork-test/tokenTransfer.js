const Web3 = require("web3")
const web3 = new Web3("http://localhost:8545")

const recipientAddress = "0x5091aF48BEB623b3DA0A53F726db63E13Ff91df9";
const unlockedAddress = "0x5A16552f59ea34E44ec81E58b3817833E9fD5436";

const ERC20 = require("./IERC20.json").abi
const ICurveSwap = require("./ICurveUSDCPoolExchange.json").abi;
const dai = new web3.eth.Contract(ERC20, "0x6B175474E89094C44Da98b954EedeAC495271d0F")
const usdc = new web3.eth.Contract(ERC20, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")
const usdt = new web3.eth.Contract(ERC20, "0xdac17f958d2ee523a2206206994597c13d831ec7")
const exchangeContract = new web3.eth.Contract(
    ICurveSwap,
    "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD"
);

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

const transferBalance = async () => {
    console.log("Unlocked dai balance : ", from18(await dai.methods.balanceOf(unlockedAddress).call()))
    console.log("recipient dai balance : ", from18(await dai.methods.balanceOf(recipientAddress).call()))
    console.log("recipient usdc balance : ", from6(await usdc.methods.balanceOf(recipientAddress).call()))
    console.log("recipient usdt balance : ", from6(await usdt.methods.balanceOf(recipientAddress).call()))
    console.log("transfer")
    await dai.methods.transfer(recipientAddress, to18("100000")).send({ from: unlockedAddress })
    console.log("recipient dai balance : ", from18(await dai.methods.balanceOf(recipientAddress).call()))

    console.log("Exchanging DAI for USDT")
    console.log(
        await dai.methods
            .approve(
                "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD",
                to18("10000")
            )
            .send({ from: recipientAddress, gasPrice: "20000000000" })
    );
    console.log(
        "allowance = ",
        from18(await dai.methods
            .allowance(recipientAddress, "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD")
            .call())
    );

    console.log(
        await exchangeContract.methods
            .exchange(
                "0",
                "1",
                to18("1000"),
                to6("100")
            )
            .send({
                from: recipientAddress,
                gasPrice: "100000000000",
                gas: "4000000",
            })
    );
    console.log("Exchanging DAI for USDC")
    console.log(
        await dai.methods
            .approve(
                "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD",
                to18("10000")
            )
            .send({ from: recipientAddress, gasPrice: "20000000000" })
    );
    console.log(
        "allowance = ",
        from18(await dai.methods
            .allowance(recipientAddress, "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD")
            .call())
    );

    console.log(
        await exchangeContract.methods
            .exchange(
                "0",
                "2",
                to18("1000"),
                to6("100")
            )
            .send({
                from: recipientAddress,
                gasPrice: "100000000000",
                gas: "4000000",
            })
    );


    console.log("recipient dai balance : ", from18(await dai.methods.balanceOf(recipientAddress).call()))
    console.log("recipient usdc balance : ", from6(await usdc.methods.balanceOf(recipientAddress).call()))
    console.log("recipient usdt balance : ", from6(await usdt.methods.balanceOf(recipientAddress).call()))
}

transferBalance()