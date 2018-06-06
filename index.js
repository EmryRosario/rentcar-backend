const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Vehicle = require('./models/vehicles')
const VehicleType = require('./models/vehicle-types')
const vehicleBrand = require('./models/vehicle-brands')
const Transaction = require('./models/transactions')
const Inspection = require('./models/inspections')
const fuelType = require('./models/fuel-types')
const Employee = require('./models/employees')
const Customer = require('./models/customers')

const vehicleModelRouter = require('./routers/vehicle-model')
const employeeRouter = require('./routers/employee')
const vehicleTypeRouter = require('./routers/vehicle-type')
const vehicleBrandRouter = require('./routers/vehicle-brand')
const fuelTypeRouter = require('./routers/fuel-type')
const vehicleRouter = require('./routers/vehicle')
const rentRouter = require('./routers/rent')
const customerRouter = require('./routers/customer')
const transactionRouter = require('./routers/transaction')
const inspectionRouter = require('./routers/inspection')
const expressSession = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

let dbConnection = process.env.DB_CONNECTION

mongoose.connect(dbConnection);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('We\'re connected...')

})

passport.use(new LocalStrategy(
  (username, password, done) => {
    Employee.findOne({ user: username, password },  (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      user.set('password', null)
      return done(null, user);
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user._id);

})

passport.deserializeUser(function(id, done) {
  Employee.findById(id)
  .then(user => {
    user.set('password', null)
    done(null, user)
  })
  .catch(err => done(err, false))
})

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/login')
}

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/login', (req,res) => {
  res.json({authenticationStatus: false})
})

app.get('/', ensureAuthenticated, (req, res) => {
  res.json(req.user)
})

app.use('/', vehicleModelRouter)
app.use('/', employeeRouter)
app.use('/', vehicleTypeRouter)
app.use('/', vehicleBrandRouter)
app.use('/', fuelTypeRouter)
app.use('/', vehicleRouter)
app.use('/', rentRouter)
app.use('/', customerRouter)
app.use('/', transactionRouter)
app.use('/', inspectionRouter)

app.listen(3000, () => console.log('The server is listen on port 3000...'))