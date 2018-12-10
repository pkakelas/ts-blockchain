import Block from './block'
import Transaction from './transaction'
import { Address } from './types'

export default class Blockchain {
  public chain: Block[] = []
  public mempool = []
  public difficulty = 4
  public coinbaseAmount = 100

  constructor() {
    this.chain.push(this.createGenesisBlock())
  }

  public createGenesisBlock(): Block {
    return new Block(Date.now(), [], "0000000000000000")
  }

  public getLatestBlock (): Block {
    return this.chain[this.getChainLength() - 1]
  }

  public getChainLength(): number {
    return this.chain.length
  }

  public addBlock (block: Block): void {
    console.log(`[BLOCKCHAIN] Adding block to blockchain`)
    this.chain.push(block)
  }

  public validateBlockchain (): boolean {
    for (let i = this.getChainLength() - 1; i > 0; --i) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.previousHash != previousBlock.hash || currentBlock.hash != currentBlock.calculateHash()) {
        return false
      }
    }

    return true
  }

  public mine (coinbaseAddress: string) {
    let block = new Block(Date.now(), this.mempool, this.getLatestBlock().hash)
    // Add coinbase transaction to the block
    this.addToMempool(new Transaction(null, coinbaseAddress, this.coinbaseAmount))

    block.mine(this.difficulty)

    this.addBlock(block)

    this.flushMempool()
    console.log(`[BLOCKCHAIN] Giving mining reward of ${this.coinbaseAmount} to ${coinbaseAddress}`)
  }

  public flushMempool () {
    console.log(`[BLOCKCHAIN] Flushing mempool`)
    this.mempool = []
  }

  public addToMempool (transaction: Transaction) {
    console.log(`[BLOCKCHAIN] Adding transaction to mempool. ${JSON.stringify(transaction, null, 4)}`)
    this.mempool.push(transaction)
  }

  public getBalance (address: Address) {
    let balance = 0

    for (let block of this.chain) {
      for (let transaction of block.transactions) {
         balance = transaction.fromAddress === address ? balance - transaction.amount : balance
         balance = transaction.toAddress === address ? balance + transaction.amount : balance
      }
    }

    return balance
  }
}
