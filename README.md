# ripple-terminal

> A command line client of ripple

## Installation & Usage

```
$ node -v
v10.13.0

$ git clone https://github.com/rakuishi/ripple-terminal.git
$ cd ripple-terminal
$ npm install

# If you use node via nodebrew, you should make a symbolic link
# ln -s /Users/USERNAME/.nodebrew/current/bin/node /usr/local/bin/node
$ ./ripple.js help
Usage:
  ./ripple.js [command]

Available Commands:
  balance   Get XRP balance | ./ripple.js balance [address]
  fee       Get the estimated transaction fee
  help      Help about any command
  new       Generate a new XRP Ledger address and corresponding secret
  send      Send XRP | ./ripple.js send [source_address] [source_secret] [destination_address] [amount] (destination_tag)
```
