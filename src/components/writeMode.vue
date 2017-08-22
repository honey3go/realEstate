<template>
  <div class="write">
    <div class="write-wrap">
      <div class="write-edge">
        <h3>模板名称：<input name="modeName" v-model="modeMsg.modeName" :class="[{'ipt-active':modeMsg.modeName},'spec-ipt','long']"></h3>
        <h3>制作人：<input name="name" v-model="modeMsg.name" :class="[{'ipt-active':modeMsg.name},'spec-ipt']">制作时间：<input type="date" name="date" v-model="modeMsg.date" :class="[{'ipt-active':modeMsg.date},'spec-ipt']"></h3>
        <h3>备注：<input name="more" v-model="modeMsg.more" :class="[{'ipt-active':modeMsg.more},'spec-ipt','long']"></h3>
        <h1 class="title">房&nbsp屋&nbsp商&nbsp品&nbsp买&nbsp卖&nbsp合&nbsp同</h1>
        <h3>（合同编号<input>）</h3>
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
      }
    }
  },
}
</script>

<style lang='less' scoped>
input {
  font-family: inherit;
  
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

  width: 210px * @a4;
  height: 297px * @a4;
  margin: 20px auto;
  border: 1px solid rgb(204,204,204);
  background-color: white;

  .write-edge{
    padding: @edge;
    height: 297px * @a4 - 2 * @edge ;


    .long{
      width: 80%;
    }
    .title{
      font-family: SimHei;
    }
  }
}
</style>
