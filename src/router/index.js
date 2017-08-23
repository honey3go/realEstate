import Vue from 'vue'
import Router from 'vue-router'
import modeList from '@/components/modeList'
import creatMode from '@/components/creatMode'
import writeMode from '@/components/writeMode'
import query from '@/components/query'

Vue.use(Router)

export default new Router({
  mode:'history',//切换路径模式，变成history模式,不然路径为/#/home
  routes: [
    {
      path: '/modeMng',
      name: 'modeList',
      component: modeList
    },
    {
      path: '/creatMode',
      name: 'creatMode',
      component: creatMode,
      children :[
      	{ path: 'p1', },
		{ path: 'p2', },
		{ path: 'p3', component: writeMode },
		{ path: 'p4', },
		{ path: 'p5', },
		{ path: 'p6', },
		{ path: 'p7', },
		{ path: 'p8', },
		{ path: 'p9', },
		{ path: 'p10', },
		{ path: 'p11', },
		{ path: 'p12', },
		{ path: 'p13', },
	  ]		  
    },
    {
      path: '/query',
      name: 'query',
      component: query
    },
  ]
})
