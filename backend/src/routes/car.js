const { Car } = require('../models')

module.exports.insert = async function addCar (req, res) {
  // const userId = req.session.user.id
  const { band, model, registrationNumber, type, role, vim, mileage, fuel, isClean, carCostsId } = req.body

  if (!band || !model || !registrationNumber || !type || !role || !vim || !mileage || !fuel || isClean === undefined || !carCostsId) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  if (mileage < 0) {
    return res.status(400).json({
      message: 'Mileage of car cannot be less than zero'
    })
  }

  if (fuel < 0 || fuel > 100) {
    return res.status(400).json({
      message: 'Mileage of car must be in range 0-100 percent'
    })
  }

  const car = new Car({ band, model, registrationNumber, type, role, vim, mileage, fuel, isClean, carCostsId })

  try {
    await car.save()
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: error
    })
  }

  res.status(200).json(car)
}

module.exports.list = async function listCars (req, res) {
  const cars = await Car.find().lean().populate('errandId').exec()
  // console.log(cars[1].errandId.startDate)
  // const tableItems = await Car.find({ eventId }, { eventId: 0 }).lean().populate('guests').exec()
  res.status(200).json(cars)
}

// module.exports.update = async function returnCar (req, res) {
module.exports.returnCar = async (req, res) => {
  // const userId = req.session.user.id
  const { carId } = req.params
  const { endDate } = req.body

  console.log(endDate)

  if (!carId || !endDate) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  const car = await Car.findOneAndUpdate({
    _id: carId
  }, {
    isRented: false,
    role: 'avaiable',
    errandId: null
  },
  {
    new: false
  }).lean().populate('errandId').exec()

  if (!car) {
    res.status(400).json({
      message: 'Blog does not exist or no permission'
    })
  }

  res.status(200).json(car)
}

module.exports.get = async function getCar (req, res) {
  const { carId } = req.params

  if (!carId) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  const car = await Car.findOne({
    _id: carId
  }).lean().populate('carCostsId').exec()

  if (!car) {
    return res.status(404).json({
      message: 'Car does not exist'
    })
  }
  res.status(200).json(car)
}

module.exports.setScratchs = async (req, res) => {
// module.exports.update = async function setScratchs (req, res) {
  // const userId = req.session.user.id
  const { carId } = req.params
  const { scratchs } = req.body

  console.log(carId + ' ' + scratchs)

  if (!scratchs) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  const car = await Car.findOneAndUpdate({
    _id: carId
  }, {
    scratchs: scratchs
  }, {
    new: false
  }).exec()

  if (!car) {
    res.status(400).json({
      message: 'Car does not exist or no permission'
    })
  }
  res.status(200).json(car)
}

module.exports.setCarCosts = async (req, res) => {
  const { carId } = req.params
  const { carCostsId } = req.body

  if (!carCostsId) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  const car = await Car.findOneAndUpdate({
    _id: carId
  }, {
    carCostsId: carCostsId
  }, {
    new: false
  }).exec()

  if (!car) {
    res.status(400).json({
      message: 'Car does not exist or no permission'
    })
  }
  res.status(200).json(car)
}
