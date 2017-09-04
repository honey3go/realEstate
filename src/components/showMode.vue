<template>
  <div class="showMode">
    <writeMode class="changeHeight"></writeMode>
    <fourthPage class="changeHeight"></fourthPage>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'
import systemParam from '../js/systemParam.js'
import writeMode from './writeMode'
import fourthPage from './fourthPage'

export default {
  name: 'modeList',
  props:['readonly'],
  components: {
    writeMode, fourthPage
  },
  data () {
    return {
      //readonly: false,
      modeParams: this.$route.params,
      modeContent: null,
    }
  },
  methods:{

  },
  created:function(){
    this.$http.get(`${systemParam.serviceAddress}${systemParam.getMode}${this.modeParams.id}`)
    .then(response => {
      let responseObj = string2Obj(response.data);
      console.log("mode")

      if (responseObj!==null){
        let { code, msg, data } = responseObj;

        if ( code === "200" && data.length > 0) {
         this.modeContent = data;
         console.log(data)
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
  },
  mounted:function(){
    let inputs = Array.from( document.getElementsByTagName("input") );

    if ( this.modeParams.readonly === 1){
      for ( let ipt of inputs ){
        ipt.readOnly = true;
      }
    } else {
      for ( let ipt of inputs ){
        if ( ipt.dataset.estl === "1"){
            ipt.readOnly = true;
        } 
      }
    }

  },
  computed:{
/*    readonly: function(){
      return this.modeId.id === "undefined"?
    }*/
  }
}
</script>

<style lang='less'>
.showMode{
  width: 100%;
  height: 100%;
  overflow: auto;

  div.changeHeight{
    height: auto;
  }
}
</style>
