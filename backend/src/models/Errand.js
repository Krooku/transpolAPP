const mongoose = require('mongoose')

const ErrandSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  employeeRented: {
    type: String
  },
  employeePickedUp: {
    type: String
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  errandNumber: { type: String, default: 'prywatne' },
  isClearBefore: { type: Boolean, required: true },
  isClearAfter: { type: Boolean },
  contractNumber: { type: Number, default: 10000 },
  carCost: {
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
  },
  role: {
    type: String,
    enum: ['canceled', 'rent', 'transport'],
    default: 'rent'
  },
  client: {
    fullname: { type: String, required: true },
    birthDate: { type: Date, required: true },
    birthPlace: { type: String, required: true },
    driveLicense: {
      number: { type: String, required: true },
      releaseDate: { type: Date, required: true },
      releasePlace: { type: String, required: true }
      // required: true
    },
    idCard: {
      number: { type: String, required: true },
      expDate: { type: Date, required: true },
      releasePlace: { type: String, required: true }
      // required: true
    },
    contact: {
      zipCode: { type: String },
      city: { type: String },
      street: { type: String },
      phone: { type: String }
    }
    // required: true
  },
  additionalDriver: {
    fullname: { type: String },
    birthDate: { type: Date },
    driveLicense: {
      number: { type: String },
      releaseDate: { type: Date },
      releasePlace: { type: String }
    }
  },
  insuranceCosts: {
    rentDays: { type: Number },
    maxRentDays: { type: Number },
    carClass: { type: String, required: true },
    carSubstitution: { type: Boolean, required: true },
    carReturn: { type: Boolean, required: true },
    CDW: { type: Boolean, required: true },
    TW: { type: Boolean, required: true },
    deposit: { type: Boolean, required: true },
    noKmLimit: { type: Boolean, required: true },
    other: { type: String, default: '' }
    // required: true
  },
  rent: {
    place: { type: String, required: true },
    date: { type: Date, required: true },
    mileage: { type: Number, required: true },
    fuel: { type: Number, required: true },
    planningDate: { type: Date },
    planningReturnPlace: { type: String, required: true },
    deposit: { type: Number },
    scratchs: {
      type: [ { x: { type: Number },
        y: { type: Number }
      }
      ],
      default: []
    },
    signature: { type: String, required: true }
    // required: true
  },
  returnCar: {
    place: { type: String },
    realDate: { type: Date },
    mileage: { type: Number },
    fuel: { type: Number },
    deposit: { type: Date },
    depositSignature: { type: String },
    comments: { type: String, default: '' },
    scratchs: {
      type: [ { x: { type: Number },
        y: { type: Number }
      }
      ],
      default: []
    },
    signature: { type: String }

  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const Errand = mongoose.model('Errand', ErrandSchema)

module.exports = Errand
