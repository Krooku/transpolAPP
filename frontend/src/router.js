import Vue from 'vue'
import Router from 'vue-router'
import store from './store/'
import api from './api'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'homepage',
      meta: { loginNotRequired: false },
      component: () => import(/* webpackChunkName: "home" */ './views/Homepage.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { loginNotRequired: true, blockIfLoggedIn: true },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { loginNotRequired: false, blockIfLoggedIn: false },
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/insertcar',
      name: 'insertcar',
      meta: { loginNotRequired: false },
      component: () => import(/* webpackChunkName: "insertcar" */ './views/InsertCar.vue')
    },
    {
      path: '/rentalcontract/:errandId',
      name: 'rentalcontract',
      meta: { loginNotRequired: false },
      component: () => import(/* webpackChunkName: "rentalcontract" */ './views/RentalContract.vue')
    },
    {
      path: '/rent/:carId',
      name: 'rent',
      component: () => import(/* webpackChunkName: "rent" */ './views/Rent.vue')
    },
    {
      path: '/return/:errandId',
      name: 'return',
      component: () => import(/* webpackChunkName: "return" */ './views/Return.vue')
    },
    {
      path: '/errands',
      name: 'errands',
      component: () => import(/* webpackChunkName: "errands" */ './views/Errands.vue')
    },
    {
      path: '/details/:carId',
      name: 'details',
      component: () => import(/* webpackChunkName: "details" */ './views/Details.vue')
    },
    {
      path: '/blogs/create',
      name: 'createBlog',
      component: () => import(/* webpackChunkName: "blogs" */ './views/CreateBlog.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.userLoaded) {
    const response = await api.getUser()
    store.dispatch('login', response.data)
  }

  if (!store.getters.loggedIn) {
    if (to.matched.some(record => record.meta.loginNotRequired)) {
      return next()
    }

    return next('/login')
  } else if (to.matched.some(record => record.meta.blockIfLoggedIn)) {
    return next('/')
  }

  next()
})

export default router
