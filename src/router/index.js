import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/login.page.vue'
import Home from  '../pages/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
