<template>
  <div id="modelist">
    <div class="mode-list" v-if="house">
      <el-table :data="house" height="100%" max-height="100%" border style="width: 100%;height:100%;" @expand="showPic">
        <el-table-column type="expand" width="50">
          <!-- <el-form v-if="house"> -->
            <table class="housePic" @click="showCon" v-if="houseData"> 
              <tr v-for="(item,index) in houseData">
                <td class="floor" disabled>{{`${houseData.length - index}楼`}}</td>
                <td v-for="(house,num) in item" :class="{'unbook':house.ygbz==1}" :data-tag="index+'-'+num">{{house.change.doorNum}}</td>
              </tr>
            </table>
          <!-- </el-form> -->
        </el-table-column>
        <el-table-column prop="address" label="楼盘地址" width="380"></el-table-column>
        <el-table-column prop="NUM" label="不动产单元号" width="380"></el-table-column>
        <el-table-column prop="tnum" label="未登记户数" ></el-table-column>
      </el-table>
    </div>
    <div v-else class="loading">
      <i class="el-icon-loading"></i>
      查询中，请稍等
    </div>
  </div>
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'
import systemParam from '../js/systemParam.js'

export default {
  name: 'query',
  props:['userBd'],
  data () {
    return {
      house: null,
      isLoading:true,
      houseReg: /\d+-\d+[A-X]*-\d+/g,//门牌号：2-1-1或1-12A-3
      houseData: null,
    }
  },
  methods:{
    changeHouse: function(house,reg){
      let totalFloor = parseInt(house[0].zcs),//总楼层数
          finalData = new Array(totalFloor);//按楼层存户号

      for (let value of house){
        let doorArr = value.bdczl.match(reg),
            doorNum = doorArr[doorArr.length-1],//门牌号：2-1-1
            [unit, floor, num] = doorNum.split("-");
        //数据中4层、13层、14层存为3A，12A，12C，此处转换回数字
        switch (floor){
          case "3A":
          floor = "4";
          break;
          case "12A":
          floor = "13";
          break;
          case "12C":
          floor = "14";
          break;
        }   
        //新增change属性，存放完整门牌号，单元号，楼号，户号
        value.change = { doorNum, unit, floor, num }; 
        //按楼层从高到低排序
        if (typeof finalData[totalFloor - value.change.floor] === "undefined"){
          finalData[totalFloor - value.change.floor] = [];
        };

        finalData[totalFloor - value.change.floor].push(value);
      }
     
      //对每层楼，按单元号、户号从小到大排序
      for (let flr of finalData){
        flr.sort(function(x,y){

          if (x.change.unit > y.change.unit){
            return 1;
          } else if (x.change.unit < y.change.unit ){
            return -1;
          } else {
            if (x.change.num > y.change.num){
              return 1;
            } else if (x.change.num < y.change.num){
              return -1;
            } else {
              return 0;
            }
          }
          
        });
      }

      return finalData;
    },
    showPic: function(row,expanded){
      if (this.houseData == null){

        this.$http.get(`${systemParam.serviceAddress}/${systemParam.getHouse}${row.NUM}`)
          .then(response => {
            let responseObj = string2Obj(response.data);
            console.log("house")

            if (responseObj!==null){
              let { code, msg, data} = responseObj;

              if ( code === "200" && data.length > 0) {
               this.houseData= this.changeHouse(data,this.houseReg);
              } else {
                alert("没有对应数据！"+code)
              };
            } else {
              alert("网络或服务器错误")
            };

          })
          .catch(response => {
            console.log(response)
          });
      }
    },
    showCon:function(row, column, cell, event){
      var ev = ev||window.event,
          target = ev.target||ev.srcElement,
          classList = target.classList;

      if ( classList.contains('floor') ){
        return
      }

      let pos = target.dataset.tag.split('-').map(function(value){
        return parseInt(value);
      });

      let [ floor, num ] = pos,
          finalCell = this.houseData[floor][num];//获取到当前点击的单元格对应的数据

      if ( classList.contains('unbook') ){
        

        this.$notify({
          title: '消息',
          message: `马上为您跳转至${finalCell.change.doorNum}合同编辑页面`,
          type: 'success',
          duration: 2500,
          onClose: () => {
            this.$router.push( { path:'/creatMode'} )
          }
        });
      } else {
        this.$notify({
          title: '警告',
          message: `${finalCell.change.doorNum}不参加此次登记`,
          type: 'warning',
          duration: 2500
        });
      };
    }
  },
  created:function(){
    console.log(this.userBd,"userBd");
    this.$http.get(`${systemParam.serviceAddress}${systemParam.getBuilding}${this.userBd.name}`)
      .then(response => {
        let responseObj = string2Obj(response.data);

        console.log("response")
        if (responseObj!==null){
          let { code, msg, data} = responseObj;

          if ( code === "200" && data.length > 0) {

            for (let item of data){
              item.inc = this.userBd.name;
            }
            this.house = data;
            console.log(this.house,"house")
          } else {
            alert("没有对应数据！"+code)
          };
        } else {
          alert("网络或服务器错误")
        };
      })
      .catch(response => {
        console.log(response)
      });
  },
  watch:{
    userBd:function(newVal){
      console.log('23')
    },
    houseData:function(){
      console.log('houseDatachange')
    }
  }
}
</script>

<style lang='less'>
.picshow{

}
.house1{
  background-color: #F7BA2A;
}
.loading{
  height: 100%;
  padding: 100px 0 10px 0;
}
.housePic{
  width: 100%;
  height: 100%;
  color: #fff;

  td{
     background-color: #D3DCE6;
  }
  .floor{
    background-color: #99A9BF;
  }
  .unbook{
    color: black;
    background-color: #13CE66;
  }

  tr:hover>td{
    background-color:#D3DCE6 !important;
  }
  tr:hover>td.floor{
    background-color:#99A9BF!important;
  }
  tr:hover>td.unbook{
    background-color:#13CE66 !important;
  }

}
#modelist{
  position: relative;
  padding: 0 10px;

  .mode-list{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 46px; 
    padding: 10px;  

    th{
      text-align: center;
      background-color: #20A0FF;
    }
    th div{
      background-color: #20A0FF;
      color: #fff;
    }
  }
  .mode-btns{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
  }
}
</style>
