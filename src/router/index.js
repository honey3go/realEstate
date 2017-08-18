import Vue from 'vue'
import Router from 'vue-router'
import modeList from '@/components/modeList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'modeList',
      component: modeList
    }
  ]
})
