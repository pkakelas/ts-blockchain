import Block from './block'
import Transaction from './transaction'
import { Address } from './types'

export default class Blockchain {
  public chain: Block[] = []
  public nodes= []
  public pendingTransactions = []
  public difficulty = 4
  public miningReward = 100

  constructor() {
    this.chain.push(this.createGenesisBlock())
    this.nodes = []
  }

  public createGenesisBlock(): Block {
    return new Block(Date.now(), [], "")
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

  public checkValid (): boolean {
    for (let i = this.getChainLength() - 1; i > 0; --i) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.previousHash != previousBlock.hash || currentBlock.hash != currentBlock.calculateHash()) {
        return false
      }
    }

    return true
  }

  public minePendingTransactions (miningRewardAddress: string) {
    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash)
    // Add reward transaction to the block
    this.addToPendingTransactions(new Transaction(null, miningRewardAddress, this.miningReward))

    block.mine(this.difficulty)

    this.addBlock(block)

    this.flushPendingTransactions()
    console.log(`[BLOCKCHAIN] Giving mining reward of ${this.miningReward} to ${miningRewardAddress}`)
  }

  public flushPendingTransactions () {
    console.log(`[BLOCKCHAIN] Flushing pending transactions`)
    this.pendingTransactions = []
  }

  public addToPendingTransactions (transaction: Transaction) {
    console.log(`[BLOCKCHAIN] Adding to pending transactions transaction. ${JSON.stringify(transaction, null, 4)}`)
    this.pendingTransactions.push(transaction)
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
