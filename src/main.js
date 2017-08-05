// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.prototype.$ajax = axios
Vue.use(iView)


/**
 * url地址修改 home &&
 * @type {string}
 */

axios.defaults.baseURL = 'http://106.14.205.222:80';
//axios.defaults.baseURL = 'http://120.55.67.152:8000';
//axios.defaults.headers =  {'Authorization':'Bearer '+ sessionStorage.getItem('token')}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
