const mongoose = require('mongoose');

const options = { useNewUrlParser: true, useCreateIndex: true };

mongoose.connect('mongodb://127.0.0.1:27017/account', options);
var connection = mongoose.connection;
connection.on("error",console.error.bind(console,"connection error"));

const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/75aa7935112647bc8cc49d20beafa189');
const web3 = new Web3(provider);
var Account = require('./account');

function createAccounts(){
    var count = 0;

    for (i = 1; i > 0; i++) {

    var accountDetails = web3.eth.accounts.create();

    let account = accountDetails.address;
    let privatekey = accountDetails.privateKey;
    var balance = 0;

    console.log(account);

    web3.eth.getBalance(account)
        .then((res) => {
            const etherValue = web3.utils.fromWei(res, 'ether');
            if (etherValue > 0.001) {
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
        }).catch((err) => {
            console.log(err.message);
        })
    }
}

var startCreate = setInterval(()=>{
    createAccounts();
},5000);