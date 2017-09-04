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
      <el-menu-item index="2-1">查看所有</el-menu-item>
      <el-menu-item index="2-2">新建合同</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">
      <i class="el-icon-star-on"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="query">
      <i class="el-icon-information"></i>
      <span slot="title">查询统计</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-document"></i>
      <span slot="title">文件打印</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
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
        this.$router.push(`/${index}`);
      }
    }
  }
}
</script>