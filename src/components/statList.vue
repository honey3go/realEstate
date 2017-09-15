<template>
  <div id="statList">
    <div class="statBtns">
      <label>开发商名称：</label>
      <el-select v-model="value" placeholder="请选择" class="statSele">
        <el-option
          v-for="item in optionsData"
          :key="item.value"
          :label="item.developers_name"
          :value="item.developers_name">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="searchCur">搜索</el-button>
      <el-button type="primary" icon="view" @click="viewAll">查看全部</el-button>
    </div>
    <div class="statTable" v-show="isShow">
      <el-table :data="statData" height="100%" max-height="100%" border style="width: 100%;height:100%;" empty-text="查询中，请稍等" @row-click="haddleRowClick">
        <el-table-column type="index" label="编号" width="65"></el-table-column>
        <el-table-column prop="developers_name" label="开发商名称" min-width="200"></el-table-column>
        <el-table-column prop="buildingNum" label="预售楼盘数量" sortable min-width="150"></el-table-column>
        <el-table-column prop="registered" label="已备案" sortable min-width="100">
        </el-table-column>
        <el-table-column prop="unregistered" label="待备案" sortable min-width="100">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="nocontract" label="未通过" sortable min-width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>

export default {
  name: 'statList',
  data () {
    return {
        optionsData: [{
            developers_name: '中海',
            buildingNum: 180,
            registered: 105,
            unregistered: 60,
            nocontract: 15,
            remark: '备注'
          }, {
            developers_name: '龙湖',
            buildingNum: '182',
            registered: '122',
            unregistered: '60',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '世茂',
            buildingNum: '184',
            registered: '122',
            unregistered: '62',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '万科',
            buildingNum: '186',
            registered: '122',
            unregistered: '64',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁传媒',
            buildingNum: '188',
            registered: '122',
            unregistered: '66',
            nocontract:25,
            remark: '备注'
          },{
            developers_name: '辽宁龙田置业2',
            buildingNum: '180',
            registered: '120',
            unregistered: '60',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁万朋2',
            buildingNum: '182',
            registered: '122',
            unregistered: '60',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁影视2',
            buildingNum: '184',
            registered: '122',
            unregistered: '62',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁图文2',
            buildingNum: '186',
            registered: '122',
            unregistered: '64',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁传媒2',
            buildingNum: '188',
            registered: '122',
            unregistered: '66',
            nocontract:25,
            remark: '备注'
          },{
            developers_name: '辽宁龙田置业3',
            buildingNum: '180',
            registered: '120',
            unregistered: '60',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁万朋3',
            buildingNum: '182',
            registered: '122',
            unregistered: '60',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁影视3',
            buildingNum: '184',
            registered: '122',
            unregistered: '62',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁图文3',
            buildingNum: '186',
            registered: '122',
            unregistered: '64',
            nocontract:25,
            remark: '备注'
          }, {
            developers_name: '辽宁传媒3',
            buildingNum: '188',
            registered: '122',
            unregistered: '66',
            nocontract:25,
            remark: '备注'
          }],
      value: '' ,//为el-option中当前被选中的值
      statData: [],//table绑定的数组对象
      isShow: false
      
          
    }
  },
  watch:{
    statData: function (val, oldVal) {
      if ( val.length !== 0 ){
        this.isShow = true;
      }
    }
  },    
  methods:{
    /**
     * [searchCur 搜索按钮点击事件]
     * @AuthorHTL 陈新华
     */
    searchCur: function(){
      if ( this.value === '' ){
        this.$alert('请选择/输入搜索内容！', '警告', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        });
      } else {
        let that = this;     
        this.statData = this.optionsData.filter( function ( item ){
          return (item.developers_name == that.value);
        });
      }  
    },
    /**
     * [deleteMode 查看所有按钮点击事件]
     * @AuthorHTL 陈新华
     */    
    viewAll: function(){
      this.value = '';
      this.statData = this.optionsData;
    },
    /**
     * [haddleRowClick 为row-click绑定的事件，某一行被点击时触发]
     * @AuthorHTL 陈新华
     */    
    haddleRowClick: function( row, event, column ){
      // sessionStorage是HTML5提出的针对session 数据存储的对象（生命周期是当前窗口：前进后退刷新，数据都存在；关闭窗口，清空）
      //sessionStorage.ExamineQueryInc= JSON.stringify(row.developers_name);
      sessionStorage.setItem("devName",JSON.stringify(row.developers_name));
      this.$router.push({name: "developer",params:{name:row.developers_name,update:1,readonly:0}});
    }
  }
}
</script>

<style lang='less'>
#statList{
  position: relative;
  .statBtns{
    border-top: 45px solid transparent;
    label{
      font-size: 14px;
      color: #1f2d3d;
      margin-left: 20px;
    }
  }
  .statTable{
    position: absolute;
    top: 120px;
    right: 0;
    left: 0;
    bottom: 46px; 
    padding: 10px; 
    th{
      text-align: center;
    } 
  }
}
</style>
