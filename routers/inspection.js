const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Inspection = require('../models/inspections')

let dbConnection = process.env.DB_CONNECTION


router.post('/inspection', (req, res) => {
    if (!req.body.inspection) {
        res.status(400)
        console.log('POST /inspection error: "Not inspection found."')
        return res.json({error: 400, msg: 'Not inspection found.'})
    }
      
    mongoose.connect(dbConnection)
    let newInspection = req.body.inspection
    
    let inspection = new Inspection(newInspection)
    inspection.save()
    .then(i => {
        mongoose.disconnect()
        res.json(i)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/inspection', (req, res) => {
    mongoose.connect(dbConnection)
    let inspection = req.query.inspection || {}
    
    Inspection.find(inspection)
    .populate('vehicle')
    .populate('customer')
    .populate('employee')
    .exec((err, inspections) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }
       return res.json(inspections)
    })
})

router.put ('/inspection/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    Inspection.findOneAndUpdate(condition, update)
    .exec()
    .then(inspection => {
        mongoose.disconnect()
        res.json(inspection)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/inspection/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let inspection = []
    
    Inspection.find(toDelete)
    .exec()
    .then( inspectionToDelete => {
        inspection = inspectionToDelete
        Inspection.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(inspection)   
        })
    })
    .catch(e => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: e.msg})
    })

})

module.exports = router
