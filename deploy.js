const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider(
    'audit click affair immense kick egg merit arrow lemon video virus response',
    'https://rinkeby.infura.io/v3/02a37b59cbcf4d6e911e01805753ae93'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Account : ', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x' + bytecode, arguments : ['Hi']})
    .send({from : accounts[0], gas : '1000000'})
    console.log('Deployed To : ', result.options.address)
}
deploy()

