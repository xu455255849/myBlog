import Vue from 'vue'
import Router from 'vue-router'

import Start from '../pages/start.vue'
import Home from  '../pages/home.vue'
import Publish from '../pages/publish.vue'
import Article from  '../pages/article.vue'
import messageBoard from '../pages/message-board.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      meta: {
        requireAuth: false,
      },
      component: Start
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true,
      },
      component: Home
    },
    {
      path: '/publish',
      name: 'publish',
      meta: {
        requireAuth: true,
      },
      component: Publish
    },
    {
      path: '/home/:id',
      name: 'article',
      meta: {
        requireAuth: true,
      },
      component: Article
    },
    {
      path: '/board',
      name: 'messageBoard',
      meta: {
        requireAuth: true,
      },
      component: messageBoard
    },



  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('username') !== null) {
      next();
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next();
  }
});

export default router
