<template>
  <div id="home">
    <h3>{{`${$store.state.user.name}，欢迎您！`}}</h3>
    <h1>今天是
      <span>    {{`${nowDate.getFullYear()}年${nowDate.getMonth()+1}月${nowDate.getDate()}日 星期${numList.get(nowDate.getDay())}`}}</span>
    </h1>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'

export default {
  name: 'modeList',
  data () {
    return {
      nowDate: new Date(),
      numList: new Map([
        [1,'一'], [2,'二'], [3,'三'],
        [4,'四'], [5,'五'], [6,'六'],[7,'日']
      ]),
    }
  },
}
</script>

<style lang='less'>
#home{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #F9FAFC;

  span{
    color: #1D8CE0;
  }
  h3{
    position: absolute;
    top: 30px;
    left: 30px;
    margin: 0;
    text-align: left;
  }
  h1{
    position: absolute;
    margin: 0;
    top: 200px;
    left: 12%;
  }
}
</style>