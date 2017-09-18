import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',//切换路径模式，变成history模式,不然路径为/#/home
  routes: [
    {
      path:'/',
      name:'home',
      component: () => import('@/components/home')
    },
    {
      path:'',
      component: () => import('@/components/home')
    },
    {
      path: '/statList',
      name: 'statList',
      component: () => import('@/components/statList')
    },
    {
      path: '/developer',
      name: 'developer',
      component: () => import('@/components/developer')
    },
    {
      path: '/households',
      name: 'households',
      component: () => import('@/components/households')
    },
    {
      path: '/examine',
      name: 'examine',
      component: () => import('@/components/examine')
    },
    {
      path: '/modeMng',
      name: 'modeList',
      component: () => import('@/components/modeList')
    },
    {
      path: '/creatContact',
      name: 'creatContact',
      component: () => import('@/components/creatContact')
    },
    {
      path: '/showMode',
      name: 'showMode',//别名，用于隐藏传输的模板id
      component: () => import('@/components/showMode')
    },
    {
      path: '/contactList',
      name: 'contactList',
      component: () => import('@/components/contactList')
    },
    {
      path: '/creatMode',
      name: 'creatMode',
      component: () => import('@/components/creatMode'),
      children :[
        { path: '/', component: () => import('@/components/writeMode')},
        { path: 'p1', },
      	{ path: 'p2', },
      	{ path: 'p3',name:"p3", component: () => import('@/components/writeMode') },
      	{ path: 'p4', component: () => import('@/components/fourthPage') },
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
      component: () => import('@/components/query')
    },
    {
      path: '/userMng',
      name: 'userMng',
      component: () => import('@/components/userMng')
    },
  ]
})
