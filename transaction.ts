import { Address } from './types'

export default class Transaction {
  public fromAddress: Address
  public toAddress: Address
  public amount: number

  constructor (fromAddress: Address, toAddress: Address, amount: number) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }
}
