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
    showCon: function( ev = window.event ){
      let target = ev.target||ev.srcElement,//获取目标元素
          classList = target.classList,//获取目标元素的CSS类列表
          room = target.innerHTML;//获取目标元素的户号

      if ( classList.contains("floor") ) {//目标元素是楼层或说明，则无操作
        return
      } 

      if ( classList.contains("unbook") ){//目标元素是可登记的房屋，则跳转至合同编辑页面
        this.$confirm(`此操作将为您跳转至${room}号合同编辑页面, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$router.push( { path:'/creatContact'} )
        }).catch(() => {});
      } else {//目标元素是不可登记的房屋，则弹出提示，不跳转
        this.$notify({
          title: '警告',
          message: `${room}号不参加此次登记`,
          type: 'warning',
          duration: 2500
        });
      }
    }
  },
}
</script>
