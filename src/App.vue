<template>
  <div id="app" class="print">
    <div id="login" v-if="!user.name">
      <div class="no-wrap"></div>
      <div id="main" class="main" >
        <h1>商品房网上备案系统</h1>
        <div class="wrapDiv" v-model="input_msg">
          <div class="inputDiv">
            <label>用户名</label><input type="text" v-model="input_msg.admin" class="inputBtn">
          </div>
          <div class="inputDiv">
            <label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label><input type="password" v-model="input_msg.pwd" class="inputBtn">
          </div>
          <div class="inputDiv">
            <button type="submit" class="loginBtn" v-on:click="show">登&nbsp;&nbsp;录</button>
            <button type="submit" class="loginBtn cancel">取&nbsp;&nbsp;消</button>
          </div>
        </div>
      </div>
      <div id="footer" class="footer">
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
            <el-col id="left-warp" :sm="4" :md="4" :lg="4" class="noprint">
              <leftNav></leftNav>
            </el-col>
            <el-col id="main-warp" :sm="20" :md="20" :lg="20" class="page print">
              <!-- <keep-alive> -->
              <router-view class="page print"></router-view>
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
import { mapState, mapMutations } from 'vuex'
import systemParam from './js/systemParam.js'
import { string2Obj } from './js/generalMethods.js'
import leftNav from './components/leftNav'

export default {
  name: 'app',
  data() {
    return {
      input_msg:{//保存登录的用户名和密码，与用户数入在Input中的值双向绑定
        admin:'',//用户名
        pwd:'' //密码
      },
    };
  },
  components:{
    leftNav,
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
      //演示用，写死的在前端的用户名和密码，两个角色：房地产公司、房地产管理部门
      if ( ipt.admin === '辽宁龙田置业有限责任公司'){
        if ( ipt.pwd === this.user.password ){
          //登录成功时，将用户名、密码、角色保存到全局状态
          this.initLogin({ name:ipt.admin, password: ipt.pwd, role:"inc"})
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
      } else if ( ipt.admin === 'gov001' ) {
        if ( ipt.pwd === this.user.password ){
          //登录成功时，将用户名、密码、角色保存到全局状态
          this.initLogin({ name:ipt.admin, password: ipt.pwd, role:"gov"})
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
    },
    //Vuex, 映射 this.initLogin() 为 this.$store.commit('initLogin')
    ...mapMutations([
      'initLogin' 
    ]),
  },
  computed:{
    //Vuex, 映射 this.user 为 this.$store.state.user
    ...mapState([
      'user'
    ]),
  },
}
</script>

<style lang='less'>
@media print { //媒体查询，打印
  .noprint { display: none; }
  .print{
    margin: 0 !important;
    border: 0 !important;
    overflow-x:visible !important;
    overflow-y:visible !important;
   }
} 
@media screen and (max-height: 400px){//媒体查询，解决绝对定位与手机软键盘冲突：陈新华
  footer,#footer{
    display: none;
  }
}
@media screen and (max-width: 375px) {//媒体查询，宽375的手机
  #left-warp{
    width: 64px;
  }
  #main-warp{
    width: 296px;
  }
  .app-hide,.mode-btns span{
    display: none;
  }
   //登录页
  #login{
    background-color: #66C0B7;
    div.no-wrap{
      height: 25%;
    } 
    #main {
      background: none;
      margin-top: 0px;
      h1{
        background: none;
      }
      .wrapDiv{
        @btn_height:30px;
        border: none;
        background: none;
          .inputDiv{
            margin: 32px auto;
            width: 100%;
            .inputBtn{
              margin-left: 10px;
              width: 62%;
              min-width: none;
              height: @btn_height;
            }
            .loginBtn{
              height: @btn_height+4;
              width: 28%;
              font-size: inherit;
            }
          }
      }
    }
  }//login
  #userMng {
    div.inputForm{
      width: 95%;
      padding-right: 0px;
    }
    .indent{
      text-indent: 4em;
    }
    div.step{
      margin: 0 15%;
    }
    div.userMng-info {
      width: 100%;
      padding-left: 0;
    }
  }
  //备案统计功能
  #statList{
    div.statBtns{
      border-top: 10px solid transparent;
      .statSele{
        margin: 10px 0;
      }
    }
  }  
  #developer, #households{
    span.devHeader{
      border-top: 40px solid transparent;
    }
      div.devTable, div.holdsTable{
      top: 80px;
    }
  }
  //弹出框适应手机屏幕
  div.el-message-box {
    width: 280px;
    height: 160px;
    .el-message-box__content{
      padding: 20px 20px;
    }
    .el-message-box__btns{
      padding-top: 0px;
      .el-button, .el-textarea__inner{
        line-height: 10px;
      }
    }
  }
}
html,body {
  height: 100%;
  margin: 0;
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
    background-color: rgb(238,241,246);
  }
  .page{
    height: 100%;
    background-color: rgb(250,250,250);
  }
}
#login{// 登录页
  height: 100%;
  .no-wrap{
    height: 15%;
  }
  .main{
    height: 35%;
    min-height: 300px;
    padding: 10px 0;
    background-color: #66C0B7;
    h1{
      color: #7E4543;
      background: url(./assets/logo.png) no-repeat;
      background-size: 100% 100%;
    }
    .wrapDiv{
      @bg_color: #4E967F;
      @btn_height: 24px;
      @color: #1f2d3d;
      .border(@px:3px){
        border-radius: @px;
        -webkit-border-radius: @px;
        -moz-border-radius: @px;
        border:1px solid @bg_color;
      }
      height: 60%;
      width: 24%;
      min-width: 360px;
      background: #fff;
      margin: 0 auto;
      .border(5px);border:10px solid rgba(118,133,194,0.25);
      .inputDiv{
        margin: 27px auto;
        .inputBtn{
          width:45%;
          min-width: 200px;
          height: @btn_height;
          margin-left: 10px;
          .border;border-color: #bfcbd9;
        }
        .loginBtn{
          width:90px;
          height: @btn_height + 4;
          background:@bg_color;color:#fff;
          .border;
          margin-left:59px;//值固定
        }
        .cancel{
          color:@color;
          background:#F5F3F3;
          margin-left:18px;
        }
      }
    }
  }
  .footer{
    width: 100%;//绝对定位后，宽度设置100%，文字居中
    position: absolute;
    bottom: 25px;
    color: #ccc;
    font-size: 0.5em;
  }
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
</style>
