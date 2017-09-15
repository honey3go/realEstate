<template>
  <div class="showMode">
    <writeMode class="changeHeight" v-if="modeParams.id"></writeMode>
    <fourthPage class="changeHeight" v-if="modeParams.id"></fourthPage>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import writeMode from './writeMode'
import fourthPage from './fourthPage'

export default {
  name: 'showMode',
  components: {
    writeMode, fourthPage
  },
  data () {
    return {
      modeParams: this.$route.params,
    }
  },
  computed:{
    ...mapState([
      'docData'
    ]),
  },
  /**
   * [mounted 元素挂在后，如果是只读模式则所有Input只读]
   * @AuthorHTL
   * @DateTime  2017-09-15T15:16:09+0800
   */
  mounted:function(){
    if ( this.docData.methods === "readonly" ){
      let ipts = Array.from( document.querySelectorAll("[data-estl]") );

      for ( let ipt of ipts ){
        ipt.readOnly = true;
      }
    }
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