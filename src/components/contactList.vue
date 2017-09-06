<template>
  <div class="contactList">
    <el-table :data="contactList" class="table-list"  height="100%" max-height="100%" border style="width: 100%;height:100%;">
      <el-table-column type="expand" width="50">
        <template scope="scope">
          <el-steps space="25%" :active="scope.row.statusCode[0]+1" finish-status="success">
            <el-step title="已提交"></el-step>
            <el-step title="审批中"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </template>
      </el-table-column>
      <el-table-column type="index" min-width="65"></el-table-column>
      <el-table-column prop="hth" label="合同编号" sortable min-width="100"></el-table-column>
      <el-table-column prop="zrzmc" label="不动产坐落地址"></el-table-column>
      <el-table-column prop="bdcfwh" label="自然幢号" min-width="130"></el-table-column>
      <el-table-column prop="bdcdyh" label="不动产单元号" sortable min-width="130"></el-table-column>
      <el-table-column prop="doorNum" label="门牌号" sortable  :sort-method="sortDoorNum" min-width="65"></el-table-column>
      <el-table-column prop="status.des" label="状态" width="100" :filters="[{ text: '已完成', value: '已完成' }, { text: '审批中', value: '审批中' }]" :filter-method="filterTag" filter-placement="bottom-end">
      <template scope="scope">
        <el-tag :type="scope.row.status === '审批中' ? 'warning' : 'success'" close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'

export default {
  name: 'contanctList',
  data () {
    return {
      contactList: [
        {
          hth:"2017090100102",
          bdcdyh:"211481006006GB00002F00060131",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"1-1-3",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已完成",
          statusCode:[2,1]
        },
        {
          hth:"2017090100013",
          bdcdyh:"211481006006GB00002F00060133",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"2-1-1",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"审批中",
          statusCode:[1,1]
        },
        {
          hth:"2017090100306",
          bdcdyh:"211481006006GB00002F00060051",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"1-11-3",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已完成",
          statusCode:[2,1]
        },
      ],
    }
  },
  methods:{
    sortDoorNum:function(a,b){
      
      console.log(a)
      let num_a = a.doorNum.split("-"),
          num_b = b.doorNum.split("-");

      if ( num_a[0] > num_b[0] ){
        return false;
      } else if ( num_a[0] < num_b[0] ){
        return true;
      } else {
        if ( num_a[1] > num_b[1]){
          return false;
        } else if ( num_a[1] < num_b[1] ){
          return true;
        } else {
          if ( num_a[2] > num_b[2]){
            return false;
          } else if ( num_a[2] < num_b[2] ){
            return true;
          } else {
            return true
          }
        }
      }
    },
    filterTag(value, row) {
      return row.status === value;
    }
  },
}
</script>

<style lang='less'>
.contactList{
  height: 100%;
  padding: 0 10px;

  .table-list{
    padding: 10px 0;

    th{
      text-align: center;
    }

  }
}
</style>
