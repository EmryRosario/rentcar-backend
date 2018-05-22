const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const app = express()

const Vehicle = require('./models/vehicles')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect('mongodb://localhost/rentcar');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('We\'re connected...')

})

app.get('*', (req, res) => {
  // let h = new Vehicle({
  //   description: 'asdsadsd',
  //   chasis: '23943560dk',
  //   engine: '695043433490',
  //   placa: 'dkfmdsfksd2',
  //   vehicleType: '695065trgof',
  //   brand: 'kdlgdsfsd',
  //   model: 'hfgmfgf',
  //   fuel: 'dskdmgkfgmfk'
  //  })

  //  h.save((err, model) => {
  //    if ( err ) res.json(err)
  //    res.json(model)
  //  })
  Vehicle.find({}, function (err, docs) {
    if (err) return res.send(err)

    res.json(docs)
  })
})

app.listen(3000, () => console.log('The server is listen on port 3000...'))