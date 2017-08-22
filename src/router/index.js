import Vue from 'vue'
import Router from 'vue-router'
import modeList from '@/components/modeList'
import creatMode from '@/components/creatMode'
import writeMode from '@/components/writeMode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'modeList',
      component: modeList
    },
    {
      path: '/creatMode',
      name: 'creatMode',
      component: creatMode,
      children :[
		{ path: 'p3', component: writeMode },
	  ]		  
    }
  ]
})
