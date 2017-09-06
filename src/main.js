import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.config.productionTip = false

Vue.http.options.xhr = { withCredentials: true }


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')