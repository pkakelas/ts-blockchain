import Blockchain from './blockchain'
import Transaction from './transaction'
import Block from './block'

const blockchain = new Blockchain()
const myAddress = 'addr1'
const testTransactions = [
  new Transaction('addr1', 'addr2', 10),
  new Transaction('addr2', 'addr3', 10),
  new Transaction('addr3', 'addr1', 20)
]

for (let trx of testTransactions) {
  blockchain.addToMempool(trx)
}

console.log(`I have address: ${myAddress}`)

console.log(`Blockchain before mining: ${JSON.stringify(blockchain.chain, null, 4)}`)
console.log(`My balance before mining is ${blockchain.getBalance(myAddress)}`)

blockchain.mine(myAddress)

console.log(`Blockchain after mining: ${JSON.stringify(blockchain.chain, null, 4)}`)
console.log(`My balance after is ${blockchain.getBalance(myAddress)}`)
