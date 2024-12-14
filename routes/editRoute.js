const express = require('express')
const router = express.Router();

const {getSingleBook} = require('../controllers/bookController');
const loginMiddleware = require('../middleware/loginMiddleware');

// get all books
router.get('/:id', loginMiddleware, getSingleBook)

module.exports = router