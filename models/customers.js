const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const CustomersSchema = new Schema({
 id: ObjectId,
 name: {type: String, unique: true},
 cedula: {type: String, unique: true},
 creditCard: {type: String, unique: true},
 creditLimit: Schema.Types.Decimal128,
 peopleType: {type: String, default: 'Fisica'},
 created: {type: ObjectId, ref: 'Employee'},
 state: {type: String, default: 'Activo'},
 rents: [{type: ObjectId, ref: 'Rent', unique:true}],
 date:  { type: Date, default: Date.now },
 updated:  { type: Date, default: Date.now }
})

module.exports =   mongoose.model('Customer', CustomersSchema);