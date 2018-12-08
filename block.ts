const sha256 = require('sha256')

type Data = any

type BlockArguments = {
  timestamp: number,
  data: Data,
  nonce: string
  previousHash: string
}

export default class Block {
  public timestamp: number
  public data: any
  public previousHash: string
  public hash: string
  public nonce: string

  constructor (args: BlockArguments) {
    this.timestamp = args.timestamp
    this.data = args.data
    this.nonce = args.nonce
    this.previousHash = args.previousHash

    this.hash = this.calculateHash()
  }

  calculateHash (): string {
    const toBeHashed = this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce

    return sha256(toBeHashed)
  }

  mineBlock (difficulty) {
  }
}
