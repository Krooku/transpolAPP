const { Errand } = require('../models')
const { Car } = require('../models')

module.exports.insert = async function insertErrand (req, res) {
  const userId = req.session.user.id
  const { carId } = req.params

  const { errandNumber, employeeRented, isClearBefore, carCost, role, client, additionalDriver, insuranceCosts, rent } = req.body

  console.log(carCost + ' ' + role + ' ' + client + ' ' + additionalDriver + ' ' + insuranceCosts + ' ' + rent)

  if (!errandNumber || !isClearBefore || !userId || !carId || !carCost || !role || !client || !additionalDriver || !insuranceCosts || !rent) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  // var date = new Date(startDate)

  const errand = new Errand({ userId, carId, errandNumber, employeeRented, isClearBefore, carCost, role, client, additionalDriver, insuranceCosts, rent })

  if (role !== 'canceled') {
    const car = await Car.findOneAndUpdate({
      _id: carId
    }, {
      errandId: errand._id,
      isRented: true,
      role: role
    }, {
      new: false
    }).exec()

    if (!car) {
      res.status(400).json({
        message: 'Car does not exist or no permission'
      })
    }
  }
  try {
    await errand.save()
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: error
    })
  }

  const updateContractNumber = await Errand.findByIdAndUpdate({
    _id: errand._id },
  { $inc: { contractNumber: 1 } },
  { new: true }).exec()

  if (!updateContractNumber) {
    res.status(400).json({
      message: 'Errand does not exist or no permission'
    })
  }

  res.status(200).json(errand)
}

module.exports.list = async function listErrands (req, res) {
  const errands = await Errand.find().exec()

  res.status(200).json(errands)
}

module.exports.get = async function getErrand (req, res) {
  const { errandId } = req.params

  if (!errandId) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  const errand = await Errand.findOne({
    _id: errandId
  }).lean().populate('carId').exec()

  if (!errand) {
    return res.status(404).json({
      message: 'Errand does not exist'
    })
  }
  res.status(200).json(errand)
}

module.exports.update = async function endErrand (req, res) {
  // const userId = req.session.user.id
  const { errandId } = req.params
  const { returnCar, employeePickedUp, isClearAfter } = req.body

  if (!errandId || !returnCar || !employeePickedUp || !isClearAfter) {
    return res.status(400).jsson({
      message: 'Incomplete request'
    })
  }

  const errand = await Errand.findOneAndUpdate({
    _id: errandId
  }, {
    returnCar: {
      place: returnCar.place,
      realDate: returnCar.realDate,
      mileage: returnCar.mileage,
      fuel: returnCar.fuel,
      deposit: returnCar.deposit,
      depositSignature: returnCar.depositSignature,
      comments: returnCar.comments,
      scratchs: returnCar.scratchs,
      signature: returnCar.signature
    },
    employeePickedUp: employeePickedUp,
    isClearAfter: isClearAfter,
    isActive: false
  },
  {
    new: false
  }).exec()

  if (!errand) {
    res.status(400).json({
      message: 'Errand does not exist or no permission'
    })
  }

  const car = await Car.findOneAndUpdate({
    _id: errand.carId
  }, {
    isRented: false,
    role: 'avaiable',
    errandId: null,
    scratchs: errand.rent.scratchs.concat(returnCar.scratchs)
  },
  {
    new: false
  }).exec()

  if (!car) {
    res.status(400).json({
      message: 'Car does not exist or no permission'
    })
  }

  res.status(200).json(errand)
}
