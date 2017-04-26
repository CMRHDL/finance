const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recordset = new Schema({
  amount: Number,
  attribution: { type: Schema.Types.ObjectId, ref: 'Attribution' },
  code: Number,
  date: Date,
  description: String,
})

module.exports = mongoose.model('Recordset', Recordset)
