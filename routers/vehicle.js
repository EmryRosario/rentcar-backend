const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Vehicle = require('../models/vehicles')

let dbConnection = process.env.DB_CONNECTION


router.post('/vehicle', (req, res) => {
    if (!req.body.vehicle) {
        res.status(400)
        console.log('POST /vehicle error: "Not vehicle found."')
        return res.json({error: 400, msg: 'Not vehicle found.'})
    }
      
    mongoose.connect(dbConnection)
    let newVehicle = req.body.vehicle
    
    let vehicle = new Vehicle(newVehicle)
    
    vehicle.save()
    .then(v => {
        mongoose.disconnect()
        res.json(v)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/vehicle', (req, res) => {
    mongoose.connect(dbConnection)
    let vehicle = req.query.vehicle || {}
    
    Vehicle.find(vehicle)
    .populate('vehicleType')
    .populate('brand')
    .populate('model')
    .populate('fuel')
    .populate('employee')
    .exec((err, vehicles) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }

       return res.json(vehicles)
    })
})

router.put ('/vehicle/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    Vehicle.findOneAndUpdate(condition, update)
    .exec()
    .then(vehicle => {
        mongoose.disconnect()
        res.json(vehicle)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/vehicle/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let vehicle = []
    
    Vehicle.find(toDelete)
    .exec()
    .then( vehicleToDelete => {
        vehicle = vehicleToDelete
        Vehicle.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(vehicle)   
        })
    })
    .catch(e => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: e.msg})
    })

    //TODO
})
module.exports = router
