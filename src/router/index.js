import Vue from 'vue'
import Router from 'vue-router'
import modeList from '@/components/modeList'
import creatMode from '@/components/creatMode'
import writeMode from '@/components/writeMode'
import query from '@/components/query'
import fourthPage from '@/components/fourthPage'
import home from '@/components/home'
import showMode from '@/components/showMode'

Vue.use(Router)

export default new Router({
  mode:'history',//切换路径模式，变成history模式,不然路径为/#/home
  routes: [
    {
      path:'/',
      name:'home',
      component: home
    },
    {
      path: '/modeMng',
      name: 'modeList',
      component: modeList
    },
    {
      path: '/showMode',
      name: 'showMode',//别名，用于隐藏传输的模板id
      component: showMode,
    },
    {
      path: '/creatMode',
      name: 'creatMode',
      component: creatMode,
      children :[
        { path: '/', component: writeMode},
        { path: 'p1', },
      	{ path: 'p2', },
      	{ path: 'p3', component: writeMode },
      	{ path: 'p4', component: fourthPage },
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
