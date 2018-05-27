const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const app = express()

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

let dbConnection = process.env.DB_CONNECTION

mongoose.connect(dbConnection);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('We\'re connected...')

})

app.use('/', vehicleModelRouter)
app.use('/', employeeRouter)
app.use('/', vehicleTypeRouter)
app.use('/', vehicleBrandRouter)
app.use('/', fuelTypeRouter)
app.use('/', vehicleRouter)
app.use('/', rentRouter)
app.use('/', customerRouter)

app.listen(3000, () => console.log('The server is listen on port 3000...'))