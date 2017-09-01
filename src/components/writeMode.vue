<template>
  <div class="write print">
    <div class="write-wrap print">
      <div class="write-edge">
        <h3>模板名称：<input name="modeName" v-model="modeMsg.modeName" :class="[{'ipt-active':modeMsg.modeName},'spec-ipt','longer']"></h3>
        <h3>制作人：<input name="name" v-model="modeMsg.name" :class="[{'ipt-active':modeMsg.name},'spec-ipt']">制作时间：<input type="date" name="date" v-model="modeMsg.date" :class="[{'ipt-active':modeMsg.date},'spec-ipt']"></h3>
        <h3>备注：<input name="more" v-model="modeMsg.more" :class="[{'ipt-active':modeMsg.more},'spec-ipt','longer']"></h3>
        <h1 class="title">房&nbsp;屋&nbsp;商&nbsp;品&nbsp;买&nbsp;卖&nbsp;合&nbsp;同</h1>
        <h3>（合同编号<input>）</h3>
        <h3 class="title algn">合同双方当事人：</h3>
        <!-- 出卖人 -->
        <h3 class="title algn">出&nbsp;&nbsp;卖&nbsp;&nbsp;人&nbsp;：<input></h3>
        <h3 class="normal-ipt" v-for="item in normalIpt">
          <em>{{item}}<span></span></em><input type="" name="">
        </h3>
        <h3 class="title algn">委托代理人：<input></h3>
        <h3>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：<input :class="['ipt-active','longer']"></h3>
        <h3>邮政编码：<input :class="['ipt-active','normal']">联系电话：<input :class="['ipt-active','normal']"></h3>
        <h3 class="title algn">委托代理机构：<input></h3>
        <h3>营业执照注册号：<input :class="['ipt-active','short']">法定代表人：<input :class="['ipt-active','short']"></h3>
        <h3>邮政编码：<input :class="['ipt-active','normal']">联系电话：<input :class="['ipt-active','normal']"></h3>
        <!-- 买受人 -->
        <h3 class="title algn">买&nbsp;&nbsp;受&nbsp;&nbsp;人&nbsp;：<input></h3>
        <h3>【本人】姓名：<input :class="['ipt-active','long']"></h3>
        <h3>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：<input :class="['ipt-active','longer']"></h3>
        <h3>邮政编码：<input :class="['ipt-active','normal']">联系电话：<input :class="['ipt-active','normal']"></h3>
        <h3 class="title algn">委托代理人：<input></h3>
        <h3>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：<input :class="['ipt-active','longer']"></h3>
        <h3>邮政编码：<input :class="['ipt-active','normal']">联系电话：<input :class="['ipt-active','normal']"></h3>
      </div> 
      <div class="prt-btn noprint">
        <div>
          <el-button type="primary" icon="document" title="预览/打印" class="norad" @click="printPage">&nbsp</el-button>
          <span>◆</span>
        </div>
        <div>
          <el-button type="success" icon="upload2" title="保存" class="norad" @click="savePage">&nbsp</el-button>
          <span>◆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import systemParam from '../js/systemParam.js'
import { string2Obj } from '../js/generalMethods.js'

export default {
  name: 'write-mode',
  data () {
    return {
      modeMsg:{
        modeName: "",
        more: "无",
        date: "",
        name: "",
      },
      
      normalIpt:["注册地址：","营业执照注册号：","企业资质证书号：","法定代表人：","联系电话："]
    }
  },
  props:['user'],
  methods:{
    printPage:function(){
      window.print();
    },
    savePage:function(){
      let  necessaries = Object.values(this.modeMsg).every(function(item){
        return item !== '';
      });

      if ( necessaries ){
        let url = `${systemParam.serviceAddress}${systemParam.postMode}`,
            param = { 
                      developers: `${this.user.name}`,
                      jsonpar: JSON.stringify(this.modeMsgAuto)
                    };

        this.$http.post( url, param )
          .then(response =>{
              let { code, msg, data } = string2Obj( response.data );

              if ( code === "200" ){
                this.$alert('保存成功！', '消息', {
                confirmButtonText: '确定',
                type: 'success',
                callback: action => {
                  this.$router.push({path:'/modeMng'});
                }
              });
            }
          })
          .catch(response => {
            console.log(response)
          });
      } else {
        this.$alert('您还有必填项未填写，无法保存', '警告', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {}
        });
      };
    }
  },
  computed:{
    modeMsgAuto: function(){
      let { modeName, more, date, name } = this.modeMsg,
          page = 1;
      return { modeName, more, date, name, page, lastEditDate:date, lastEditName:name, user:this.user.name };
    }
  }
}
</script>

<style lang='less' scoped>
.norad{
  border-radius: 0;
}
.prt-btn{
  position: fixed;
  top:150px;

  span{
    position: relative;
    top: 6px;
    left: -22px;
    height: 36px;
    line-height: 36px;
    font-size: 36px;
    color: rgb(255,255,255);
  }
}
input {
  font-family: inherit;
  text-align: center;
  font-size: inherit;
}
.spec-ipt{
  background-color: rgba(218,89,97,0.4);
}
h3{
  -webkit-margin-before: 0.5em;
  -webkit-margin-after: 0.5em;
}
.write {
  font-family: STFangsong;
  width: 100%;
  height: 100%;
  input{
    border: 0;
    border-bottom: 1px solid black;
  }
}
.ipt-active{
  background-color: white;
}
.write-wrap{
  @a4: 3.5;
  @edge: 60px;
  @mainwidth: 210px * @a4;
  @mainheight: 297px * @a4;

  width: @mainwidth;
  height: @mainheight;
  margin: 20px auto;
  border: 1px solid rgb(204,204,204);
  background-color: white;

  .write-edge{
    padding: @edge;
    height: @mainheight - 2 * @edge ;


    .longer{
      width: 79%;
    }
    .long{
      width: 75%;
    }
    .normal{
      width: 31.8%;
    }
    .short{
      width: 25.8%;
    }
    .title{
      font-family: SimHei;
    }
    .algn{
      text-align: left;
    }

    .normal-ipt{/*中文分散对齐*/
      @emwidth: 155px;
      @emleft: 40px;
      @iptwidth: @mainwidth - 2 * @edge - @emwidth - @emleft - 2px;

      overflow: hidden;

      em {
        float: left;
        width: @emwidth;
        height: 26px;
        margin-left: @emleft;
        font-style: normal;
        text-align: justify;

        span{
          display: inline-block /* Opera */;
          padding-left: 100%;
        }
      }
      input {
        float: left;
        width:  @iptwidth ;
      }
    }

  }
}
</style>
