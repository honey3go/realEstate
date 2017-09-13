<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @select="select" id="leftBar">
    <el-menu-item index="modeMng" v-if="user.role=='inc'">
      <i class="el-icon-document"></i>
       <span slot="title">模板管理</span>
    </el-menu-item>
    <el-submenu index="2" v-if="user.role=='inc'">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">合同管理</span>
      </template>
      <el-menu-item index="contactList">查看所有</el-menu-item>
      <el-menu-item index="creatContact">新建合同</el-menu-item>
    </el-submenu>
    <el-menu-item index="query" v-if="user.role=='inc'"> 
      <i class="el-icon-information"></i>
      <span slot="title">楼盘统计</span>
    </el-menu-item>
    <el-menu-item index="5" v-if="user.role=='gov'">
      <i class="el-icon-information" ></i>
      <span slot="title">备案统计</span>
    </el-menu-item>
    <el-menu-item index="examine" v-if="user.role=='gov'">
      <i class="el-icon-edit"></i>
      <span slot="title">备案审批</span>
    </el-menu-item>
      <el-menu-item index="userMng" >
      <i class="el-icon-setting"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'leftnav',
  data () {
    return {
      isCollapse: false
    }
  },
  created:function(){
    console.log(this.user.role)
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
  computed:{
    ...mapState([
      'user'
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