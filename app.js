require('dotenv').config()
const express = require('express')
const moment = require('moment')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

const userRoute = require('./routes/userRoute')
const bookRoute = require('./routes/bookRoute')
const patronRoute = require('./routes/patronRoute')
const transactionRoute = require('./routes/transactionRoute')

const listRoute = require('./routes/listRoute')
const editRoute = require('./routes/editRoute')
const deleteRoute = require('./routes/deleteRoute')


const errorMiddleware = require('./middleware/errorMiddleware')
const loginMiddleware = require('./middleware/loginMiddleware')
const cors = require('cors')


const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL


app.use(express.static('uploads'))
// set template engine
app.set("view engine", "ejs")


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// connect to database.
mongoose.connect(MONGO_URL)
    .then( () => {
        console.log('Connected to mongodb')       
    }).catch((error) => {
        console.log(error)
    })

const store = new MongoDBSession({ 
    uri: MONGO_URL,
    collection: "mySessions"
})

app.use( session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store
}))  



// routes

app.use('/api/users', userRoute)
app.use('/api/books', bookRoute )
app.use('/api/trans', transactionRoute )
app.use('/api/patrons', patronRoute )



// user interface routes
app.use('/', listRoute)
app.use('/editbook', editRoute)
app.get('/addbook', loginMiddleware, (req, res) => {
    res.render('addbook', { title : "Library Mangement System - Add a new book"})
})
app.use('/deletebook', deleteRoute)

app.get('/login', (req, res) => {
    res.render('login', { title : "Library Management System - Login"})
})
app.get('/register', (req, res) => {
    res.render('register', {title: "Library Management System - Register"})
})


app.use(errorMiddleware)

app.listen(PORT, () =>{
    console.log(`Node API app is running on port ${PORT}`);
}) 
