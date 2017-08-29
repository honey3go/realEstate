<template>
  <div id="app" class="print">
    <nav class="noprint">
      <h4 id="username">{{user.name}}</h4>
    </nav>
    <el-row class="main print">
      <el-col :xs="0" :sm="0" :md="0" :lg="1" class="page noprint"></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="22" class="page print">
        <el-row class="tac leftBar">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" class="noprint">
            <leftNav></leftNav>
          </el-col>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" class="page print">
            <router-view class="page print" :userBd="user"></router-view>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="0" :sm="0" :md="0" :lg="1" class="page noprint"></el-col>
    </el-row>
    <footer class="noprint">@copy-right 辽宁万朋测绘地理信息科技开发有限公司</footer>
  </div>
</template>

<script>
import leftNav from './components/leftNav'
import systemParam from './js/systemParam.js'
import { string2Obj } from './js/generalMethods.js'

export default {
  name: 'app',
  data() {
      return {
        user:null,
        result: null,
      };
  },
  components:{
    leftNav
  },
  created:function(){
    console.log("created")
    this.user = {name:"辽宁龙田置业有限责任公司"};
  }
}
</script>

<style lang='less'>
@media print { 
.noprint { display: none; }
.print{
  margin: 0 !important;
  border: 0 !important;
  overflow-x:visible !important;
  overflow-y:visible !important;
 }
} 
@mainGrey:rgb(238,241,246);

html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
nav {
  position: relative;
  width: 100%;
  height: 10%;
  background-color: rgb(32,160,255);
  color: rgb(255,255,255);

  #username{
    position: absolute;
    right: 10px;
    bottom: 10px;
    margin: 0;
    font-weight: normal;
  }
}
footer {
  height: 3%;
  background-color: #C0CCDA;
  font-size: 12px;
}
.main {
  height: 87%;
  background-color: rgb(255,255,255);

  .leftBar{
    height: 100%;
    background-color: @mainGrey;
  }
  .page{
    height: 100%;
    background-color: rgb(250,250,250);
  }
}
</style>
