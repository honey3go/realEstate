import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',//切换路径模式，变成history模式,不然路径为/#/home
  routes: [
    {
      path:'/',
      name:'home',
      component: resolve => require(['@/components/home'],resolve)
    },
    {
      path:'',
      component: resolve => require(['@/components/home'],resolve)
    },
    {
      path: '/statList',
      name: 'statList',
      component: resolve => require(['@/components/statList'],resolve)
    },
    {
      path: '/developer',
      name: 'developer',
      component: resolve => require(['@/components/developer'],resolve)
    },
    {
      path: '/households',
      name: 'households',
      component: resolve => require(['@/components/households'],resolve)
    },
    {
      path: '/examine',
      name: 'examine',
      component: resolve => require(['@/components/examine'],resolve)
    },
    {
      path: '/modeMng',
      name: 'modeList',
      component: resolve => require(['@/components/modeList'],resolve)
    },
    {
      path: '/creatContact',
      name: 'creatContact',
      component: resolve => require(['@/components/creatContact'],resolve)
    },
    {
      path: '/showMode',
      name: 'showMode',//别名，用于隐藏传输的模板id
      component: resolve => require(['@/components/showMode'],resolve),
    },
    {
      path: '/contactList',
      name: 'contactList',
      component: resolve => require(['@/components/contactList'],resolve),
    },
    {
      path: '/creatMode',
      name: 'creatMode',
      component: resolve => require(['@/components/creatMode'],resolve),
      children :[
        { path: '/', component: resolve => require(['@/components/writeMode'],resolve)},
        { path: 'p1', },
      	{ path: 'p2', },
      	{ path: 'p3',name:"p3", component: resolve => require(['@/components/writeMode'],resolve) },
      	{ path: 'p4', component: resolve => require(['@/components/fourthPage'],resolve) },
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
      component: resolve => require(['@/components/query'],resolve)
    },
    {
      path: '/userMng',
      name: 'userMng',
      component: resolve => require(['@/components/userMng'],resolve)
    },
  ]
})
