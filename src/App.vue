<template>
  <div id="app">
    <nav></nav>
    <div class="main">
        <el-row class="tac leftBar">
          <el-col :xs="4" :sm="8" :md="8" :lg="6">
            <leftNav></leftNav>
          </el-col>
          <el-col :xs="20" :sm="16" :md="16" :lg="18" class="page">
            <router-view class="page"></router-view>
          </el-col>
        </el-row>
    </div>
    <footer></footer>
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
  height: 10%;
  background-color: rgb(32,160,255);
}
footer {
  height: 3%;
  background-color: rgb(134,153,163);
}
.main {
  height: 87%;
  padding: 0 8%;
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
