const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Employee = require('../models/employees')

let dbConnection = process.env.DB_CONNECTION


router.post('/employee', (req, res) => {
    if (!req.body.employee) {
        res.status(400)
        console.log('POST /employee error: "Not employee found."')
        return res.json({error: 400, msg: 'Not employee found.'})
    }
      
    mongoose.connect(dbConnection)
    let newEmployee = req.body.employee
    
    let employee = new Employee(newEmployee)
    
    employee.save()
    .then(e => {
        mongoose.disconnect()
        res.json(e)
    })
    .catch(err => {
        res.status(500)
        mongoose.disconnect()
        res.json({message: err.message})
    })        
})

router.get('/employee', (req, res) => {
    mongoose.connect(dbConnection)
    let employee = req.query.employee || {}
    Employee.find(employee)
    .exec((err, employees) => {
        mongoose.disconnect();
       if (err) {
           res.status(500)
           return res.send()
       }

       return res.json(employees)
    })
})

router.put ('/employee/:id/', (req, res) => {
    mongoose.connect(dbConnection)
    let condition = {}
    let update = req.body.update
    
    if (update.id || update._id) {
        delete update.id
        delete update._id
    }

    if (req.params.id) condition._id = req.params.id

    Employee.findOneAndUpdate(condition, update)
    .exec()
    .then(employee => {
        mongoose.disconnect()
        res.json(employee)
    })
    .catch(err => {
        mongoose.disconnect()
        res.status(500)
        res.json({error: 'Error'})
    })
})

router.delete('/employee/', (req, res) => {
    mongoose.connect(dbConnection)    

    let toDelete = req.body.delete || {}
    let employees = []
    if (req.params.id) toDelete._id = req.params.id

    Employee.find(toDelete)
    .exec()
    .then(employeesToDelete => {
        employees = employeesToDelete
        Employee.find(toDelete)
        .remove()
        .exec(() => {
            mongoose.disconnect()
            res.json(employees)   
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
