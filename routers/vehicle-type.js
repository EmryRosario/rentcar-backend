const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const VehicleType = require('../models/vehicle-types')

let dbConnection = process.env.DB_CONNECTION


router.post('/vehicle-type', (req, res) => {
    console.log(req.body)
    if (!req.body.vehicleType) {
        res.status(400)
        console.log('POST /vehicle-type error: "Not vehicleType found."')
        return res.json({error: 400, msg: 'Not vehicleType found.'})
    }
      
    mongoose.connect(dbConnection)
    let newType = req.body.vehicleType
    
    let type = new VehicleType(newType)
    
    type.save()
    .then(t => {
        mongoose.disconnect()
        res.json(t)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/vehicle-type', (req, res) => {
    mongoose.connect(dbConnection)
    let type = req.query.vehicleType || {}
    
    VehicleType.find(type)
    .populate('employee')
    .exec((err, types) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }

       return res.json(types)
    })
})

router.put ('/vehicle-type/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    VehicleType.findOneAndUpdate(condition, update)
    .exec()
    .then(vehicleType => {
        mongoose.disconnect()
        res.json(vehicleType)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/vehicle-type/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let vehicleType = []

    VehicleType.find(toDelete)
    .exec()
    .then(vehicleTypeToDelete => {
        vehicleType = vehicleTypeToDelete
        VehicleType.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(vehicleType)   
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
