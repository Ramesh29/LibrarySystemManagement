const express = require('express')
const router = express.Router();

const { registerUser, loginUser , logoutUser,  getUsers, getSingleUser , saveUser, updateUser , deleteUser} = require('../controllers/userController')

// register a user
router.post('/register', registerUser )

// login user
router.post('/login', loginUser)

// logout user
router.get('/logout', logoutUser)

// get all users
router.get('/', getUsers)
// get a user 
router.get('/:id', getSingleUser)
// save a user
router.post('/', saveUser)
// update a user
router.put('/:id', updateUser )
// delete a user
router.delete('/:id', deleteUser)

module.exports = router