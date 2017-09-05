<template>
  <div class="creatContact">
  </div>
</template>

<script>
import modeList from './modeList'

export default {
  name: 'modeList',
  props:['userBd'],
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
      callback: action => {
        this.$router.push({name:'modeList', params:{ isCrtCon:1 }});
      }
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
