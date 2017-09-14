import Vue from 'vue'
import Router from 'vue-router'

import Start from '../pages/start.vue'
import Home from  '../pages/home.vue'
import List from '../pages/list.vue'
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
      component: Home,
      children: [
        {
          path: 'list',
          name: 'list',
          meta: {
            requireAuth: true,
          },
          component: List
        },
        {
          path: 'board',
          name: 'board',
          meta: {
            requireAuth: true,
          },
          component: messageBoard
        },
        {
          path: ':id',
          name: 'article',
          meta: {
            requireAuth: true,
          },
          component: Article
        },
      ]
    },
    {
      path: '/publish',
      name: 'publish',
      meta: {
        requireAuth: true,
      },
      component: Publish
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('username') !== null) {
      next();
    } else {
      alert('勇者，show me your name')
      next({
        path: '/'
      })
    }
  } else {
    next();
  }
});

export default router
