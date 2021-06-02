/**
 * Two tasks are needed for the app to work conveniently:
 * 1. The unlocked admin geth accounts for Node 1 & Node 2 need half of the totalSupply
 *    (Because they need to transfer to registering users.)
 * 2. In order for the app to work w/o coding in too much private transaction code:
 * User needs to approve the admin wallet to send a lot of their tokens
 * on their behalf.
 * This script calls quorumjs RawTransactionManager service:
    txnMngr.sendRawTransaction(txParams).then(receipt => {...

  which does /storeraw , setPrivate etc.
 */
const Web3 = require('web3')
const quorumjs = require("quorum-js")
const eastJson = require('../contract/build/contracts/East.json')
const publicJson = require('../contract/build/contracts/Public.json')

const NODE1 = "http://localhost:22000"


var nodePublicKey = 'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo='
var nodePublicKey2 = 'QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc='
// var sender = await web3.eth.getCoinbase()
let admin1 = '0xed9d02e382b34818e88B88a309c7fe71E65f419d'
let sender = "0x9186eb3d20cbd1f5f992a950d808c4495153abd5"
let privateKey = "794392ba288a24092030badaadfee71e3fa55ccef1d70c708baf55c07ed538a8"
let admin2 = '0xca843569e3427144cead5e4d5999a3d0ccf92b8e'

// node 1 user 
//let sender = "0x9186eb3d20cbd1f5f992a950d808c4495153abd5"
//let privateKey = "794392ba288a24092030badaadfee71e3fa55ccef1d70c708baf55c07ed538a8"

 //node 2 user
  //let sender = "0x0638e1574728b6d862dd5d3a3e0942c3be47d996"
  //let privateKey = "30bee17b2b8b1e774115f785e92474027d45d900a12a9d5d99af637c2d1a61bd"

// Instantiate the contract from ABI artifact and the deployed address.
let abi = eastJson.abi
let networkId = 10
let contractAddress = eastJson.networks[networkId].address
let web3 = new Web3(new Web3.providers.HttpProvider(NODE1))
let contractInst = new web3.eth.Contract(abi, contractAddress)

/* Set up the ERC20 Approve( admin, amount ) */
var amount = 1000000
let transaction = contractInst.methods.approve(admin1, amount)

quorumjs.extend(web3);
console.log(Object.keys(web3.quorum))
const enclaveOptions = {
  privateUrl: 'http://localhost:9081'
}
const txnMngr = quorumjs.RawTransactionManager(web3, enclaveOptions);


web3.eth.getTransactionCount(sender).then(count => {
  console.log(count)
  let encodedTrans = transaction.encodeABI();
  const txParams = {
    // from: sender,
    from: {
      address: sender,
      privateKey: '0x' + privateKey,
    },
    nonce: count, //web3.utils.toHex(count),
    gasPrice: 0, //web3.utils.toHex(0), 
    gasLimit: 8000000, //web3.utils.toHex(8000000),
    to: contractAddress, 
    data: encodedTrans,
    value: 0,
    chainId: web3.utils.toHex(10),
    isPrivate: true,
    privateFrom: nodePublicKey,
    privateFor: [nodePublicKey],
  }
  console.log(txParams)
  
  txnMngr.sendRawTransaction(txParams).then(receipt => {
    console.log(receipt)
    /* Transfer half of totalSupply to Node 2 admin */
    /*
    let abiPublic = publicJson.abi
    let contractAddressPublic = publicJson.networks[networkId].address
    let contractInstPublic = new web3.eth.Contract(abiPublic, contractAddressPublic)

    contractInstPublic.methods
      .transfer(admin2, amount / 8)
      .send({
        from: admin1
      })
      .then(receipt2 => {
        console.log(receipt2)
      })
      */
  })


  contractInst.methods.totalSupply().call()
  .then(su => console.log(`Total supply: ${su}`)); 

  let address = admin1
  contractInst.methods.balanceOf(address).call()
  .then(su => console.log(`balance Of :${address}  ${su}`)); 

  let networkNode = NODE1
  let bankWallet = admin1
  let publicKey = nodePublicKey
  let contract = contractInst
  let receipt = {}
  let recipient = admin2
  
  try {
   
      receipt =  contract.methods
        .transferFrom(admin1, recipient , 1)
        .send({
          from: bankWallet,
          gasPrice: 0,
          gas: 100000,
          privateFor: [publicKey],
        })
  } catch (err) {
    // console.log(err)
    // throw err
    receipt = err
  }
  console.log("Transaction Receipt:", receipt)
  

contractInst.methods.balanceOf(admin1).call()
.then(su => console.log(`balance Of :${admin1}  ${su}`)); 

contractInst.methods.balanceOf(sender).call()
.then(su => console.log(`balance Of :${sender}  ${su}`));

contractInst.methods.balanceOf(admin2).call()
.then(su => console.log(`balance Of :${admin2}  ${su}`)); 

  /*
contractInst.methods
      .transfer(address, 200)
      .send({
        from: {
            address: sender,
            privateKey: '0x' + privateKey,
          },
        privateFor: [nodePublicKey],
      })
      .then(receipt => {
        console.log("transfer receipt:", receipt)
      })
*/

  /*

       const tx = await producer.send({
                chainId: 10,
                protocol: {
                    type: ProtocolType.QuorumTessera,
                },
                to: '0xe5ce65038f9d1c841a33cc816ee674f8a0e31e74',
                call: {
                    // contract: 'SimpleToken',
                    // method: 'constructor()'
                    method: 'transfer(address,uint256)',
                    args: ["0xdbb881a51cd4023e4400cef3ef73046743f08da3", "100000"]
                },
                privateFor: ['BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=', 'QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc='],
                privateFrom: 'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=',
                gas: 2000000,
                gasPrice: 0,
                value: 0,
                from: '0x7e654d251da770a068413677967f6d3ea2fea9e4'
            })

async function getTotalSupply(network) {
    let contract = contracts[network]
    let res
    try {
      res = await contract.methods
      .totalSupply()
      .call()
    } catch (err) {
      console.log(err)
      throw err
    }
    console.log("Call Res:", res)
    return res
  }

  async function getBalance(address, network) {
  // console.log('getBalance', address, network)
  let contract = contracts[network]
  let res
  try {
    res = await contract.methods
    .balanceOf(address)
    .call()
  } catch (err) {
    console.log(err)
    throw err
  }
  console.log("Call Res:", res)
  return Number(res)
}

  */

  return
})
;
/*

let transaction2 = contractInst.methods.transfer(admin1, amount)

let address = admin1

web3.eth.getTransactionCount(sender).then(count => {
  console.log(count)
  let encodedTrans2 = transaction2.encodeABI();
  const txParams2 = {
    // from: sender,
    from: {
      address: sender,
      privateKey: '0x' + privateKey,
    },
    nonce: count, //web3.utils.toHex(count),
    gasPrice: 0, //web3.utils.toHex(0), 
    gasLimit: 8000000, //web3.utils.toHex(8000000),
    to: contractAddress, 
    data: encodedTrans2,
    value: 0,
    chainId: web3.utils.toHex(10),
    isPrivate: true,
    privateFrom: nodePublicKey,
    privateFor: [nodePublicKey],
  }
  console.log(txParams2)
  
  txnMngr.sendRawTransaction(txParams2).then(receipt => {
    console.log(receipt)


    contractInst.methods.balanceOf(address).call()
    .then(su => console.log(`balance Of :${address}  ${su}`)); 
  })
  return
});
*/

    /*
// contractInst.methods
//   .allowance(sender, admin)
//   .call().then( res => {
//     console.log(res)
//   })
// contractInst.methods
//   .balanceOf(sender)
//   .call().then( res => {
//     console.log(res)
//   })
*/