const mongoose = require('mongoose')

const CarSchema = mongoose.Schema({
  errandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Errand'
  },
  carCostsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarCosts'
  },
  band: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'SUV'],
    default: 'A'
  },
  role: {
    type: String,
    enum: ['avaiable', 'rent', 'transport'],
    default: 'avaiable'
  },
  vim: {
    type: String,
    required: true
  },
  mileage: {
    type: Number,
    required: false
  },
  fuel: {
    type: Number,
    default: 100
  },
  isClean: {
    type: Boolean,
    default: true
  },
  isRented: {
    type: Boolean,
    default: false
  },
  scratchs: {
    type: [ { x: { type: Number },
      y: { type: Number }
    }
    ],
    default: []
  }
}, {
  versionKey: false,
  timestamps: true
})

const Car = mongoose.model('Car', CarSchema)

module.exports = Car
