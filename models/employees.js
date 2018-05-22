const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const EmployeesSchema = new Schema({
 id: ObjectId,
 name: String,
 cedula: String,
 workSession: String,
 commissionPercentage: Schema.Types.Decimal128,
 entry: {type: Date, default: Date.now},
 state: String,
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
})

module.exports = mongoose.model('Employee', EmployeesSchema);