const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const FuelType = require('../models/fuel-types')

let dbConnection = process.env.DB_CONNECTION


router.post('/fuel-type', (req, res) => {
    if (!req.body.fuelType) {
        res.status(400)
        console.log('POST /fuel-type error: "Not fuelType found."')
        return res.json({error: 400, msg: 'Not fuelType found.'})
    }
      
    mongoose.connect(dbConnection)
    let newFuelType = req.body.fuelType
    
    let fuelType = new FuelType(newFuelType)
    
    fuelType.save()
    .then(ft => {
        mongoose.disconnect()
        res.json(ft)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/fuel-type', (req, res) => {
    mongoose.connect(dbConnection)
    let fuelType = req.query.fuelType || {}
    
    FuelType.find(fuelType)
    .populate('employee')
    .exec((err, fuelTypes) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }

       return res.json(fuelTypes)
    })
})

router.put ('/fuel-type/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    FuelType.findOneAndUpdate(condition, update)
    .exec()
    .then(fuelType => {
        mongoose.disconnect()
        res.json(fuelType)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/fuel-type/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let fuelType = []
    
    FuelType.find(toDelete)
    .exec()
    .then(fuelTypeToDelete => {
        fuelType = fuelTypeToDelete
        FuelType.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(fuelType)   
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
