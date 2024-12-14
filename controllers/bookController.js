const Book = require('../models/bookModel')
const asyncHandler = require('express-async-handler')
const fs = require('fs')


// add a new book
const addBook = asyncHandler( async(req, res) => {

    if (!req.file || !req.body.title || !req.body.author || !req.body.isbn) {
        throw new Error("All Fields are required when adding a book");
    }

    try {

        const book = new Book({
            img : req.file.filename,
            title: req.body.title,
            author: req.body.author,
            isbn : req.body.isbn
        });

        book.save();
        res.redirect('/')
    }catch(error) {
        throw new Error(error.message);
    }
})
// get all books
const getBooks = asyncHandler( async(req, res) => {

    try{
        const books = await Book.find({});
        res.render('index', { 
            title: 'Library Mangement System',
            books : books
        })

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
} )

// get a single book
const getSingleBook = asyncHandler(async(req,res) => {

    try{
        const {id} = req.params
        const book = await Book.findById(id)
        res.render('editbook', { 
            title: 'Library Mangement System',
            book : book
        })

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// save a book
const saveBook = asyncHandler( async(req, res) => {
    try {

        const book = await Book.create(req.body);
        res.status(200).json(book)

    }catch(error) {
        res.status(500)
        throw new Error(error.message)

    }
})

// update book
const updateBook = asyncHandler( async(req,res) => {

    if ( !req.body.title || !req.body.author || !req.body.isbn) {
        throw new Error("All Fields are required when editing a book");
    }


    try{
        const { id } = req.params;

        let new_image = ""

        if ( req.file ) {
            new_image = req.file.filename
            // delete the old image
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image)
            }catch(error) {
                res.status(500)
                throw new Error(error.message)
            }
        }else {
            new_image = req.body.old_image
        }

        const editedBook = new Book({
            _id : id,
            img : new_image,
            title: req.body.title,
            author: req.body.author,
            isbn : req.body.isbn
        });
        const book = await Book.findOneAndUpdate ( {'_id': id } , editedBook);

        res.redirect('/')


    }catch(error){

        res.status(500)
        throw new Error(error.message)
    }
})


// delete a book
deleteBook = asyncHandler( async(req, res) => { 

    try{
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)
        if ( !book) {
            return res.status(404).json({ message: `can not find any book with id ${id}`})
        }
        
        res.redirect('/')

        // set session here...

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    addBook,
    getBooks,
    getSingleBook,
    saveBook,
    updateBook,
    deleteBook
}