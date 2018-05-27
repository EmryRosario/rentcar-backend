const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const TransactionsSchema = new Schema({
 id: ObjectId,
 description: String,
 customer: {type: ObjectId, ref: 'Customer'},
 employee: {type: ObjectId, ref: 'Employee'},
 rent: {type: ObjectId, ref: 'Rent', unique:true},
 total: {type: Schema.Types.Decimal128, required: true},
 type: String,
 state: {type: String, default: 'Activo'},
 date:  { type: Date, default: Date.now },
})

module.exports = mongoose.model('Transaction', TransactionsSchema);