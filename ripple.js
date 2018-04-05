#!/usr/local/bin/node

'use strict'

const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({ server: 'wss://s1.ripple.com:443' });

const operator = {
  getBalance: () => {
    const address = process.argv[3];
    if (!address) {
      console.log('Error: Unable to get a ripple address.')
      return;
    }
  
    api.connect().then(() => {
      api.getAccountInfo(address).then(info => {
        console.log('xrpBalance: ' + info.xrpBalance);
        process.exit();
      });
    });
  },
  generateAddress: () => {
    const address = api.generateAddress();
    console.log(address);
  },
};

switch (process.argv[2]) {
  case 'balance':
    operator.getBalance();
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
      '  help      Help about any command\n' +
      '  new       Generate a new XRP Ledger address and corresponding secret'
    );
}
