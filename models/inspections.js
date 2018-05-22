const mongoose = require('mongoose');

const Schema = mongoose.Schema

let ObjectId = Schema.ObjectId
 
const InspectionsSchema = new Schema({
 id: ObjectId,
 vehicle: {type: ObjectId, ref: 'Vehicle'},
 customer: {type: ObjectId, ref: 'Customer'},
 employee: {type:ObjectId, ref: 'Employee'},
 scratches: Boolean,
 fuel: Schema.Types.Decimal128,
 gomaRepuesto: Boolean,
 gato: Boolean,
 glassBreaks: Boolean,
 tiresState: [Boolean],

 state: String,
 date:  { type: Date, default: Date.now },
})

module.exports = mongoose.model('Inspection', InspectionsSchema);