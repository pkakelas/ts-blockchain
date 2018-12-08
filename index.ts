import Blockchain from './blockchain'
import Block from './block'

let chain = new Blockchain();
chain.addBlock({amount: 5})
chain.addBlock({amount: 10})

console.log(JSON.stringify(chain, null, 4))
console.log("Is blockchain valid? " + chain.checkValid())
