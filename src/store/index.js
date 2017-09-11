import Vue from 'vue'
import Vuex from 'vuex'
import systemParam from '../js/systemParam.js'
import { string2Obj } from '../js/generalMethods.js'

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
      historyConData:{},//已提交的模板数据
      inputData:{}//当前输入的数据
    }
  },
  actions: {
    getHistoryModeData({commit,getters}){
      if ( getters.finalPatten !== "creatmode"){
        Vue.prototype.$http.get(`${systemParam.serviceAddress}${systemParam.getMode}${this.$route.params.id}`)
        .then(response => {
          let responseObj = string2Obj(response.data);

          if (responseObj!==null){
            let { code, msg, data } = responseObj;

            if ( code === "200" && data.length > 0) {
             let { date,modeName,name,more } = data[0];
             commit('initHistoryModeData', { date,modeName,name,more })
            } else {
              alert("没有对应数据！"+code)
            };
          } else {
            alert("网络或服务器错误")
          };
        })
        .catch(response => {
          console.log(response)
        });
      }
    },
    getHistoryConData({commit,getters}){
      if ( getters.finalPatten !== "creatmode"){
        let url = ``;//`${systemParam.serviceAddress}${systemParam.getMode}${this.$route.params.id}`
        Vue.prototype.$http.get(url)
        .then(response => {
          let responseObj = string2Obj(response.data);

          if (responseObj!==null){
            let { code, msg, data } = responseObj;

            if ( code === "200" && data.length > 0) {
             commit('initHistoryConData', data[0])
            } else {
              alert( "没有对应数据！"+ code + msg )
            };
          } else {
            alert( "网络或服务器错误"+ code + msg )
          };
        })
        .catch(response => {
          console.log(response)
        });
      }
    },
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
    },
    initHistoryModeData(state,value){
      state.docData.historyModeData = value;
    },
    /**
     * [initHistoryConData 初始化合同中的合同数据，去空]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-11T15:48:58+0800
     * @param     {object}                 state [state对象]
     * @param     {object}                 value [将要赋值的对象]
     * @return    {[type]}                       [description]
     */
    initHistoryConData(state,value){
      for ( let key in value){
        if ( value[key].trim().length === 0 ){
          value[key] = null;
          delete(value[key]);
        }
      }

      state.docData.historyConData = value;
    },
  },
  getters: {
    finalPatten: ({docData}) => {
      return docData.methods.concat(docData.type);
    }
  }
})
export default store

