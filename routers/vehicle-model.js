const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const vehicleModel = require('../models/vehicle-models')

let dbConnection = process.env.DB_CONNECTION


router.post('/vehicle-model', async (req, res) => {
      
    mongoose.connect(dbConnection)
    let db = mongoose.connection

    let vehicle = new vehicleModel()
    vehicle.description = 'Accord'
    vehicle.state = 'Activo'
    await vehicle.save().catch((err) => console.log(err))
    mongoose.disconnect()
    res.json(vehicle)        
})

module.exports = router