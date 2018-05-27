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
 rents: [{type: ObjectId, ref: 'Rent'}],
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
})

module.exports =   mongoose.model('Customer', CustomersSchema);