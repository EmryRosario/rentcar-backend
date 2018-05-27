const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Rent = require('../models/rent')

let dbConnection = process.env.DB_CONNECTION


router.post('/rent', (req, res) => {
    if (!req.body.rent) {
        res.status(400)
        console.log('POST /rent error: "Not rent found."')
        return res.json({error: 400, msg: 'Not rent found.'})
    }
      
    mongoose.connect(dbConnection)
    let newRent = req.body.rent
    
    let rent = new Rent(newRent)
    //TODO
    rent.save()
    .then(r => {
        mongoose.disconnect()
        res.json(r)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/rent', (req, res) => {
    mongoose.connect(dbConnection)
    let rent = req.query.rent || {}
    
    Rent.find(rent)
    .populate('vehicle')
    .populate('employee')
    .exec((err, rents) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }

       return res.json(rents)
    })
})

router.put ('/rent/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    Rent.findOneAndUpdate(condition, update)
    .exec()
    .then(rent => {
        mongoose.disconnect()
        res.json(rent)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/rent/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let rent = []
    
    Rent.find(toDelete)
    .exec()
    .then( rentToDelete => {
        rent = rentToDelete
        Rent.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(rent)   
        })
    })
    .catch(e => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: e.msg})
    })

})
module.exports = router
