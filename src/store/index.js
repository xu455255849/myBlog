import Vue from 'vue'
import Vuex from 'vuex'
import modulesApp from './modules/app'
Vue.use(Vuex)

let store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app: modulesApp
  }
})

export default store
