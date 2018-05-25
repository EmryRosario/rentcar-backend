const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const VehicleBrand = require('../models/vehicle-brands')

let dbConnection = process.env.DB_CONNECTION


router.post('/vehicle-brand', (req, res) => {
    console.log(req.body)
    if (!req.body.vehicleBrand) {
        res.status(400)
        console.log('POST /vehicle-brand error: "Not vehicleBrand found."')
        return res.json({error: 400, msg: 'Not vehicleBrand found.'})
    }
      
    mongoose.connect(dbConnection)
    let newBrand = req.body.vehicleBrand
    
    let brand = new VehicleBrand(newBrand)
    
    brand.save()
    .then(b => {
        mongoose.disconnect()
        res.json(b)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/vehicle-brand', (req, res) => {
    mongoose.connect(dbConnection)
    let brand = req.body.vehicleBrand || {}
    
    VehicleBrand.find(brand)
    .populate('employee')
    .exec((err, brands) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }

       return res.json(brands)
    })
})

router.put ('/vehicle-brand/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    VehicleBrand.findOneAndUpdate(condition, update)
    .exec()
    .then(vehicleBrand => {
        mongoose.disconnect()
        res.json(vehicleBrand)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/vehicle-brand/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let vehicleBrand = []
    
    VehicleBrand.find(toDelete)
    .exec()
    .then(vehicleBrandToDelete => {
        vehicleBrand = vehicleBrandToDelete
        VehicleBrand.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(vehicleBrand)   
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
