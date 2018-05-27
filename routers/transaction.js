const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Transaction = require('../models/transactions')

let dbConnection = process.env.DB_CONNECTION


router.post('/transaction', (req, res) => {
    if (!req.body.transaction) {
        res.status(400)
        console.log('POST /transaction error: "Not transaction found."')
        return res.json({error: 400, msg: 'Not transaction found.'})
    }
      
    mongoose.connect(dbConnection)
    let newTransaction = req.body.transaction
    
    let transaction = new Transaction(newTransaction)
    transaction.save()
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

router.get('/transaction', (req, res) => {
    mongoose.connect(dbConnection)
    let transaction = req.query.transaction || {}
    
    Transaction.find(transaction)
    .populate('rent')
    .populate('employee')
    .populate('customer')
    .exec((err, transactions) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }
       return res.json(transactions)
    })
})

router.put ('/transaction/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    Transaction.findOneAndUpdate(condition, update)
    .exec()
    .then(transaction => {
        mongoose.disconnect()
        res.json(transaction)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/transaction/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let transaction = []
    
    Transaction.find(toDelete)
    .exec()
    .then( transactionToDelete => {
        transaction = transactionToDelete
        Transaction.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(transaction)   
        })
    })
    .catch(e => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: e.msg})
    })

})

module.exports = router
