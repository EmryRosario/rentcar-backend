const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const VehiclesSchema = new Schema({
 id: ObjectId,
 description: String,
 chasis: String,
 engine: String,
 placa: String,
 vehicleType: {type: ObjectId, ref: 'VehicleType'},
 color: String,
 brand: {type: ObjectId, ref: 'VehicleBrand'},
 model: {type: ObjectId, ref: 'VehicleModel'},
 fuel: {type: ObjectId, ref: 'FuelType'},
 employee: {type: ObjectId, ref: 'Employee'},
 state: {type: String, default: 'Activo'},
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
});

module.exports =  mongoose.model('Vehicle', VehiclesSchema);