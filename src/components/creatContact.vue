<template>
  <div class="creatContact">
  <modeList :isCreat="1"></modeList>
  </div>
</template>

<script>
import modeList from './modeList'

export default {
  name: 'creatContact',
  components:{
    modeList
  },
  data () {
    return {
      
    }
  },
  methods:{

  },
  created:function(){
    this.$alert('请先选择一个模板', '提示', {
      confirmButtonText: '确定',
      callback: action => {}
    });
  }
}
</script>

<style lang='less'>
.creatContact{
  width: 100%;
  height: 100%;
}
</style>