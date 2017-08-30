<template>
  <div id="modelist">
    <div class="mode-list">
      <el-table :data="tableData3" height="100%" max-height="100%" border style="width: 100%;height:100%;" @select="handleRowChange" @select-all="handleRowChange">
        <el-table-column type="selection" min-width="55"></el-table-column>
        <el-table-column type="index" min-width="50"></el-table-column>
        <el-table-column prop="modeName" label="模板名称" min-width="100"></el-table-column>
        <el-table-column prop="name" label="模板定制人" min-width="80"></el-table-column>
        <el-table-column prop="date" label="模板定制时间" min-width="130"></el-table-column>
        <el-table-column prop="page" label="模板页数" min-width="100"></el-table-column>
        <el-table-column prop="more" label="模板备注" ></el-table-column>
        <el-table-column prop="lastEditName" label="模板最后修改人" min-width="80"></el-table-column>
        <el-table-column prop="lastEditDate" label="模板最后修改时间" min-width="130"></el-table-column>
      </el-table>
    </div>
    <div class="mode-btns">
      <el-button type="primary">查看/打印</el-button>
      <el-button type="primary" icon="plus" @click="creatNewMode">新建</el-button>
      <el-button type="primary" icon="edit" @click="modifyMode">修改</el-button>
      <el-button type="primary" icon="delete" @click="deleteMode">删除</el-button>
    </div>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'

export default {
  name: 'modeList',
  data () {
    return {
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
          modeName: '模板2',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-02',
          name: '王小虎',
        }, {
          modeName: '模板3',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-04',
          name: '王小虎',
        }, {
          modeName: '模板4',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-01',
          name: '王小虎',
        }, {
          modeName: '模板5',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-08',
          name: '王小虎',
        }, {
          modeName: '模板6',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-06',
          name: '王小虎',
        }, {
          modeName: '模板7',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-07',
          name: '王小虎',
        },{
          modeName: '模板8',
          page: 3,
          more: '无',
          lastEditDate: '2017-01-05',
          lastEditName: '王大拿',
          date: '2016-05-06',
          name: '王小虎',
        }],
      selectedRows:[]
    }
  },
  methods:{
    /**
     * [handleRowChange 表格复选框选择事件，将当前选中的所有行的内容保存到数组selectedRows中]
     * @AuthorHTL 陈新华
     * @DateTime  2017-08-30T11:59:00+0800
     * @param     {object}                 selection [当前选中的所有对象]
     */
    handleRowChange: function(selection) {
      console.log(selection,'selection')
      this.selectedRows = selection; 
    },
    /**
     * [creatNewMode 新建按钮点击事件，跳转到creatMode页面]
     * @AuthorHTL 王叁
     * @DateTime  2017-08-30T12:00:52+0800
     */
    creatNewMode: function(){
      this.$router.push('/creatMode');
    },
    /**
     * [modifyMode 修改按钮点击事件，能且只能选择一项进行修改]
     * @AuthorHTL 陈新华
     * @DateTime  2017-08-30T12:01:26+0800
     */
    modifyMode: function(){
      if ( this.selectedRows.length === 0 ){//选择集为空时不能修改
        this.$alert('请选择一个模板进行修改！', '警告', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}//$alert, $confirm 
        });
      } else if ( this.selectedRows.length >= 2 ){//选择集中有多个对象时不能修改
        this.$alert('只能选择一个模板进行修改！', '警告', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        });
      } else {
        this.$router.push('/creatMode');
      }; 
    },
    /**
     * [deleteMode 删除按钮点击事件，支持一或多项进行删除]
     * @AuthorHTL 陈新华
     * @DateTime  2017-08-30T12:03:41+0800
     */
    deleteMode: function(){
      if ( this.selectedRows.length === 0 ){//选择集为空时不能删除
        this.$alert('请选择一个或多个需要删除的模板!', '警告', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {}
        });
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除选中项  
          let beforeLen =  this.tableData3.length;
              
          for(let i = 0 ; i < this.tableData3.length; i++){
            for(let j = 0 ; j < this.selectedRows.length; j++){
                if(this.tableData3[i] == this.selectedRows[j]){
                  this.tableData3.splice(i,1);
                }
             }
          }

          let afterLen = this.tableData3.length;
          //判断删除的项数是否与选择集一致
          if ( beforeLen - afterLen === this.selectedRows.length ){
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败!',
            });
          };
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      };
    }
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
