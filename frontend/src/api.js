// @ts-check

import axios from 'axios'
import app from './main'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || `/api/`,
  withCredentials: true
})

export default {
  /**
   * @param {string} method
   * @param {string} resource
   * @param {object} [data]
   */
  async execute (method, resource, data) {
    if (app) app.$Progress.start()

    const request = axiosInstance({
      method,
      url: resource,
      data,
      validateStatus: () => true
    })

    request.then(() => {
      if (app) app.$Progress.finish()
    })

    return request
  },

  /* AUTHENTICATION */
  /**
   * Creates new session
   * @param {object} data
   * @param {string} data.username
   * @param {string} data.password
   */
  login (data) {
    return this.execute('POST', `/login`, {
      username: data.username,
      password: data.password
    })
  },

  /** Destroys current session */
  logout () {
    return this.execute('POST', `/logout`)
  },

  /**
   * Creates new user account
   * @param {object} data
   * @param {string} data.username
   * @param {string} data.email
   * @param {string} data.password
   */
  register (data) {
    return this.execute('POST', `/register`, {
      username: data.username,
      email: data.email,
      password: data.password
    })
  },

  /** Gets current logged in user */
  getUser () {
    return this.execute('GET', `/user`)
  },

  /**
   * Updates logged in user
   * @param {object} data
   * @param {string} [data.currentPassword]
   * @param {string} [data.password]
   * @param {string} [data.username]
   * @param {string} [data.email]
   */
  updateUser (data) {
    return this.execute('PATCH', `/user`, data)
  },

  /**
   * Sends email with link to reset password
   * @param {string} email
   */
  sendPasswordResetEmail (email) {
    return this.execute('POST', `/user/sendReset`, { email })
  },

  /**
   * Resets user password
   * @param {object} data
   * @param {string} data.token
   * @param {string} data.password
   */
  resetPassword (data) {
    return this.execute('POST', `/user/resetPassword`, data)
  },
  /**
   * Creates new user account
   * @param {object} data
   * @param {string} data.band
   * @param {string} data.model
   * @param {string} data.registrationNumber
   * @param {string} data.klasa
   * @param {string} data.role
   * @param {string} data.vim
   * @param {number} data.mileage
   * @param {number} data.fuel
   * @param {boolean} data.isClean
   * @param {string} data.carCostsId
   */
  insertCar (data) {
    return this.execute('POST', `/car`, {
      band: data.band,
      model: data.model,
      registrationNumber: data.registrationNumber,
      type: data.klasa,
      role: data.role,
      vim: data.vim,
      mileage: data.mileage,
      fuel: data.fuel,
      isClean: data.isClean,
      carCostsId: data.carCostsId
    })
  },
  /**
   * Gets car data
   * @param {string} carID
   */
  getCar (carID) {
    return this.execute('GET', `/car/${carID}`)
  },
  /**
  * Update car data
  * @param {string} carId
  * @param {object} data
  * @param {string} data.endDate
  */
  returnCar (carId, data) {
    return this.execute('PUT', `/car/${carId}`, data)
  },
  /**
  * Update car data
  * @param {string} carId
  * @param {object} data
  * @param {array} data.scratchs
  */
  setScratchs (carId, data) {
    this.execute('PATCH', `/car/${carId}`, data)
  },
  /**
  * Update car data
  * @param {string} carId
  * @param {object} data
  * @param {string} data.carCostsId
  */
  setCarCosts (carId, data) {
    this.execute('PATCH', `/car/${carId}`, data)
  },
  listCars () {
    return this.execute('GET', `/cars`)
  },
  /**
  * Insert carCosts
  * @param {object} data
  * @param {string} data.name
  * @param {number} data.additionalDay
  * @param {number} data.transportCity
  * @param {number} data.transportOutCity
  * @param {number} data.CDW
  * @param {number} data.TW
  * @param {number} data.fuel
  * @param {number} data.transportOutWork
  * @param {number} data.cleaning
  * @param {number} data.noSmoking
  */
  insertCarCosts (data) {
    return this.execute('POST', `/carCosts`, {
      name: data.name,
      additionalDay: data.additionalDay,
      transportCity: data.transportCity,
      transportOutCity: data.transportOutCity,
      CDW: data.CDW,
      TW: data.TW,
      fuel: data.fuel,
      transportOutWork: data.transportOutWork,
      cleaning: data.cleaning,
      noSmoking: data.noSmoking
    })
  },
  listCarCosts () {
    return this.execute('GET', `/carCosts`)
  },
  /**
  * Insert errand
  * @param {string} carID
  * @param {object} data
  * @param {string} data.errandNumber
  * @param {string} data.employeeRented
  * @param {boolean} data.isClearBefore
  * @param {object} data.carCost
  * @param {string} data.role
  * @param {object} data.client
  * @param {object} data.additionalDriver
  * @param {object} data.insuranceCosts
  * @param {object} data.rent
  * @param {object} data.returnCar
  */
  insertErrand (carID, data) {
    return this.execute('POST', `/errand/${carID}`, {
      errandNumber: data.errandNumber,
      employeeRented: data.employeeRented,
      isClearBefore: data.isClearBefore,
      carCost: data.carCost,
      role: data.role,
      client: data.client,
      additionalDriver: data.additionalDriver,
      insuranceCosts: data.insuranceCosts,
      rent: data.rent,
      returnCar: data.returnCar
    })
  },
  /**
   * Gets car data
   * @param {string} errandID
   */
  getErrand (errandID) {
    return this.execute('GET', `/errand/${errandID}`)
  },
  /**
  * Finish errand
  * @param {string} errandId
  * @param {object} data
  * @param {object} data.returnCar
  * @param {string} data.employeePickedUp
  * @param {boolean} data.isClearAfter
  */
  endErrand (errandId, data) {
    return this.execute('PUT', `/errand/${errandId}`, {
      returnCar: data.returnCar,
      employeePickedUp: data.employeePickedUp,
      isClearAfter: data.isClearAfter
    })
  },
  listErrands () {
    return this.execute('GET', `/errands`)
  },
  /**
   * Creates new blog
   * @param {object} data
   * @param {string} data.name
   */
  createBlog (data) {
    return this.execute('POST', `/blog`, data)
  },
  /**
   * Gets blog data
   * @param {string} blogID
   */
  getBlog (blogID) {
    return this.execute('GET', `/blog/${blogID}`)
  },

  /**
   * Updates blog
   * @param {string} blogID
   * @param {object} data
   * @param {string} [data.name]
   */
  updateBlog (blogID, data) {
    return this.execute('PUT', `/blog/${blogID}`, data)
  },
  /**
   * Deletes blog
   * @param {string} blogID
   */
  deleteBlog (blogID) {
    return this.execute('DELETE', `/blog/${blogID}`)
  },
  /**
   * list blogs
   * @param {string} all
   * @param {number} page
   */
  listBlogs (page) {
    return this.execute('GET', `/blog/?page=${page}`)
  },

  addImagePost (blogID, data) {
    return this.execute('POST', `/imagepost/${blogID}`, data)
  },

  // getImagePost (imageID) {
  //   return this.execute('GET', `/imagepost/${imageID}`)
  // },

  updateImagePost (imageID, data) {
    return this.execute('PUT', `/imagepost/${imageID}`, data)
  },

  deleteImagePost (imageID) {
    return this.execute('DELETE', `/imagepost/${imageID}`)
  },

  listImagePostsByBlog (blogID) {
    return this.execute('GET', `/imagepost/${blogID}`)
  }
}
