
const Web3 = require('web3')
const east = require('../build/contracts/East.json')

const NODE2 = "http://localhost:22001"
const NODE1 = "http://localhost:22000"
const NODE3 = "http://localhost:22002"
const NODE4 = "http://localhost:22003"

var nodePublicKey1 = 'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo='
var nodePublicKey2 = 'QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc='
var nodePublicKey3 = '1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg='
var nodePublicKey4 = 'oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8='
// var sender = await web3.eth.getCoinbase()
var accountnode1 = '0xed9d02e382b34818e88B88a309c7fe71E65f419d'
var accountnode2 = '0xca843569e3427144cead5e4d5999a3d0ccf92b8e'
var accountnode3 = '0x0fBDc686b912d7722dc86510934589E0AAf3b55A'
var accountnode4 = '0x9186eb3d20Cbd1F5f992a950d808C4495153ABd5'
var amount = 100

// Instantiate the contract from ABI artifact and the deployed address.
let abi = east.abi
let networkId = 10
let contractAddress = east.networks[networkId].address


////////////////// NODE 2 

let web3 = new Web3(new Web3.providers.HttpProvider(NODE2))
let contractInst = new web3.eth.Contract(abi, contractAddress)  
contractInst.methods.name().call()
.then(su => console.log(`name (from node 2): ${su}`)); 

contractInst.methods.totalSupply().call()
.then(su => console.log(`Total supply (from node 2): ${su}`)); 

contractInst.methods.balanceOf(accountnode1).call()
.then(su => console.log(`balance Of (from node 2) account 1:${accountnode1}  ${su}`)); 

contractInst.methods.balanceOf(accountnode2).call()
.then(su => console.log(`balance Of (from node 2) account 2:${accountnode2}  ${su}`));

contractInst.methods.balanceOf(accountnode3).call()
.then(su => console.log(`balance Of (from node 2) account 3:${accountnode3}  ${su}`));


contractInst.methods.balanceOf(accountnode4).call()
.then(su => console.log(`balance Of (from node 2) account 4:${accountnode4}  ${su}`));


