<template>
  <div id="home">
    <h3>{{`${userBd.name}，欢迎您！`}}</h3>
    <h1>今天是
      <span>    {{`${nowDate.getFullYear()}年${nowDate.getMonth()+1}月${nowDate.getDate()}日 星期${changNum(nowDate.getDay())}`}}</span>
    </h1>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'

export default {
  name: 'modeList',
  props:['userBd'],
  data () {
    return {
      nowDate: new Date(),
    }
  },
  methods:{
    changNum:function(num){
      let changeArr = new Map([[1,'一'], [2,'二'], [3,'三' ],[4,'四' ], [5,'五'], [6,'六'],[7,'日' ]]);

      return changeArr.get(num);
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
    left: 200px;
  }
}
</style>
