const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Customer = require('../models/customers')

let dbConnection = process.env.DB_CONNECTION


router.post('/customer', (req, res) => {
    if (!req.body.customer) {
        res.status(400)
        console.log('POST /customer error: "Not customer found."')
        return res.json({error: 400, msg: 'Not customer found.'})
    }
      
    mongoose.connect(dbConnection)
    let newCustomer = req.body.customer
    
    let customer = new Customer(newCustomer)
    customer.save()
    .then(c => {
        mongoose.disconnect()
        res.json(c)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/customer', (req, res) => {
    mongoose.connect(dbConnection)
    let customer = req.query.customer || {}
    
    Customer.find(customer)
    .populate('rents')
    .populate('employee')
    .exec((err, customers) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }
       return res.json(customers)
    })
})

router.put ('/customer/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    Customer.findOneAndUpdate(condition, update)
    .exec()
    .then(customer => {
        mongoose.disconnect()
        res.json(customer)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/customer/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let customer = []
    
    Customer.find(toDelete)
    .exec()
    .then( customerToDelete => {
        customer = customerToDelete
        Customer.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(customer)   
        })
    })
    .catch(e => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: e.msg})
    })

})
module.exports = router
