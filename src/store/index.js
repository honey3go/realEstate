import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  	user: { 
      name: "辽宁龙田置业有限责任公司",
		  password:"000000",
		  logTime:new Date().toLocaleString(),
      newPassword:"",
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
  	},
    changePassword(state,payload){
      state.user.newPassword = payload.password;
    },
    changeDocStatus(state,payload){
      state.docData.methods = payload.methods ? payload.methods : state.docData.methods;
      state.docData.type = payload.type ? payload.type : state.docData.type;
    }
  },
  getters: {
    finalPatten: ({docData}) => {
      return docData.methods.concat(docData.type);
    }
  }
})
export default store