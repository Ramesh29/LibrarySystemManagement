const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


// register a user
const registerUser = asyncHandler( async(req, res) => {
    try {

        const { username, password } = req.body;
        
        let user = await User.findOne({ username})

        if ( user ) {
            return res.redirect('/register')
        }

        const hashedPwd = await bcrypt.hash(password, 12);
        user = new User({
            username,
            password: hashedPwd
        });

        user.save();
        res.redirect('/login')

    }catch(error) {
        res.status(500)
        throw new Error(error.message)

    }
})

// login a user
const loginUser = asyncHandler(async(req,res) => {
    try{

        const { username, password } = req.body


        const user = await User.findOne({username})
        if (!user) {
            return res.redirect('/register')
        }

        const isMatch = await bcrypt.compare(password, user.password )

        if (!isMatch) {
            return res.redirect("/login");
        }

        // set logged in
        req.session.isAuth = true
        res.redirect('/api/books')

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})


// logout user
const logoutUser = asyncHandler(async(req,res) => {
    try{
        req.session.destroy((err) => {
            if(err) throw err;
            res.redirect('/login')
        })

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})






// get all users
const getUsers = asyncHandler( async(req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);

    }catch(error){
        res.status(500)
        throw new Error(error.message)    }
} )

// get a single user
const getSingleUser = asyncHandler(async(req,res) => {

    try{
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user);

    }catch(error) {
        res.status(500)
        throw new Error(error.message)    }
})

// save a user
const saveUser = asyncHandler( async(req, res) => {
    try {

        const user = await User.create(req.body);
        res.status(200).json(user)

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// update user
const updateUser = asyncHandler( async(req,res) => {

    try{
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id ,req.body);
        // we can not find any user in database
        if (!user) {
            return res.status(404).json({messsage: `can not find any user with ID ${id}`})
        }
        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)

    }catch(error){
        res.status(500).json({message: error.message})
    }
} )

// delete a user
deleteUser = asyncHandler( async(req, res) => { 
    try{
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        if ( !user) {
            return res.status(404).json({ message: `can not find any user with id ${id}`})
        }
        res.status(200).json(user)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUsers,
    getSingleUser,
    saveUser,
    updateUser,
    deleteUser
}