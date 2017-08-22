<template>
  <div id="modelist">
    <div class="mode-list">
      <el-table :data="tableData3" height="100%" max-height="100%" border style="width: 100%;height:100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="modeName" label="模板名称" width="100"></el-table-column>
        <el-table-column prop="name" label="模板定制人" width="80"></el-table-column>
        <el-table-column prop="date" label="模板定制时间" width="130"></el-table-column>
        <el-table-column prop="page" label="模板页数" width="100"></el-table-column>
        <el-table-column prop="more" label="模板备注" ></el-table-column>
        <el-table-column prop="lastEditName" label="模板最后修改人" width="80"></el-table-column>
        <el-table-column prop="lastEditDate" label="模板最后修改时间" width="130"></el-table-column>
      </el-table>
    </div>
    <div class="mode-btns">
      <el-button type="primary">查看/打印</el-button>
      <el-button type="primary" icon="plus" @click="creatNewMode">新建</el-button>
      <el-button type="primary" icon="edit">修改</el-button>
      <el-button type="primary" icon="delete">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modeList',
  data () {
    return {
      result:null,
      isCollapse: false,
      tableData3: [{
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-03',
          name: '王小虎',
        }, {
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-02',
          name: '王小虎',
        }, {
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-04',
          name: '王小虎',
        }, {
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-01',
          name: '王小虎',
        }, {
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-08',
          name: '王小虎',
        }, {
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-06',
          name: '王小虎',
        }, {
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-07',
          name: '王小虎',
        },{
          modeName: '模板1',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-06',
          name: '王小虎',
        }]
    }
  },
  methods:{
    creatNewMode: function(){
      this.$router.push('/creatMode')
    },
  },
  created:function(){
    this.$http.get('http://192.168.1.151:8088/Appapi.asmx/getBuilding')
      .then(response => {
        this.result = response.data;
        console.log(this.result)
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
