const mongoose = require('mongoose')

const CarCostsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  additionalDay: {
    type: Number,
    default: 150
  },
  transportCity: {
    type: Number,
    default: 1
  },
  transportOutCity: {
    type: Number,
    default: 50
  },
  CDW: {
    type: Number,
    default: 1500
  },
  TW: {
    type: Number,
    default: 1500
  },
  fuel: {
    type: Number,
    default: 5
  },
  transportOutWork: {
    type: Number,
    default: 10
  },
  cleaning: {
    type: Number,
    default: 150
  },
  noSmoking: {
    type: Number,
    default: 500
  }
}, {
  versionKey: false,
  timestamps: true
})

const CarCosts = mongoose.model('CarCosts', CarCostsSchema)

module.exports = CarCosts
