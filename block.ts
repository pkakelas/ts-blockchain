const sha256 = require('sha256')

type Data = any

type BlockArguments = {
  id: number,
  timestamp: number,
  data: any,
  nonce: string
  previousHash: string
}

export default class Block {
  public index = 0
  public timestamp: number
  public data: any
  public previousHash: string
  public hash: string
  public nonce: string

  constructor (args: BlockArguments) {
    this.index = args.id
    this.timestamp = args.timestamp
    this.data = args.data
    this.nonce = args.nonce
    this.previousHash = args.previousHash

    this.hash = this.calculateHash()
  }

  calculateHash (): string {
    const toBeHashed = this.previousHash + (this.index + this.timestamp + this.data + this.nonce)

    return sha256(toBeHashed)
  }

  mineBlock (difficulty) {
  }
}
