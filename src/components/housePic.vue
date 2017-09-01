<template>
  <el-table-column type="expand" width="50">
    <template scope="scope" id="22">
      <table id="showTab" class="housePic" @click="showCon" :data-num="scope.row.NUM">
        <tr v-show="houseData[scope.row.NUM]">
          <th class="floor">说明</th>
          <th class="floor" id="en1" colspan="2">灰色：不可登记</th>
          <th class="floor" id="en2" colspan="2">绿色：可登记</th>
        </tr> 
        <tr v-for="(item,index) in houseData[scope.row.NUM]">
          <td class="floor" disabled>{{`${houseData[scope.row.NUM].length - index}楼`}}</td>
          <td v-for="(house,num) in item" :class="{'unbook':house.ygbz==1}" :data-tag="index+'-'+num">{{house.change.doorNum}}</td>
        </tr>
      </table>
    </template>
  </el-table-column>
</template>

<script>

export default {
  name: 'housePic',
  props:['houseData'],
  methods:{
    /**
     * [showCon 楼盘表点击事件代理]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-01T16:43:56+0800
     */
    showCon: function(){
      var ev = ev||window.event,
          target = ev.target||ev.srcElement,//获取目标元素
          rowPos = document.getElementById('showTab').dataset.num;
          console.log(target.innerText)
/*      console.log(this.houseData[rowPos])*/
/*      debugger
      let floor = target.innerText.split('-').map(function(value){
        return parseInt(value);
      })[0];
      let h = this.houseData[rowPos][floor].find((val) => { val.change.doorNum === "target.innerText"});
      console.log(h)*/
      //只有存在自定义属性data-tag的元素才响应点击
/*      if ( !target.dataset.tag ){
        return
      }
      //获取目标元素在houseData数据中的位置
      let pos = target.dataset.tag.split('-').map(function(value){
        return parseInt(value);
      });

      let [ floor, num ] = pos,
          rowPos = document.getElementById('showTab').dataset.num,
          finalCell = this.houseData[rowPos][floor][num];//获取当前点击的单元格对应的数据
      //yzbz===1的目标跳转至合同编辑页面
      if ( finalCell.ygbz === 1 ){
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
      };*/
    }
  },
}
</script>
