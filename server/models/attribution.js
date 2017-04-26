const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Attribution = new Schema({
  isIncome: Boolean,
  attribution: String,
})

module.exports = mongoose.model('Attribution', Attribution)
