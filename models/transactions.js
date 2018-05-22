const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const TransactionsSchema = new Schema({
 id: ObjectId,
 description: String,
 customer: {type: ObjectId, ref: 'Customer'},
 employee: {type: ObjectId, ref: 'Employee'},
 inspection: {type: ObjectId, ref: 'Inspection'},
 rent: ObjectId,
 type: String,
 state: String,
 date:  { type: Date, default: Date.now },
})

module.exports = mongoose.model('Transaction', TransactionsSchema);