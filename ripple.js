#!/usr/local/bin/node

'use strict'

const RippleAPI = require('ripple-lib').RippleAPI;
const api = new RippleAPI({ server: 'wss://s1.ripple.com:443' });

// balance
const getBalance = () => {
  const address = process.argv[3];
  if (!address) {
    console.log('Error: Unable to get a ripple address.');
    return;
  }

  api.connect().then(() => {
    api.getAccountInfo(address).then(info => {
      console.log('XRP Balance: ' + info.xrpBalance);
      process.exit(0);
    });
  });
};

// fee
const getFee = () => {
  api.connect().then(() => {
    api.getFee().then(fee => {
      console.log('Transaction fee: ' + fee);
      process.exit(0);
    });
  });
};

// new
const generateAddress = () => {
  const address = api.generateAddress();
  console.log(address);
};

// send
const send = () => {
  const source_address = process.argv[3];
  const source_secret = process.argv[4];
  const destination_address = process.argv[5];
  const amount = process.argv[6];
  if (!source_address || !source_secret || !destination_address || !amount) {
    console.log('Error: Unable to get source_address, source_secret, destination_address and amount.');
    return;
  }

  const payment = {
    source: {
      address: source_address,
      maxAmount: {
        value: String(amount),
        currency: 'XRP'
      }
    },
    destination: {
      address: destination_address,
      amount: {
        value: String(amount),
        currency: 'XRP'
      }
    }
  };

  console.log(payment);
  sleep(5000).then(() => {
    api.connect().then(() => {
      console.log('Connected...');
      return api.preparePayment(source_address, payment).then(prepared => {
        console.log('Payment transaction prepared...');
        const { signedTransaction } = api.sign(prepared.txJSON, source_secret);
        console.log('Payment transaction signed...');
        api.submit(signedTransaction).then(quit, fail);
      });
    }).catch(fail);
  });
};

const quit = (message) => {
  console.log(message);
  process.exit(0);
};

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const sleep = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

switch (process.argv[2]) {
  case 'balance':
    getBalance();
    break;
  case 'fee':
    getFee();
    break;
  case 'new':
    generateAddress();
    break;
  case 'send':
    send();
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
