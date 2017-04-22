const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const http = require('http')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')

const app = express()

const server = http.createServer(app)
const io = require('socket.io').listen(server)

mongoose.Promise = require('bluebird')

app.set('socketio', io)
app.set('server', server)

io.on('connection', socket => {})

mongoose.connect('mongodb://localhost:27017/finance')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(flash());
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

const routes = require('./routes/index')
app.use('/', routes)

// app.post('/api/session', (req, res, next) => {
//   console.log(req.body);
// });

const Account = require('./models/account')
passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.use((err, req, res, next) => {
  if (!err) return next()
  res.status(500).send(err)
})

module.exports = app
