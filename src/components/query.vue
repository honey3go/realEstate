<template>
  <div id="modelist">
    <div class="mode-list" v-if = "userBd">
      <el-table :data="userBd" height="100%" max-height="100%" border style="width: 100%;height:100%;" @row-click="showPic">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="address" label="楼盘地址" width="380"></el-table-column>
        <el-table-column prop="NUM" label="不动产单元号" width="380"></el-table-column>
        <el-table-column prop="tnum" label="未登记户数" ></el-table-column>
      </el-table>
    </div>
    <div v-else>
      查询中，请稍等
    </div>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'
import systemParam from '../js/systemParam.js'

export default {
  name: 'query',
  props:['userBd'],
  data () {
    return {
      isCollapse: false,
      house: null,
    }
  },
  methods:{
    showPic: function(row){
      console.log(row.NUM)
      this.$http.get(`${systemParam.serviceAddress}/${systemParam.getHouse}${row.NUM}`)
      .then(response => {
        let responseObj = string2Obj(response.data);

        console.log("house")
      })
      .catch(response => {
        console.log(response)
      });
    }
  },
  created:function(){
    console.log(this.userBd,"userBd")
  },
  watch:{
    userBd:function(newVal){
      console.log('23')
    }
  }
}
</script>

<style lang='less'>
#modelist{
  position: relative;
  padding: 0 10px;

  .mode-list{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 46px; 
    padding: 10px;  

    th{
      text-align: center;
    }
  }
  .mode-btns{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
  }
}
</style>
