const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(

    {
        bookID : {
            type: String,
            required: true
        },
        bookName: {
            type: String,
            required: true
        },
        userID: {
            type : String,
            required: true
        },
        userName : {
            type: String,
            required: true
        },
        borrowDate: {
            type : Date,
            required: true,
            default : +new Date()
        },
        returnDate: {
            type : Date,
            required: true,
            default : +new Date() + 14*24*60*60*1000
        },
        returned: {
            type: String,
            default: "NO"
        }

    }
)
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;