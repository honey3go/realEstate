<template>
  <div id="modelist">
    <div class="mode-list" v-if = "result">
      <el-table :data="result" height="100%" max-height="100%" border style="width: 100%;height:100%;">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="inc" label="公司名称" width="380"></el-table-column>
        <el-table-column prop="address" label="楼盘地址" width="380"></el-table-column>
        <el-table-column prop="tnum" label="楼栋数量" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'

export default {
  name: 'query',
  data () {
    return {
      isCollapse: false,
      result: null,
    }
  },
  created:function(){
    this.$http.get('http://localhost:8080/Appapi.asmx/getVillage?developers=辽宁龙田置业有限责任公司')
      .then(response => {
        let responseObj = string2Obj(response.data);

        if (responseObj!==null){
          let { code, msg, data} = responseObj;

          if ( code === "200" && data.length > 0) {

            for (let item of data){
              item.inc = "辽宁龙田置业有限责任公司";
            }
            this.result = data;
          } else {
            alert("没有对应数据！")
          };
        } else {
          alert("没有对应数据！")
        };
      })
      .catch(response => {
        console.log(response)
    });
  },
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
