#!/usr/local/bin/node

'use strict'

const command = process.argv[2]

switch (command) {
  case 'help':
  default:
    console.log('Usage:\n' +
      '  ./ripple.js [command]\n' +
      '\n' +
      'Available Commands:\n' +
      '  help     Help about any command\n'
    );
}
