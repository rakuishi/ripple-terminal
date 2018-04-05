#!/usr/local/bin/node

'use strict'

const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({ server: 'wss://s1.ripple.com:443' });

const operator = {
  // balance
  getBalance: () => {
    const address = process.argv[3];
    if (!address) {
      console.log('Error: Unable to get a ripple address.')
      return;
    }
  
    api.connect().then(() => {
      api.getAccountInfo(address).then(info => {
        console.log('XRP Balance: ' + info.xrpBalance);
        process.exit();
      });
    });
  },
  // fee
  getFee: () => {
    api.connect().then(() => {
      api.getFee().then(fee => {
        console.log('Transaction fee: ' + fee);
        process.exit();
      });
    });
  },
  // new
  generateAddress: () => {
    const address = api.generateAddress();
    console.log(address);
  },
};

switch (process.argv[2]) {
  case 'balance':
    operator.getBalance();
    break;
  case 'fee':
    operator.getFee();
    break;
  case 'new':
    operator.generateAddress();
    break;
  case 'help':
  default:
    console.log('Usage:\n' +
      '  ./ripple.js [command]\n' +
      '\n' +
      'Available Commands:\n' +
      '  balance   Get XRP balance | ./ripple.js balance [address]\n' +
      '  fee       Get the estimated transaction fee\n' +
      '  help      Help about any command\n' +
      '  new       Generate a new XRP Ledger address and corresponding secret'
    );
}
