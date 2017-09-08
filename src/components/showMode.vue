<template>
  <div class="showMode">
    <writeMode class="changeHeight" v-if="modeParams.id"></writeMode>
    <fourthPage class="changeHeight" v-if="modeParams.id"></fourthPage>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
      modeParams: this.$route.params,
    }
  },
  methods:{

  },
  computed:{
    ...mapState([
      'docData'
    ]),
  },
  mounted:function(){
    if ( this.docData.methods === "readonly" ){
      let ipts = Array.from( document.getElementsByTagName("input") );

      for ( let ipt of ipts ){
        ipt.readOnly = true;
      }
    }
/*    if ( this.modeParams.readonly === 1){
      for ( let ipt of inputs ){
        ipt.readOnly = true;
      }
    } else {
      for ( let ipt of inputs ){
        if ( ipt.dataset.estl === "1"){
            ipt.readOnly = true;
        } 
      }
    }*/
  },
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