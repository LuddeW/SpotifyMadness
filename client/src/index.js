import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

const app = new Vue({
  el: '#vue-app',
  router,
  store,
  render: h => h(App)
})

if (process.env.NODE_ENV === 'development') {
  window.app = app
}
