const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Settings = new Schema({
  key: String,
  value: String,
})

module.exports = mongoose.model('Settings', Settings)
