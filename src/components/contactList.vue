<template>
  <div id="contactlist">
    <div class="mode-list">
      <el-table :data="contactList" class="table-list"  height="100%" max-height="100%" border style="width: 100%;height:100%;" @select="handleRowChange" @select-all="handleRowChange">
        <el-table-column type="selection" min-width="55"></el-table-column>
        <el-table-column type="index" min-width="65"></el-table-column>
        <el-table-column prop="hth" label="合同编号" sortable min-width="100"></el-table-column>
        <el-table-column prop="zrzmc" label="不动产坐落地址"></el-table-column>
        <el-table-column prop="bdcfwh" label="自然幢号" min-width="130"></el-table-column>
        <el-table-column prop="bdcdyh" label="不动产单元号" sortable min-width="130"></el-table-column>
        <el-table-column prop="doorNum" label="门牌号" sortable  :sort-method="sortDoorNum" min-width="65"></el-table-column>
        <el-table-column prop="status.des" label="状态" width="100" :filters="filterText" :filter-method="filterTag" filter-placement="bottom-end">
        <template scope="scope">
          <el-tag :type="statusType.get(scope.row.status)" close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="mode-btns">
      <el-button type="primary" icon="information" @click="viewContact">查看/打印</el-button>
      <el-button type="primary" icon="plus" @click="creatContact">新建</el-button>
      <el-button type="primary" icon="edit" @click="modifyContact">修改</el-button>
      <el-button type="primary" icon="delete" >删除</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { cheakSelectLength } from '../js/generalMethods.js'

export default {
  name: 'contanctList',
  data () {
    return {
      selectedRows:[],//用于存放当前表格选择集
      //默认合同状态-类型映射表
      statusType: new Map([['未提交','gray'], ['已提交','primary'], ['审批未通过','danger'],['审批已通过','success']]),
      contactList: [//合同数据
        {
          hth:"2017090100102",
          bdcdyh:"211481006006GB00002F00060131",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"1-1-3",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"审批已通过",
        },
        {
          hth:"2017090100013",
          bdcdyh:"211481006006GB00002F00060133",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"2-1-1",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已提交",
        },
        {
          hth:"2017090100306",
          bdcdyh:"211481006006GB00002F00060051",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"1-11-3",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"未提交",
        },
        {
          hth:"2017090100006",
          bdcdyh:"211481006006GB00002F00060101",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"1-11-4",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"审批未通过",
        },
        {
          hth:"2017090100112",
          bdcdyh:"211481006006GB00002F00060161",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"2-11-2",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"审批已通过",
        },
        {
          hth:"2017090100002",
          bdcdyh:"211481006006GB00002F00060041",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"2-10-3",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"审批已通过",
        },
        {
          hth:"2017090100003",
          bdcdyh:"211481006006GB00002F00060003",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"1-5-1",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已提交",
        },
        {
          hth:"2017090100073",
          bdcdyh:"211481006006GB00002F0006073",
          bdcfwh:"211481006006GB00002F0006",
          doorNum:"2-17-1",
          zrzmc:"兴城市四家屯街道滨核街1-8号",
          status:"已提交",
        },
      ],
    }
  },
  methods:{
    /**
     * 映射 this.changeDocStatus() 为 this.$store.commit('changeDocStatus')
     * @AuthorHTL 王叁
     */
    ...mapMutations([
      'changeDocStatus' 
    ]),
    /**
     * [handleRowChange 表格复选框选择事件，将当前选中的所有行的内容保存到数组selectedRows中]
     * @AuthorHTL 陈新华
     * @DateTime  2017-08-30T11:59:00+0800
     * @param     {object}                 selection [当前选中的所有对象]
     */
    handleRowChange: function(selection) {
      this.selectedRows = selection; 
    },
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
    /**
     * [filterTag 筛选选项]
     * @AuthorHTL
     * @DateTime  2017-09-04T14:23:07+0800
     * @param     {string}                 value [选中的值]
     * @param     {string}                 row   [行的状态]
     * @return    {boolean}                      
     */
    filterTag(value, row) {
      return row.status === value;
    },
    /**
     * [editContact 新建按钮点击事件，点击跳转合同填写页面]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-07T16:42:50+0800
     */
    creatContact:function(){
      this.changeDocStatus({methods:"creat",type:"contact"});
      this.$router.push({path:"/creatContact"});
    },
    /**
     * [viewMode 查看按钮点击事件，跳转到合同查看页面]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-04T16:42:10+0800
     */
    viewContact: function(){
     if ( cheakSelectLength.call(this,this.selectedRows) ){
        this.changeDocStatus({methods:"readonly",type:"contact"});
        this.$router.push({name: 'showMode',params:{ id: 44}});
     }
    },
    /**
     * [modifyMode 修改按钮点击事件，能且只能选择一项进行修改]
     * @AuthorHTL 陈新华
     * @DateTime  2017-08-30T12:01:26+0800
     */
    modifyContact: function(){
      if ( cheakSelectLength.call(this,this.selectedRows) ){
        this.changeDocStatus({methods:"update",type:"contact"});
        this.$router.push({name: 'showMode',params:{ id: 44,readonly:0}});
     }
    },
  },
  computed:{
    /**
     * [filterText 规定筛选字段]
     * @AuthorHTL
     * @DateTime  2017-09-15T14:26:19+0800
     * @return    {array}                 [x筛选字段]
     */
    filterText(){
      let filters = [];

      for ( let key of this.statusType.keys() ){
        filters.push({ text: key, value:key});
      }
      return filters;
    }
  },
}
</script>

<style lang='less'>
#contactlist{
  position: relative;
  padding: 0 10px;
  height: 100%;
  
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
