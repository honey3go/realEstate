<template>
  <div id="login">
    <div class="logo">
      <h1>商品房网上备案系统</h1><img src="../assets/background.jpg">
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
</template>


<script>
export default {
  name: 'login',
  data () {
    return {
      input_msg:{
        admin:'',
        pwd:'' 
      }
    }
  },
  methods:{
    show:function(){

    }
  }
}
</script>



<style scoped>
body {
  height: 100%;
  margin: 0;
}
#login{
  height: 100%;
}
.logo{
  width:100%;
  height:20%;
  margin-top:5%;
  position: relative;
  z-index: -1;
}
.logo img{
  width: 100%;
  height: 300px; /* 百分比 */
}
.logo h1{
  position: absolute;
  top: 8%;
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