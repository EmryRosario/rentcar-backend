const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const CustomersSchema = new Schema({
 id: ObjectId,
 name: String,
 cedula: String,
 creditCard: String,
 creditLimit: Schema.Types.Decimal128,
 peopleType: String,
 state: String,
 rents: [{
    id: ObjectId,
    employee: {type: ObjectId, ref: 'Employee'},
    vehicle: {type: ObjectId, ref: 'Vehicle'},
    rentDate: {type: Date, default: Date.now},
    returnDate: {type: Date},
    amountPerDay: Schema.Types.Decimal128,
    days: Number,
    comment: String,
    state: String
 }],
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
})

module.exports =   mongoose.model('Customer', CustomersSchema);