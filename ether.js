const mongoose = require('mongoose');

const options = { useNewUrlParser: true, useCreateIndex: true };
var fs = require('fs');
mongoose.connect('mongodb://127.0.0.1:27017/account', options);
var connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error"));

const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75aa7935112647bc8cc49d20beafa189');
const web3 = new Web3(provider);
var Account = require('./account');

var count = 0;

function createAccounts() {


    var accountDetails = web3.eth.accounts.create();

    let account = accountDetails.address;
    let privatekey = accountDetails.privateKey;
    var balance = 0;

    web3.eth.getBalance(account)
        .then((res) => {
            count++;
            fs.writeFile('count.txt', count.toString(), function(err) {
                if (err) throw err;
            });
            const etherValue = web3.utils.fromWei(res, 'ether');

            if (etherValue > 0) {
                balance = etherValue;

                let details = new Account({
                    address: account,
                    privateKey: privatekey,
                    balance: balance
                });

                details.save().then((doc) => {
                    count++;
                    console.log("Added " + count + "records");
                }).catch((err) => {
                    console.log(err.message);
                });
            }
            createAccounts();
        }).catch((err) => {
            console.log(err.message);
        })
}

var startCreate = setInterval(() => {
    clearInterval(startCreate);
    createAccounts();
}, 1000);