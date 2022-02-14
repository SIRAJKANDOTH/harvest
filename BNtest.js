const Web3 = require("web3");
const BN = Web3.utils.BN;
console.log("testing now");
let var1=new BN("1");
// console.log("var1",var1.toString());
// console.log("type of var1",typeof(var1));
// console.log("type of var1 enclosed in new BN()",typeof(new BN(var1)));

let var3=new BN("1000")
let var2=new BN("0.001");
console.log(var2.toString())
console.log("1.var2 is actually 0.001 but is treated as",var2.toString());
console.log("2.var2 is actually 0.001 but is treated as",new BN(var2).toString());

console.log("type of var2",typeof(var1));

let sum=(new BN(var1).add(new BN(var2)))
console.log("sum of var1 and var2 is",sum.toString());
console.log("sum with not enclosed in new BN",(var1.add(new BN(var2))).toString())
console.log(" now log this",new BN(new BN(var1).add(new BN(var2))).toString())
console.log(" now log this:new BN(new BN(var1).add(new BN(var3))).toString()",new BN(new BN(var1).add(new BN(var3))).toString())


console.log("weird output when the number is less than 1");

