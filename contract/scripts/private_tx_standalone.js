const Web3 = require('web3')
const east = require('../build/contracts/East.json')

const NODE1 = "http://localhost:22000"

var nodePublicKey = 'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo='
// var sender = await web3.eth.getCoinbase()
let sender = '0xed9d02e382b34818e88B88a309c7fe71E65f419d'
var recipient = '0xca843569e3427144cead5e4d5999a3d0ccf92b8e'
var amount = 100

// Instantiate the contract from ABI artifact and the deployed address.
let abi = east.abi
let networkId = 10
let contractAddress = east.networks[networkId].address
let web3 = new Web3(new Web3.providers.HttpProvider(NODE1))
let contractInst = new web3.eth.Contract(abi, contractAddress)

contractInst.methods.transfer(recipient, amount)
  .send({
    from: sender,
    privateFor: [nodePublicKey],
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

contractInst.methods.totalSupply().call()
.then(su => console.log(`Total supply: ${su}`)); 

contractInst.methods.balanceOf(sender).call()
.then(su => console.log(`balance Of :${sender}  ${su}`)); 

contractInst.methods.balanceOf(recipient).call()
.then(su => console.log(`balance Of :${recipient}  ${su}`));
