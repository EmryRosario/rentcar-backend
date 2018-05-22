const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const FuelTypesSchema = new Schema({
 id: ObjectId,
 description: String,
 employee: {type: ObjectId, ref: 'Employee'},
 state: String,  
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
})

module.exports =   mongoose.model('FuelType', FuelTypesSchema)
