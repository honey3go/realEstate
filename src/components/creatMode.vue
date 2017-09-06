<template>
  <el-row class="creat-mode print" align="flex" justify="start">
    <el-col :xs="4" :sm="6" :md="6" :lg="6" class="modes noprint" >
      <el-tree :data="treeData" :props="defaultProps" node-key="path" ref="tree" highlight-current default-expand-all class="opt-tree" @node-click="getCheckedNodes"></el-tree>
    </el-col>
    <el-col :xs="20" :sm="18" :md="18" :lg="18" class="main-write print">
      <router-view class="page print"></router-view>
<!--         <div class="prt-btn noprint">
        <div>
          <el-button type="primary" icon="document" title="预览/打印" class="norad">&nbsp</el-button>
        </div>
        <div>
          <el-button type="success" icon="upload2" title="保存" class="norad">&nbsp</el-button>
        </div>
      </div> -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'creat-mode',
  data () {
    return {
      treeData: [{
          label: '拆分后的模板表单',
          children: [{
            label: '封面',
            children: [{
              path:'p1',
              label: '封面1'
            },{
              path:'p2',
              label: '封面2'
            }]
          },{
            label: '正文',
            children: [{
              path:'p3',
              label: '第三页(甲方、乙方)',
              
            },{
              path:'p4',
              label: '第四页(合同第1、2条)'
            },{
              path:'p5',
              label: '第五页(合同第3、4条)'
            },{
              path:'p6',
              label: '第六页(合同第5条)'
            },{
              path:'p7',
              label: '第七页(合同第6条)'
            },{
              path:'p8',
              label: '第八页(合同第7条)'
            },{
              path:'p9',
              label: '第九页(合同第8条)'
            }]
          },{
            label: '附件',
            children: [{
              path:'p10',
              label: '附件一'
            },{
              path:'p11',
              label: '附件二'
            },{
              path:'p12',
              label: '附件三'
            },{
              path:'p13',
              label: '附件四'
            }]
          }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      creatId:""
    }
  },
  props:['modeID'],
  methods: {
    getCheckedNodes(obj) {
      if (obj.path){
        this.$router.push(`/creatMode/${obj.path}`);
      }
    },
  },

}
</script>

<style lang='less'>

.creat-mode {
  width: 100%;
  height: 100%;

  .modes{
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    .opt-tree{
      border-top: 0;
      border-bottom: 0;
      height: 100%;

      span{
        float: left;
      }
      .el-tree-node__expand-icon{
        position: relative;
        top: 12px;
      }
    }
  }
}
.main-write{
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
/*.prt-btn{
  position: fixed;
  top:150px;
  line-height: 40px;
}
.norad{
  border-radius: 0;
  width: 80px;
  height: 36px;

}*/
</style>
