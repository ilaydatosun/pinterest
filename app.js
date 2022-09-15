const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const blogRouter = require('./src/routers/blogRouter')
const authRouter = require('./src/routers/authRouter')
const adminRouter = require('./src/routers/adminRouter')
const session = require('express-session')
const flash = require('connect-flash')
const profilRouter = require('./src/routers/profilRouter')
const passport = require('passport')
const pinRouter = require('./src/routers/pinRouter')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Blog = require('./src/model/postModel')



app.use(express.static('public'))
app.use("/uploads", express.static(path.join(__dirname, '/src/uploads')))
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, './src/views'))

//db bağlantısı
require('./src/config/database')
const MongoDBStore = require('connect-mongodb-session')(session);


const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_CONNECTION_STRING,
    collection: 'mySessions'
});


app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60
        },
        store: sessionStore
    }
))

app.use(flash())
app.use((req, res, next) => {
    res.locals.validation_error = req.flash('validation_error')
    res.locals.success_message = req.flash('success_message')
    res.locals.email = req.flash('email')
    res.locals.firstname = req.flash('firstname')
    res.locals.lastname = req.flash('lastname')
    res.locals.password = req.flash('password')
    res.locals.repassword = req.flash('repassword')
    res.locals.login_error = req.flash('error')
    next()
})


app.use(passport.initialize())
app.use(passport.session())

        

app.use(express.urlencoded({ extended: true }))

// app.use('/', blogRouter)
app.use('/', authRouter)
app.use('/blog', blogRouter)

// app.use('/login', loginRouter)
// app.use('/admin', adminRouter )

// app.get('/login', (req, res) => {

//     res.sendFile(path.resolve(__dirname, './src/login-singup/login_singup.html'))
// })

app.use('/profil', profilRouter)
// app.use('/pin', pinRouter)
//app.use('/profil/update', profilRouter)

const fs = require('fs');
require('dotenv/config');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS as templating engine 
app.set("view engine", "ejs");

const multer = require('multer');


app.get('/blog', async (request, response) => {
    let blogs = await Blog.find();
    
    console.log(blogs);
    response.render('index', { posts: blogs });

});


app.use('/blog',blogRouter)
app.use('/pin', pinRouter)


app.listen(3000, () => {
    console.log("3000 portu");
})