const express = require('express')
const router = express.Router();

const { showAddPatronView, addPatron, showEditPatronView, editPatron, getPatrons, getPatron } = require('../controllers/patronController')



// show a add patron view
router.get('/showAddPatronView', showAddPatronView)
// add a patron
router.post('/addPatron', addPatron )

// show edit patron view
router.get('/showEditPatronView/:id', showEditPatronView )

// edit a book
router.post('/editPatron/:id', editPatron )

// get all patrons
router.get('/', getPatrons)
// get a patron
router.get('/:id', getPatron)

module.exports = router