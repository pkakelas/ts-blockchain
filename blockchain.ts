import Block from './block'

export default class Blockchain {
  private chain: Block[] = []
  constructor() {
    this.chain.push(this.createGenesisBlock())
  }

  public createGenesisBlock(): Block {
    return new Block({
      timestamp: Date.now(),
      data: "Initial Block",
      previousHash: "",
      nonce: "0"
    })
  }

  public getLatestBlock (): Block {
    return this.chain[this.getChainLength() - 1]
  }

  public getChainLength(): number {
    return this.chain.length
  }

  public addBlock (data): void {
    const block = new Block({
      timestamp: Date.now(),
      data: data,
      previousHash: this.getLatestBlock().hash,
      nonce: "0"
    })

    this.chain.push(block)
  }

  public checkValid (): boolean {
    for (let i = this.getChainLength() - 1; i > 0; --i) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.previousHash != previousBlock.hash) {
        return false
      }
    }

    return true
  }
}
