<template>
  <el-table-column type="expand" width="50">
    <table class="housePic" @click="showCon">
      <tr v-show="houseData">
        <th class="floor">说明</th>
        <th class="floor" id="en1" colspan="2">灰色：不可登记</th>
        <th class="floor" id="en2" colspan="2">绿色：可登记</th>
      </tr> 
      <tr v-for="(item,index) in houseData">
        <td class="floor" disabled>{{`${houseData.length - index}楼`}}</td>
        <td v-for="(house,num) in item" :class="{'unbook':house.ygbz==1}" :data-tag="index+'-'+num">{{house.change.doorNum}}</td>
      </tr>
    </table>
  </el-table-column>
</template>

<script>
export default {
  name: 'houseData',
  props:['houseData'],
  data () {
    return {
      //houseData:null
    }
  },
  methods:{
    showCon:function(row, column, cell, event){
      var ev = ev||window.event,
          target = ev.target||ev.srcElement,
          classList = target.classList;

      if ( classList.contains('floor') ){
        return
      }

      let pos = target.dataset.tag.split('-').map(function(value){
        return parseInt(value);
      });

      let [ floor, num ] = pos,
          finalCell = this.houseData[floor][num];//获取到当前点击的单元格对应的数据

      if ( classList.contains('unbook') ){

        this.$confirm(`此操作将为您跳转至${finalCell.change.doorNum}号合同编辑页面, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$router.push( { path:'/creatMode'} )
        }).catch(() => {});
      } else {
        this.$notify({
          title: '警告',
          message: `${finalCell.change.doorNum}不参加此次登记`,
          type: 'warning',
          duration: 2500
        });
      };
    }
  },
  beforeCreate:function(){
    console.log('before')
  },
  mounted:function(){
    console.log(this.$el)
  }
}
</script>

<style scoped>

</style>
