const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const TransactionsSchema = new Schema({
 id: ObjectId,
 description: String,
 customer: {type: ObjectId, ref: 'Customer'},
 employee: {type: ObjectId, ref: 'Employee'},
 inspection: {type: ObjectId, ref: 'Inspection'},
 rent: {type: ObjectId, ref: 'Rent'},
 type: String,
 state: String,
 date:  { type: Date, default: Date.now },
})

module.exports = mongoose.model('Transaction', TransactionsSchema);