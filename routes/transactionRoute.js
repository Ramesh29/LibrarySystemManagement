const express = require('express')
const router = express.Router();

const { showAddTransView, getTrans, getSingleTran , addTran, editTran  } = require('../controllers/transactionController')



// show add transview
router.get('/showAddTransView', showAddTransView )

// add a transaction
router.post('/addTrans', addTran )

// edit a transaction
router.get('/editTrans/:id', editTran)

// get all transaction
router.get('/', getTrans)

module.exports = router