const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(

    {

        img : {
            type: String,
            required: [ true, "please select a image"]
        },
        title: {
            type: String,
            required: [ true, "Please enter a username"]
        },
        author: {
            type: String,
            required: [ true, "Please enter a password"]
        },
        isbn : {
            type: String,
            required: [ true, "Please enter an isbn"]
        }

    }
)

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;