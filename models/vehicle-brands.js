const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const VehicleBrandsSchema = new Schema({
 id: ObjectId,
 description: String,
 employee: {type: ObjectId, ref: 'Employee'},
 state: {type: String, default: 'Activo'},  
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
})

module.exports =   mongoose.model('VehicleBrand', VehicleBrandsSchema)
