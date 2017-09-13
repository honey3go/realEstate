<template>
  <div id="houseQuery">
    <div class="mode-list" v-if="house">
      <el-table :data="house" height="100%" max-height="100%" border style="width: 100%;height:100%;" @expand="showPic" >
        <el-table-column type="expand" width="50">
          <template scope="scope" id="22">
            <div v-if="!houseData[scope.row.NUM]" class="loading">
              <i class="el-icon-loading"></i>
              查询中，请稍后
            </div>
            <table id="showTab" v-else class="housePic" @click="showCon" :data-num="scope.row.NUM">
              <tr>
                <th class="floor">说明</th>
                <th class="floor" id="en1" colspan="2">灰色：不可登记</th>
                <th class="floor" id="en2" colspan="2">绿色：可登记</th>
              </tr> 
              <tr v-for="(item,index) in houseData[scope.row.NUM]">
                <td class="floor" disabled>{{`${houseData[scope.row.NUM].length - index}楼`}}</td>
                <td v-for="(house,num) in item" :class="{'unbook':house.ygbz==1}" :data-tag="index+'-'+num">{{house.change.doorNum}}</td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="楼盘地址" min-width="235"></el-table-column>
        <el-table-column prop="NUM" label="自然幢号" min-width="235"></el-table-column>
        <el-table-column prop="tnum" label="未登记户数"></el-table-column>
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
  data () {
    return {
      house: null,
      isLoading:true,
      houseReg: {
        door: /\d+-\d+[A-X]*-\d+/g,
        normarl: /\d+[A-X]+/g
      },//门牌号：2-1-1或1-12A-3
      houseData: {},
    }
  },
  methods:{
    changeHouse: function(house,reg){
      let totalFloor = parseInt(house[0].zcs),//总楼层数
          finalData = new Array(totalFloor);//按楼层存户号
      //1.格式化数据，使得门牌号为全数字
      //2.对每户房屋，新增change属性，存放完整门牌号，单元号，楼号，户号
      //3.并按楼层从低到高存为数组
      for (let value of house){
        //1.当前数据中楼层存在数字+英文格式，需要转换为纯数字格式
        let doorArr = value.bdczl.match(reg),
            doorNum = doorArr[doorArr.length-1],//取得门牌号2-1-1或1-3A-1
            normalData = new Map([//完整门牌号标准化字典
              ["3A","4"],["12A","13"],["12C","14"]
            ]),
            //标准化门牌号为纯数字
            normarlDoorNum = doorNum.replace( this.houseReg.normarl, function(value){
              return normalData.get(value)
            }),
            [unit, floor, num] = normarlDoorNum.split("-");

        //新增change属性，存放完整门牌号，单元号，楼号，户号
        value.change = { doorNum: normarlDoorNum, unit, floor, num }; 
        //按楼层从高到低排序
        if (typeof finalData[totalFloor - value.change.floor] === "undefined"){
          finalData[totalFloor - value.change.floor] = [];
        };

        finalData[totalFloor - value.change.floor].push(value);
      }
     
      //对每层楼，按单元号、户号从小到大排序
      for (let flr of finalData){
        flr.sort(function(x,y){
          let ux = x.change.unit,
              uy = y.change.unit;

          if ( ux > uy ){
            return 1;
          } else if ( ux < uy ){
            return -1;
          } else {
            let nx = x.change.num,
                ny = y.change.num;

            if ( nx > ny){
              return 1;
            } else if ( nx < ny ){
              return -1;
            } else {
              return 0;
            }
          }
          
        });
      }

      return finalData;
    },
    /**
     * [showPic 表格行展开事件，显示户型图]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-01T17:32:13+0800
     * @param     {object}                 row      [当前点击的行对应的数据对象]
     * @param     {boolean}                expanded [是否展开]
     */
    showPic: function(row,expanded){
      if ( !this.houseData.hasOwnProperty(row.NUM) ){

        this.$http.get(`${systemParam.serviceAddress}/${systemParam.getHouse}${row.NUM}`)
          .then(response => {
            let responseObj = string2Obj(response.data);
            console.log("house")

            if ( responseObj!==null ){
              let { code, msg, data } = responseObj;

              if ( code === "200" && data.length > 0) {
                //这里使用this.$set，不然houseData非响应式，不会渲染DOM
                this.$set(this.houseData, row.NUM, this.changeHouse(data,this.houseReg.door));
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
    /**
     * [showCon 楼盘表点击事件代理]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-01T16:43:56+0800
     */
    showCon: function( ev = window.event ){
      let target = ev.target||ev.srcElement,//获取目标元素
          classList = target.classList,//获取目标元素的CSS类列表
          room = target.innerHTML;//获取目标元素的户号

      if ( classList.contains("floor") ) {//目标元素是楼层或说明，则无操作
        return
      } 

      if ( classList.contains("unbook") ){//目标元素是可登记的房屋，则跳转至合同编辑页面
        this.$confirm(`此操作将为您跳转至${room}号合同编辑页面, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$router.push( { path:'/creatContact'} )
        }).catch(() => {});
      } else {//目标元素是不可登记的房屋，则弹出提示，不跳转
        this.$notify({
          title: '警告',
          message: `${room}号不参加此次登记`,
          type: 'warning',
          duration: 2500
        });
      }
    }
  },
  created:function(){
    this.$http.get(`${systemParam.serviceAddress}${systemParam.getBuilding}${this.$store.state.user.name}`)//兴城市富邦房地产开发有限公司
      .then(response => {
        let responseObj = string2Obj(response.data);

        console.log("response")
        if (responseObj!==null){
          let { code, msg, data} = responseObj;

          if ( code === "200" && data.length > 0) {

            for (let item of data){
              item.inc = this.$store.state.user.name;
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
}
</script>

<style lang='less'>

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

  td,th#en1{
     background-color: #D3DCE6 !important;
  }
  .floor{
    background-color: #99A9BF !important;
  }
  .unbook,#en2{
    color: black;
    background-color: #13CE66 !important;
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

    th div{
      background-color: #20A0FF;
      color: #fff;
    }
#houseQuery{
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
