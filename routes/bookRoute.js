const express = require('express')
const router = express.Router();
const multer = require('multer');

const { addBook, getBooks, getSingleBook , saveBook, updateBook , deleteBook} = require('../controllers/bookController')


// image upload
let storage = multer.diskStorage({
    destination: function (req, file, cb ){
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_"+ Date.now() + "_" + file.originalname )
    }
});

const upload = multer({
    storage: storage,
}).single('imagefile')


// edit a book
router.post('/editbook/:id', upload, updateBook )
// add a book 
router.post('/addbook', upload, addBook )



// get all books
router.get('/', getBooks)
// get a book 
router.get('/:id', getSingleBook)
// save a book
router.post('/', saveBook)
// update a book
router.put('/:id', updateBook )
// delete a book
router.delete('/:id', deleteBook)

module.exports = router