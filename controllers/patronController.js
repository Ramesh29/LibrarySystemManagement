const asyncHandler = require('express-async-handler')
const fs = require('fs')
const Patron = require('../models/patronModel')


// show add patron view
const showAddPatronView = asyncHandler( async(req, res) => {
    try {
        // save success full message in session.
        res.render('addpatron', { 
            title: 'Library Mangement System - Add a new patron',
        })

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})


// add a new patron
const addPatron = asyncHandler( async(req, res) => {
    try {
        const patron = new Patron({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            address : req.body.address,
            cardnumber : req.body.cardnumber,
            email: req.body.email,
            phone : req.body.phone
        })

        patron.save();
        
        // save success full message in session.
        res.redirect('/api/patrons')


    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// show edit pattron view
const showEditPatronView = asyncHandler( async(req, res) => {
    try{
        const {id} = req.params
        const patron = await Patron.findById(id)

        res.render('editpatron', { 
            title: 'Library Mangement System - Edit a patron',
            patron : patron
        })

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }

})



// edit a patron
const editPatron = asyncHandler( async(req,res) => {

    try{
        const { id } = req.params;

        const editedPatron = new Patron({
            _id : id, 
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            address : req.body.address,
            cardnumber : req.body.cardnumber,
            email: req.body.email,
            phone : req.body.phone            

        })

        const patron = await Patron.findOneAndUpdate ( {'_id': id } , editedPatron );

        res.redirect('/api/patrons')

    }catch(error){

        res.status(500)
        throw new Error(error.message)
    }
} )




// get all patrons
const getPatrons = asyncHandler( async(req, res) => {

    try{
        const patrons = await Patron.find({});
        res.render('patrons', { 
            title: 'Library Mangement System',
            patrons : patrons
        })

    }catch(error){
        res.status(500)
        throw new Error(error.message)
    }
} )

// get a patron get the data related to the patron 
// and redirect ot editpatron.
const getPatron = asyncHandler(async(req,res) => {

    try{
        const {id} = req.params
        const patron = await Patron.findById(id)
        res.render('editpatron', { 
            title: 'Library Mangement System',
            patron : patron
        })

    }catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})


module.exports = {
    showAddPatronView,
    addPatron,
    showEditPatronView,
    editPatron,
    getPatrons,
    getPatron
}