import Vue from 'vue'
import Vuex from 'vuex'
import systemParam from '../js/systemParam.js'
import { string2Obj } from '../js/generalMethods.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  	user: { 
      name: "",
		  password:"000000",
      role:"inc",//inc,gov
		  logTime:new Date().toLocaleString(),
    },
    docData: {
      methods:"creat",//creat,update,readonly
      type: "mode",//mode,contact,examine
      historyModeData:{},//已提交的模板数据
      historyConData:{},//已提交的模板数据
      inputData:{}//当前输入的数据
    }
  },
  actions: {
    /**
     * [getHistoryModeData 获取历史模板内容]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-05T13:47:43+0800
     * @param     {object}                 options.commit  [用于执行mutations中的方法]
     * @param     {object}                 options.getters [用于获取getters中的属性]
     */
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
    /**
     * [getHistoryConData 获取历史合同内容]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-05T13:52:17+0800
     * @param     {object}                 options.commit  [用于执行mutations中的方法]
     * @param     {object}                 options.getters [用于获取getters中的属性]
     */
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
    //登录成功后，将用户名、密码、角色、登录时间存储到user属性中
  	initLogin(state,payload){
      Vue.set(state.user, 'name', payload.name);
      Vue.set(state.user, 'password', payload.password);
      Vue.set(state.user, 'role', payload.role);
  		Vue.set(state.user, 'logTime', new Date().toLocaleString());
  	},
    //用户修改密码后，跳转至登录页面
    reLogin(state){
      Vue.set(state.user, 'name', '');
    },
    //用户修改密码
    changePassword(state,payload){
      Vue.set(state.user,'password',payload.password);
    },
    //修改模板或合同的状态
    changeDocStatus(state,payload){
      state.docData.methods = payload.methods ? payload.methods : state.docData.methods;
      state.docData.type = payload.type ? payload.type : state.docData.type;
    },
    //初始化historyModeData
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
    //合并methods和type为一个字符串
    finalPatten: ({docData}) => {
      return docData.methods.concat(docData.type);
    }
  }
})
export default store

