var East = artifacts.require("East");

const name = "EthiqueEast2";
const symbol = "EQE2";
let initialSupply = 100

module.exports = function(deployer) {
  // deployer.deploy(East, name, symbol, initialSupply)
   deployer.deploy(East, name, symbol, initialSupply,
     {
       privateFor: ['BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=']
     }
   );
};
