import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(ElementUI);
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
