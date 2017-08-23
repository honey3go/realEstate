<template>
  <div class="write print">
    <div class="write-wrap print">
      <div class="write-edge">
        <h3>模板名称：<input name="modeName" v-model="modeMsg.modeName" :class="[{'ipt-active':modeMsg.modeName},'spec-ipt','long']"></h3>
        <h3>制作人：<input name="name" v-model="modeMsg.name" :class="[{'ipt-active':modeMsg.name},'spec-ipt']">制作时间：<input type="date" name="date" v-model="modeMsg.date" :class="[{'ipt-active':modeMsg.date},'spec-ipt']"></h3>
        <h3>备注：<input name="more" v-model="modeMsg.more" :class="[{'ipt-active':modeMsg.more},'spec-ipt','long']"></h3>
        <h1 class="title">房&nbsp屋&nbsp商&nbsp品&nbsp买&nbsp卖&nbsp合&nbsp同</h1>
        <h3>（合同编号<input>）</h3>
        <h3 class="title algn">合同双方当事人：</h3>
        <h3 class="normal-ipt" v-for="item in normalIpt">
          <em>{{item}}<span></span></em><input type="" name="">
        </h3>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'write-mode',
  data () {
    return {
      modeMsg:{
        modeName: "",
        page: 0,
        more: "",
        lastEditDate: "",
        lastEditName: "",
        date: "",
        name: "",
      },
      normalIpt:["出卖人：","注册地址：","营业执照注册号：","企业资质证书号：","法定代表人：","联系电话："]
    }
  },
}
</script>

<style lang='less' scoped>
input {
  font-family: inherit;
  text-align: center;
  font-size: inherit;
  
}
.spec-ipt{
  background-color: rgba(218,89,97,0.4);
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
  @edge: 80px;
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


    .long{
      width: 80%;
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
