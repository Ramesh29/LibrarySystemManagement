const express = require('express')
const router = express.Router();

const { deleteBook } = require('../controllers/bookController');
const loginMiddleware = require('../middleware/loginMiddleware');

// delete a book with id
router.get('/:id', loginMiddleware, deleteBook)


module.exports = router