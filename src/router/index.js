import Vue from 'vue'
import Router from 'vue-router'

import Start from '../pages/start.vue'
import Home from  '../pages/home.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }

  ]
})
