// @ts-check
const express = require('express')

const auth = require('./users')
const car = require('./car')
const carCosts = require('./carCosts')
const errand = require('./errand')

// stare

const blog = require('./blog')
const imagePost = require('./imagepost')

//

const verifyLogin = require('../middleware/verifyLogin')

const router = express.Router()

router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.post('/register', auth.register)

router.get('/user', verifyLogin, auth.getUser)
router.patch('/user', verifyLogin, auth.updateUser)
router.get('/user/verify/:token', auth.verifyEmail)
router.post('/user/sendReset', auth.sendReset)
router.post('/user/resetPassword', auth.resetPassword)

router.post('/car', verifyLogin, car.insert)
router.get('/car/:carId', verifyLogin, car.get)
router.put('/car/:carId', verifyLogin, car.returnCar)
router.patch('/car/:carId', verifyLogin, car.setScratchs)
router.patch('/car/:carId', verifyLogin, car.setCarCosts)
router.get('/cars', verifyLogin, car.list)

router.post('/carCosts', verifyLogin, carCosts.insert)
router.get('/carCosts', verifyLogin, carCosts.list)

router.post('/errand/:carId', verifyLogin, errand.insert)
router.get('/errand/:errandId', verifyLogin, errand.get)
router.put('/errand/:errandId', verifyLogin, errand.update)
router.get('/errands', verifyLogin, errand.list)

// STARE

router.post('/blog/', verifyLogin, blog.insert)
router.get('/blog/:blogId', verifyLogin, blog.get)
router.put('/blog/:blogId', verifyLogin, blog.update)
router.delete('/blog/:blogId', verifyLogin, blog.delete)
router.get('/blog/', verifyLogin, blog.list)

router.post('/imagepost/:blogId', verifyLogin, imagePost.insert)
// router.get('/imagepost/:imagepostId', verifyLogin, imagePost.get)
router.put('/imagepost/:imagepostId', verifyLogin, imagePost.update)
router.delete('/imagepost/:imagepostId', verifyLogin, imagePost.delete)
router.get('/imagepost/:blogId', verifyLogin, imagePost.list)

module.exports = router
