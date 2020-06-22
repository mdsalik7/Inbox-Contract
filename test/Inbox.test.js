const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile')

let accounts;
let inbox;
beforeEach(async () => {
    //get list of all the accounts
    accounts = await web3.eth.getAccounts();

    //use one of the account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode, arguments : ['Hi']})
    .send({from : accounts[0], gas : '1000000'})
    inbox.setProvider(provider);
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        //test if the contract is successfully deployed or not
        assert.ok(inbox.options.address)
    })
    it('has a default message', async () => {
        //test to make sure that the contract gets default message
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hi')
    })
    it('can change the message', async ()=> {
        const hash = await inbox.methods.setMessage('Hello').send({from : accounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hello')
        //console.log(hash)
    })
})