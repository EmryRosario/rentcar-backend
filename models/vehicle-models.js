const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const VehicleModelsSchema = new Schema({
 id: ObjectId,
 description:{ type: String, required: true, unique: true},
 employee: {type: ObjectId, ref: 'Employee'},
 state: String,  
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
})


module.exports =   mongoose.model('VehicleModel', VehicleModelsSchema)
