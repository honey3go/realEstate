<template>
  <div id="userMng">
    <div class="step">
      <el-steps :active="active" process-status="finish" finish-status="success" center>
        <el-step title="验证"></el-step>
        <el-step title="修改"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
      <div class="userMng-info" v-if="active== 0">
        <h4>当前登录用户为：&nbsp;&nbsp;{{user.name}}</h4>
        <h4>最近一次登录时间：&nbsp;&nbsp;{{ user.logTime }}&nbsp;&nbsp;&nbsp;&nbsp;</h4>
      </div>
    <div class="inputForm" id="inputForm1" v-if="active== 0">
      <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm1.pass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="inputForm" id="inputForm2" v-else-if="active== 1">
      <el-form  :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px">
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm2.newPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-else> 
      <h3><img src="/static/img/dui.png">恭喜您，修改密码成功！</h3>
      <p class="indent">
        <span v-model="timer">{{timer}}</span>秒后即将跳转到登录页
      </p>
    </div>
    <div>
      <el-button type="primary" v-show="isShow" @click="submitForm">下一步</el-button>
    </div>
  </div>
</template>

<script>
import {  mapState, mapMutations } from 'vuex'

export default {
  name: 'userMng',
  data () {
      /**
       * [validatePass：第一步,输入密码验证身份的校验器]
       * @AuthorHTL 陈新华
       */
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value !== this.user.password) {
            callback(new Error('密码不正确'));
          } else {
            callback();
          }
        }
      };
      /**
       * [validateOldNew：第二步,验证新旧密码是否相同的校验器]
       * @AuthorHTL 陈新华
       */
      var validateOldNew = (rule, value, callback) => {
      if (value == this.ruleForm1.pass) {
          callback(new Error('新旧密码相同'));
        } else {
          callback();
        }
      };
      /**
       * [validateDiff：第二步,验证两次输入的密码是否一致的校验器]
       * @AuthorHTL 陈新华
       */
      var validateDiff = (rule, value, callback) => {
        if ( value === '' ) {
          callback( new Error('请确认密码') );
        } else if (value !== this.ruleForm2.newPass) {
          callback( new Error('两次输入密码不一致') );
        } else {
          callback();
        }
      };
    return {
      active: 0,
      isShow: true,
      timer: 5,
      ruleForm1: {
        pass: ''
      },
      ruleForm2:{
        newPass:"",
        checkPass:""
      },
      /**
       * [rules：表单校验规则]
       * @AuthorHTL 陈新华
       */
      rules: {
          pass: [
            { validator: validatePass, required: true , trigger: 'blur' }
          ],
          newPass: [
            { validator: validateOldNew , required: true , trigger: 'blur' },
            {  type: 'string', message: '请输入新密码',trigger: 'blur' },
            {  min: 6, max: 10, message: '由字母、数字组成的6-10位半角字符',pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,trigger: 'blur' }
          ],
          checkPass: [
            { validator: validateDiff, required: true , trigger: 'blur' }
          ]
      },   
    }
  },
  watch: {
    active: function (val, oldVal) {
      if( val === 3 ){
        this.isShow = false;
        this.count();
        this.changePassword({ password:this.ruleForm2.newPass });
      }
    },
    timer: function (val, oldVal) {
      if( val === 0){
        this.$router.push('/');
      }
    }
  },
  methods:{
    ...mapMutations([
      'changePassword' 
    ]),
    /**
     * [count：5秒的倒计时]
     * @AuthorHTL 陈新华
     */
    count: function() {
      if (this.timer > 0) {
          this.timer--;
          setTimeout(this.count, 1000);
      }
    },
    /**
     * [submitForm：每个步骤提交的click事件]
     * @AuthorHTL 陈新华
     */
    submitForm: function() {
      if ( this.active === 0 ){
        this.$refs['ruleForm1'].validate((valid) => {
          if (valid) {
            this.active++;
          } else {
            console.log('error submit!!');
            return false;
          }
        });        
      } else if ( this.active === 1){
        this.$refs['ruleForm2'].validate((valid) => {
          if (valid) {
            this.active = 3;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else { 
        this.active++;//this.active > 2
      }
    }
  },
  computed:{
    ...mapState([
      'user'
    ]),
  },

}
</script>

<style lang='less'>
#userMng{
  width: 100%;
  height: 100%;
  background-color: #F9FAFC;//#F4D8DD;
  font-size: 14px;

  .userMng-info{
    width: 40%;
    margin: 0 auto;
    padding-left: 15%;
    h4{
      text-align: left;
    }
  }
  .step{
    margin: 0 25%;
    border-top: 45px solid transparent;
    border-bottom: 45px solid transparent;
  }
  p{
    text-indent: 16em;
  }
  .inputForm{
    width: 30%;
    margin: 0 auto;
    padding-right: 45px;

    h3{
      color: #7ABD54;
    }
  } 
}
</style>
