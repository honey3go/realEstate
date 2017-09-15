<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @select="showPage" id="leftBar">
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
    <el-menu-item index="statList" v-if="user.role=='gov'">
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
      isCollapse: false//是否折叠导航栏(在手机端折叠)
    }
  },
  /**
   * [created 如果是手机端则折叠导航栏]
   * @AuthorHTL
   * @DateTime  2017-09-15T15:05:26+0800
   * @return    {[type]}                 [description]
   */
  created:function(){
    if (document.getElementsByTagName('body')[0].offsetWidth < 361){
      this.isCollapse = true;
    }
  },
  methods:{
    //Vuex,映射 this.changeDocStatus 为 this.$store.commit('changeDocStatus')
    ...mapMutations([
      'changeDocStatus'
    ]),
    /**
     * [showPage 导航栏点击事件]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-15T15:31:46+0800
     * @param     {string}                 index [点击的导航栏目所在的index属性值]
     */
    showPage(index){
      if (index){
        this.$router.push({path:`/${index}`});
      }
    }
  },
  computed:{
    //Vuex,映射 this.user 为 this.$store.state.user
    ...mapState([
      'user'
    ]),
  },
  watch:{
    /**
     * 监控路由跳转情况。
     * 如果从当前页面跳转至creatContact，则修改doc状态为contact;
     * 如果从当前页面跳转至modeMng，则修改doc状态为mode;
     */
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