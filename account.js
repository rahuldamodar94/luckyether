const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

var accountSchema = mongoose.Schema({
    address:{
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    privateKey:{
        type: String
    },
    balance:{
        type: String
    }
})

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;