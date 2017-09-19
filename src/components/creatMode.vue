<template>
  <el-row class="creat-mode print" type="flex" justify="start">
    <el-button class="switchBtn" @click="onSwitch">
      <i :class="[isShow ? '' : 'el-icon-arrow-left']"></i>
    </el-button><!-- 显示隐藏切换按钮：陈新华 -->
    <el-col :lg="6" class="modes noprint" v-if="isShow" id="modes"><!-- 删除:xs :md :sm，添加v-show和id：陈新华 -->
      <el-tree :data="treeData" :props="defaultProps" node-key="path" ref="tree" highlight-current default-expand-all expand-on-click-node class="opt-tree" @node-click="getCheckedNodes"></el-tree>
    </el-col>
    <el-col :lg="18" class="main-write print" v-else>
      <router-view class="page print" :user="userBd"></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'creat-mode',
  data () {
    return {
      isShow: true,
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
  props:['userBd'],
  methods: {
    getCheckedNodes(obj) {
      if (obj.path){
        this.$router.push(`/creatMode/${obj.path}`);
      }
      this.isShow=!this.isShow;
    },
    //显示隐藏切换按钮click事件：陈新华
    onSwitch: function() {
      this.isShow=!this.isShow;
    }
  }
}
</script>

<style lang='less'>

.creat-mode {
  width: 100%;
  height: 100%;
  //切换显示按钮样式：陈新华
  .switchBtn{
    border: none;
    background: transparent;
    position: fixed;
    top: 48%;
    left: 50px;
  }
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

</style>
