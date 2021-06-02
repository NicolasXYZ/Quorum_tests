var East = artifacts.require("East");

const name = "PrivateTest";
const symbol = "EQE";

module.exports = function(deployer, network) {
  let privateFor = [];
  const node1key ='BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=';
  const node2key ='QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=';
  const node3key ='1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=';
  const node4key ='oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8=';
  privateFor.push(node1key);

  privateFor.push(node2key);
  privateFor.push(node3key);
  privateFor.push(node4key);
  
  if(network === "node1") {

  let initialSupply = 100
  // deployer.deploy(East, name, symbol, initialSupply)
   deployer.deploy(East, name, symbol, initialSupply,
     {
       privateFor: privateFor
     }
   );
    }else {

    let initialSupply = 0
    deployer.deploy(East, name, symbol, initialSupply,
      {
        privateFor: privateFor
      }
    );
      console.log("we're on another network then node1");
  }
};
