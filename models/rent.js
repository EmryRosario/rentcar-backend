const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const RentsSchema = new Schema({
    id: ObjectId,
    employee: {type: ObjectId, ref: 'Employee'},
    vehicle: {type: ObjectId, ref: 'Vehicle'},
    rentDate: {type: Date, default: Date.now},
    returnDate: {type: Date},
    amountPerDay: Schema.Types.Decimal128,
    days: Number,
    comment: String,
    state: {type: String, default: 'Activo'},
    date:  { type: Date, default: Date.now },
    updated:  { type: Date, default: Date.now }
 })

module.exports =   mongoose.model('Rent', RentsSchema);