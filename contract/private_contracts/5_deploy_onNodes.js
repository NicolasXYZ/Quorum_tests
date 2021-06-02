var West = artifacts.require("West");

const name = "WestOnNodesOneTwo";
const symbol = "WNOT";
let initialSupply = 100

module.exports = function(deployer) {
  // deployer.deploy(East, name, symbol, initialSupply)
  let privateFor = [];
  privateFor.push('QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=');
  privateFor.push('BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=');
  deployer.deploy(West, name, symbol, initialSupply,{privateFor : privateFor});

  //  {
  //    privateFor: ['QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=', 'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=']
  //  }
  // );
};
