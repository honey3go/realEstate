<template>
  <div class="examine">
    <div class="search-wrap">
      <el-select v-model="searchContent" class="sel-inc"  filterable placeholder="请选择一个开发商">
        <el-option v-for="item in incs" :key="item.value" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="searchContact"></el-button>
    </div>
    <div class="table-warp" v-if="showList">
      <el-table :data="contactList" class="table-list"  height="100%" max-height="100%" border style="width: 100%;height:100%;" empty-text="当前无待审批合同">
        <el-table-column type="index" min-width="65"></el-table-column>
        <el-table-column prop="hth" label="合同编号" sortable min-width="100"></el-table-column>
        <el-table-column prop="inc" label="开发商" sortable min-width="100"></el-table-column>
        <el-table-column prop="zrzmc" label="不动产坐落地址"></el-table-column>
        <el-table-column prop="bdcfwh" label="自然幢号" min-width="130"></el-table-column>
        <el-table-column prop="bdcdyh" label="不动产单元号" sortable min-width="130"></el-table-column>
        <el-table-column prop="doorNum" label="门牌号" sortable  :sort-method="sortDoorNum" min-width="65"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template scope="scope">
            <el-button @click="startExamine(scope.$index,scope.row.id)" type="text" size="small">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'examine',
  data () {
    return {
      searchContent: '',//双向绑定select元素
      showList: false,//是否显示合同列表
      incs: [//默认房地产商
          {value: '选项1',label: '辽宁龙田置业有限责任公司'}, 
          {value: '选项2',label: '万科房地产有限公司'}, 
          {value: '选项3',label: '中海地产集团有限公司'}, 
      ],
      contactList: [//合同列表
        {
          hth:"2017090100013",
          bdcdyh:"211481006006GB00002F00060133",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"2-1-1",
          inc:"辽宁龙田置业有限责任公司",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已提交",
          id:"44"
        },
        {
          hth:"2017090100003",
          bdcdyh:"211481006006GB00002F00060003",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"1-5-1",
          inc:"辽宁龙田置业有限责任公司",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已提交",
          id:"45"
        },
        {
          hth:"2017090100073",
          bdcdyh:"211481006006GB00002F0006073",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"2-17-1",
          inc:"辽宁龙田置业有限责任公司",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已提交",
          id:"50"
        },
      ],
    }
  },
  methods:{
    //Vuex, 映射 this.changeDocStatus() 为 this.$store.commit('changeDocStatus')
    ...mapMutations([
      'changeDocStatus' 
    ]),
    /**
     * [searchContact 在默认房地产商中搜索改地产商是否有合同数据]
     * @AuthorHTL 王叁
     * @DateTime  2017-08-25T14:44:06+0800
     */
    searchContact(){
      let hasInc =  this.contactList.findIndex( val => val.inc === this.searchContent );

      if ( hasInc > -1 ){
        this.showList = true;
      } else {
        this.showList = false;
      }
    },
    /**
     * [sortDoorNum 合同列表中单元号的排序规则]
     * @AuthorHTL 王叁
     * @DateTime  2017-08-25T14:46:29+0800
     * @param     {object}                 a [单元号列中某一的单元格内容]
     * @param     {object}                 b [单元号列中某一的单元格内容]
     * @return    {boolean}                  [是否排在前面]
     */
    sortDoorNum:function(a,b){
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
    filterTag( value, row ) {
      return row.status === value;
    },
    /**
     * [startExamine 审批按钮点击事件]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-11T14:49:55+0800
     * @param     {number}                 index [行号]
     * @param     {number}                 id    [合同编号]
     */
    startExamine(index,id){
      this.changeDocStatus({methods:"readonly",type:"examine"});
      this.contactList.splice(index, 1);
      this.$router.push({name: 'showMode',params:{ id }});
    }
  },
}
</script>

<style lang='less'>
.examine{
  position: relative;
  padding: 0 10px;

  .search-wrap{
    padding: 10px 0;
  }
  .table-warp{
    position: absolute;
    width: 100%;
    top: 56px;
    bottom: 10px;
  }
}
.sel-inc{
  width: 200px;
}
</style>