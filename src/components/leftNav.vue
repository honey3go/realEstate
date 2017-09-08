<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @select="select" id="leftBar">
    <el-menu-item index="modeMng">
      <i class="el-icon-document"></i>
       <span slot="title">模板管理</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">合同管理</span>
      </template>
      <el-menu-item index="contactList">查看所有</el-menu-item>
      <el-menu-item index="creatContact">新建合同</el-menu-item>
    </el-submenu>
    <el-menu-item index="userMng">
      <i class="el-icon-star-on"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="query">
      <i class="el-icon-information"></i>
      <span slot="title">楼盘统计</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-document"></i>
      <span slot="title">文件打印</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'leftnav',
  data () {
    return {
      isCollapse: false
    }
  },
  created:function(){
    if (document.getElementsByTagName('body')[0].offsetWidth < 1100){
      this.isCollapse = true;
    }
  },
  methods:{
    select: function(index){
      console.log(index)
      if (index){
        this.$router.push({path:`/${index}`});
      }
    },
    ...mapMutations([
      'changeDocStatus'
    ]),
  },
  watch:{
    '$route' ( to ) {
      if ( to.path === "/creatContact" ){
        this.changeDocStatus({type:"contact"});
      } else if ( to.path === "/modeMng") {
        this.changeDocStatus({type:"mode"});
      }
    }
  }
}
</script>