const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const VehicleModel = require('../models/vehicle-models')

let dbConnection = process.env.DB_CONNECTION


router.post('/vehicle-model', (req, res) => {
    if (!req.body.vehicleModel || !req.body.vehicleModel.description) {
        res.status(400)
        console.log('POST /vehicle-model error: "Not Vehicle model description found."')
        return res.json({error: 400, msg: 'Not Vehicle model description found.'})
    }
      
    mongoose.connect(dbConnection)
    let model = req.body.vehicleModel
    
    let vModel = new VehicleModel({
        description: model.description,
        state: model.state || 'Activo',
        employee: '5b05846f6ba18f3fc0a1da44'
    })
    vModel.save()
    .then(model => {
        mongoose.disconnect()
        res.json(model)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/vehicle-model', (req, res) => {
    mongoose.connect(dbConnection)
    let vehicleModel = req.body.vehicleModel || {}
    VehicleModel.find(vehicleModel)
    .populate('employee')
    .exec((err, models) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }

       return res.json(models)
    })
})

router.put ('/vehicle-model/:id', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    VehicleModel.findOneAndUpdate(condition, update)
    .exec()
    .then(modelUpdated => {
        mongoose.disconnect()
        res.json(modelUpdated)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/vehicle-model', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete
    let models = []

    VehicleModel.find(toDelete)
    .exec()
    .then(modelsToDelete => {
        models = modelsToDelete
        VehicleModel.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(models)   
        })
    })

    //TODO
})
module.exports = router
