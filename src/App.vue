<template>
  <div id="app" class="print">
    <div id="login" v-if="!user">
      <div class="logo">
        <h1>商品房网上备案系统</h1><img src="./assets/background.jpg">
      </div>
      <div class="inputDiv" v-model="input_msg">
          <label class="labelTxt">用户名</label>
          <input type="text" v-model="input_msg.admin" id="btn_admin" class="inputBtn">
          <label class="labelTxt">密码</label>
          <input type="password" v-model="input_msg.pwd" id="btn_pwd" class="inputBtn">
          <button type="submit" class="loginBtn" @click="show">登 录</button>
      </div>
      <div class="footer">
        CopyRight&nbsp;©&nbsp;2017&nbsp;辽宁万朋测绘地理信息科技开发有限公司
      </div>
    </div>
    <div class="content" v-else>
      <nav class="noprint">
        <h4 id="username">{{user.name}}</h4>
      </nav>
      <el-row class="main print">
        <el-col :xs="0" :sm="0" :md="0" :lg="1" class="page noprint"></el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="22" class="page print">
          <el-row class="tac leftBar">
            <el-col id="left-warp"  :sm="4" :md="4" :lg="4" class="noprint">
              <leftNav></leftNav>
            </el-col>
            <el-col id="main-warp"  :sm="20" :md="20" :lg="20" class="page print">
              <!-- <keep-alive> -->
              <router-view class="page print" :userBd="user"></router-view>
              <!-- </keep-alive> -->
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="0" :sm="0" :md="0" :lg="1" class="page noprint"></el-col>
      </el-row>
      <footer class="noprint">@copy-right 2017 辽宁万朋测绘地理信息科技开发有限公司</footer>
    </div>
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
        input_msg:{//保存登录的用户名和密码，与用户数入在Input中的值双向绑定
          admin:'',//用户名
          pwd:'' //密码
        },
        user:{ name : '辽宁龙田置业有限责任公司'},//用户名，用于传递给子组件
      };
  },
  components:{
    leftNav
  },
  methods:{
    /**
     * [show 登录按钮点击事件，验证成功则卸载登录页面并开始渲染内容页面，厚泽不渲染]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-01T15:55:15+0800
     * @return    {[type]}                 [description]
     */
    show:function(){
      let ipt = this.input_msg;

      if ( ipt.admin === '辽宁龙田置业有限责任公司'){
        if ( ipt.pwd === '000000' ){
          this.user = { name : ipt.admin};

          this.$message({
            message: '恭喜您，登录成功！',
            type: 'success'
          });
        } else {
          this.$alert('密码错误', '错误', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {}
          });
        };
      } else {
        this.$alert('用户名错误', '错误', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {}
        });
      };
    }
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
@media screen and (max-width: 1100px) {
    #left-warp{
      width: 64px;
    }
    #main-warp{
      width: 92%;
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
.content{
  width: 100%;
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
#login{
  position: relative;
  height: 100%;
}
.logo{
  width:100%;
  height:20%;
  padding-top:5%;
  position: relative;
  z-index: -1;
}
.logo img{
  width: 100%;
  height: 300px; /* 百分比 */
}
.logo h1{
  position: absolute;
  top: 33%;
  left: 10%;
  color: #7EBDE7; 
}
.inputDiv{
  height:10%;
  line-height: 2em;
  font-size: 0.875em;
  padding-left: 20px;
  z-index:100;
}
.labelTxt{
  color: #27486B;
}
.inputBtn{
  color: #1f2d3d;
  border-radius: 4px;/* 百分比 */
  border: 1px solid #bfcbd9;
  height: 20px;
}
.loginBtn{
  height:25px;/* 百分比 */
  width:55px;
  background:#1370BD;
  color:#fff;
  border:1px solid #3B8BD0;
  border-radius:3px;
}
.footer{
  color:#ccc;
  font-size:0.5em;
  text-align:center;
  margin-top:400px;/* 百分比 */
}
</style>
