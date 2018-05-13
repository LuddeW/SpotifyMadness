import Vue from 'vue'
import Router from 'vue-router'
import Start from './routes/Start.vue'
import About from './routes/About.vue'
import Battle from './routes/Battle.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/battle/:artistId',
      name: 'battle',
      component: Battle
    }
  ]
})
