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

// app.get('*', (req, res) => {
//   // let h = new Vehicle({
//   //   description: 'asdsadsd',
//   //   chasis: '23943560dk',
//   //   engine: '695043433490',
//   //   placa: 'dkfmdsfksd2',
//   //   vehicleType: '695065trgof',
//   //   brand: 'kdlgdsfsd',
//   //   model: 'hfgmfgf',
//   //   fuel: 'dskdmgkfgmfk'
//   //  })

//   //  h.save((err, model) => {
//   //    if ( err ) res.json(err)
//   //    res.json(model)
//   //  })

//   // Vehicle.find({}, function (err, docs) {
//   //   if (err) return res.send(err)

//   //   res.json(docs)
//   // })
// })

app.listen(3000, () => console.log('The server is listen on port 3000...'))