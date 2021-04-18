const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
//const bodyParser = require('body-parser')
const config = require('./config')
const authRouter = require('./routes/login')
const registrationRouter = require('./routes/registration')
const protectedRouter = require('./routes/protected')
const logoutRouter = require('./routes/logout')
const usersRouter = require('./routes/users')
const hbs = require("hbs")
const session = require("express-session")
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)//to store sessions in mongo

//Connection to DB
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', (err)=>{
    console.log(`Mongoose connection's error: ${err}`)
    process.exit(1)
})
mongoose.connection.on('connected', ()=>{
    console.log(`Mongoose connected to: ${config.MONGO_URI}`)
})
process.on('SIGINT', async ()=>{
    await mongoose.connection.close();
    console.log('Connection to the DB is closed');
    process.exit(0);
})

const app = express()
app.use(require('morgan')('tiny'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//For passportJS
app.use(session({ 
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: null,
        httpOnly: true,
        sameSite: true
    },
     store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

//Passport LocalStrategy
require('./middleware/passport')(passport)

//Setting hbs
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname + "/views/partials")) 
hbs.registerHelper('PrintLogoutLink', ()=>{
    return new hbs.SafeString('<li class=\"nav-item\"><a class="nav-link" href="/logout">Logout</a></li>')
})

//Routes
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }))
app.use('/css', express.static(path.join(__dirname, '/public/main.css')))
app.use('/js', express.static(path.join(__dirname, '/public/js')))
app.use('/login', authRouter)
app.use('/registration', registrationRouter)
app.use('/protected', protectedRouter)
app.use('/logout', logoutRouter)
app.use('/users', usersRouter)
app.get(/favicon.ico$/, (req, res)=>{ res.status(204).end() })

// a custom error handler
app.use((e, req, res, next)=>{
    console.error(e)
    res.status(500).send("Something went wrong")
})

module.exports = app