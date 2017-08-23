<template>
  <div id="app" class="print">
    <nav class="noprint"></nav>
    <el-row class="main print">
      <el-col :xs="0" :sm="0" :md="0" :lg="1" class="page noprint"></el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="22" class="page print">
        <el-row class="tac leftBar">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" class="noprint">
            <leftNav></leftNav>
          </el-col>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" class="page print">
            <router-view class="page print"></router-view>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="0" :sm="0" :md="0" :lg="1" class="page noprint"></el-col>
    </el-row>
    <footer class="noprint"></footer>
  </div>
</template>

<script>
import leftNav from './components/leftNav'

export default {
  name: 'app',
  data() {
      return {
        
      };
  },
  components:{
    leftNav
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
  width: 100%;
  height: 10%;
  background-color: rgb(32,160,255);
}
footer {
  height: 3%;
  background-color: rgb(134,153,163);
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
