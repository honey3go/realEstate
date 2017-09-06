import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
	user:{ name: "",
		   password:"",
		   logTime:""}
  },
  actions: {

  },
  mutations: {
  	initLogin(state,payload){
  		state.user.name = payload.name;
  		state.user.password = payload.password;
  		state.user.logTime = new Date().toLocaleString();
  	}
  },
  getters: {

  }
})
export default store