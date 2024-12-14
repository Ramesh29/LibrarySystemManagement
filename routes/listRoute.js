const express = require('express')
const router = express.Router();

const {getBooks} = require('../controllers/bookController');
const loginMiddleware = require('../middleware/loginMiddleware');

// get all books
router.get('/', loginMiddleware, getBooks)


module.exports = router