#!/usr/local/bin/node

'use strict'

const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({ server: 'wss://s1.ripple.com:443' });
const command = process.argv[2]

const balance = () => {
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
}

switch (command) {
  case 'balance':
    balance();
    break;
  case 'help':
  default:
    console.log('Usage:\n' +
      '  ./ripple.js [command]\n' +
      '\n' +
      'Available Commands:\n' +
      '  balance   Get XRP balance | ./ripple.js balance [address]\n' +
      '  help      Help about any command\n'
    );
}
