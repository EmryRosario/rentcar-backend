const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const VehiclesSchema = new Schema({
 id: ObjectId,
 description: String,
 chasis: String,
 engine: String,
 placa: String,
 vehicleType: String,
 brand: String,
 model: String,
 fuel: String,
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Vehicle', VehiclesSchema);