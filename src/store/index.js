import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  	user: { 
      name: "",
		  password:"",
		  logTime:""
    },
    docData: {
      methods:"creat",//creat,update,readonly
      type: "mode",//mode,contact
      historyModeData:{},//已提交的模板数据
      inputData:{}//当前输入的数据
    }
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