const Book = require('../models/bookModel');
const Patron = require('../models/patronModel')
const Transaction = require('../models/transactionModel')
const asyncHandler = require('express-async-handler')



// get all trans
const getTrans = asyncHandler( async(req, res) => {
    try{
        const transactions = await Transaction.find({});
        res.render('trans', { 
            title: 'Library Mangement System',
            transactions : transactions
        })

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }

} )



// showTransView
const showAddTransView = asyncHandler( async(req,res) => {

    try{

        const books = await Book.find({})
        const patrons = await Patron.find({})

        res.render('addtran', { 
            title: 'Library Mangement System - Add a new transaction',
            books : books,
            patrons: patrons
        })

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }


})

// save a transaction
const addTran = asyncHandler( async(req, res) => {

    try {


        const transaction = new Transaction({
            bookID : req.body.bookid,
            bookName : req.body.bookname,
            userID : req.body.patronid,
            userName : req.body.patronname

        })

        transaction.save();
        
        // save success full message in session.
        res.redirect('/api/trans')


    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// get a single transaction
const getSingleTran = asyncHandler(async(req,res) => {

    try{
        const {id} = req.params
        const tran = await Transaction.findById(id)
        res.status(200).json(tran);

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})


// updating the transaction ( returning a book )
const editTran = asyncHandler( async(req,res) => {

    try {

        const { id } = req.params
        const editedTransaction = new Transaction({
            _id : id,
            returned : 'YES'
        })

        const transaction = await Transaction.findOneAndUpdate( {'_id' : id }, editedTransaction )
        
        // save success full message in session.
        res.redirect('/api/trans')

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
} )



module.exports = {
    showAddTransView,
    getTrans,
    getSingleTran,
    addTran,
    editTran

}