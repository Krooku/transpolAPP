const { CarCosts } = require('../models')

module.exports.insert = async function addCarCosts (req, res) {
  // const userId = req.session.user.id
  const { name, additionalDay, transportCity, transportOutCity, CDW, TW, fuel, transportOutWork, cleaning, noSmoking } = req.body

  if (!name || !additionalDay || !transportCity || !transportOutCity || !CDW || !TW || !fuel || !transportOutWork || !cleaning || !noSmoking) {
    return res.status(400).json({
      message: 'Incomplete request'
    })
  }

  const carCosts = new CarCosts({ name, additionalDay, transportCity, transportOutCity, CDW, TW, fuel, transportOutWork, cleaning, noSmoking })

  try {
    await carCosts.save()
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: error
    })
  }

  res.status(200).json(carCosts)
}

module.exports.list = async function listCarCosts (req, res) {
  const costs = await CarCosts.find().lean().exec()
  res.status(200).json(costs)
}
