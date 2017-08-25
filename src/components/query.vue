<template>
  <div id="modelist">
    <div class="mode-list" v-if="house">
      <el-table :data="house" height="100%" max-height="100%" border style="width: 100%;height:100%;" @row-click="showPic">
        <el-table-column type="expand" width="50">
          <el-form :title="house.NUM">
            <table class="housePic">
              <tr v-for="(item,index) in houseData">
                <td>{{`${index+1}楼`}}</td>
                <td v-for="house in item">{{house.change.doorNum}}</td>
              </tr>
            </table>
          </el-form>
        </el-table-column>
        <el-table-column prop="address" label="楼盘地址" width="380"></el-table-column>
        <el-table-column prop="NUM" label="不动产单元号" width="380"></el-table-column>
        <el-table-column prop="tnum" label="未登记户数" ></el-table-column>
      </el-table>

    </div>
    <div v-else>
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
      houseReg: /\d+-\d+[A-X]*-\d+/g,//门牌号：2-1-1或1-12A-3
      houseData: null,
    }
  },
  methods:{
    changeHouse: function(house,reg){
      let finalData = [];

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

        if (typeof finalData[value.change.floor-1] === "undefined"){
          finalData[value.change.floor-1] = [];
        };

        finalData[value.change.floor-1].push(value);
      }
      //排序
      for (let flr of finalData){
        flr.sort(function(x,y){
          const diff = x.change.unit - y.change.unit;

          if (diff > 0){
            return 1;
          } else if (diff <0 ){
            return -1;
          } else {
            if (x.change.floor > y.change.floor){
              return 1;
            } else if (x.change.floor < y.change.floor){
              return -1;
            } else {
              return 0;
            }
          }

        });
      }

      return finalData;
    },
    showPic: function(row){
        this.$http.get(`${systemParam.serviceAddress}/${systemParam.getHouse}${row.NUM}`)
          .then(response => {
            let responseObj = string2Obj(response.data);
            console.log("house")

            if (responseObj!==null){
              let { code, msg, data} = responseObj;

              if ( code === "200" && data.length > 0) {
               this.houseData= this.changeHouse(data,this.houseReg);
               console.log(this.houseData)
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
    addHousePic:function(row,expanded){
      console.log(expanded);
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
    }
  }
}
</script>

<style lang='less'>
.housePic{
  width: 100%;
  height: 100%;

  
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
