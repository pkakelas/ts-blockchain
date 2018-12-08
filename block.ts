import Transaction from './transaction'
const sha256 = require('sha256')

export default class Block {
  public timestamp: number
  public transactions: Transaction[]
  public previousHash: string
  public hash: string
  public nonce: number

  constructor (timestamp: number, transactions = [], previousHash: string) {
    this.timestamp = timestamp
    this.transactions = transactions
    this.nonce = 0
    this.previousHash = previousHash

    this.hash = this.calculateHash()
  }

  calculateHash (): string {
    const toBeHashed = this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce

    return sha256(toBeHashed)
  }

  mine (difficulty) {
    let found: boolean = false
    const prefix = Array(difficulty + 1).join("a")
    const timeStarted = Date.now()

    while(!found) {
      this.hash =  this.calculateHash()
      this.nonce++

      found = this.hash.substring(0, difficulty) == prefix
    }

    console.log(`[BLOCK] Block mined. Hash: ${this.hash}. Time: ${Date.now() - timeStarted} ms.`)
  }
}
