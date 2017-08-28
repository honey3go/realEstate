<template>
  <div class="write print">
    <div class="write-wrap print">
      <div class="write-edge">
          <p class="firstPara">根据《中华人民共和国合同法》、《中华人民共和国城市房地产管理法》及其他有关法律、法规之规定，买受人和出卖人在平等、自愿、协商一致的基础上就买卖商品房达成如下协议：</p>
        <h3>第一条 项目建设依据</h3>  
          <p>出卖人以<select><option v-for="item in optionsA">{{item}}</option></select>方式取得位于<input :class="['ipt-active','normal']">、编号为<input>的地块的土地使用权。</p>
          <p>土地使用证件号：<select><option v-for="item in optionsB">{{item}}</option></select>为<input>。</p>
          <p>该地块土地面积为<input :class="['ipt-active','normal']">㎡，规划用途为<input>，土地使用年限自<input type="date" name="startdate" v-model="modeMsg.startdate" :class="[{'ipt-active':modeMsg.startdate},'spec-ipt','normal']">至<input type="date" name="stopdate" v-model="modeMsg.stopdate" :class="[{'ipt-active':modeMsg.stopdate},'spec-ipt','normal']">。</p>
          <p>出卖人经批准，在上述地块上建设商品房，名称类别<select><option v-for="item in optionsC">{{item}}</option></select><input :class="['ipt-active','long']">。</p>
          <p>建设工程规划许可证号为<input :class="['ipt-active','normal']">，施工许可证号为<input :class="['ipt-active','normal']">。</p>
          <p><input :class="['ipt-active','indent']"><input :class="['ipt-active','longest']"></p>
        <h3>第二条 商品房销售依据</h3>
          <p>出卖人购买的商品房为<select><option v-for="item in optionsD">{{item}}</option></select>商品房。预售商品房批准机关为<input :class="['ipt-active','long']">，商品房预售许可证号为<input :class="['ipt-active','long']">。</p>
          <p><input :class="['ipt-active','indent']"><input :class="['ipt-active','longest']"></p>
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
export default {
  name: 'write-mode',
  data () {
    return {
      modeMsg:{
        startdate: "",
        stopdate: ""
      },
      optionsA:["出让","划拨","出租","作介入股"],
      optionsB:["土地使用权出让合同号","土地使用权划拨批准文件号","划拨土地使用权转让批准文件号","国有土地使用权证号"],
      optionsC:["现定名","暂定名"],
      optionsD:["现售","预售"]
    }
  },
  methods:{
    printPage:function(){
      window.print();
    },
    savePage:function(){
      console.log("hh")
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
  text-indent: 0;

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
input,select{
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
  text-indent: 2em;
  text-align: justify;
  input{
    border: 0;
    border-bottom: 1px solid black;
  }
  select{
    border: 1px solid #7F9DB9;
    padding: 2px 6px;
  }
  p{
    font-size: 18px;
    line-height: 1.5em;
  }
  .firstPara{
    line-height: 1.8em;
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

    .longest{
      width: 100%;
    }
    .indent{
      width: 94.8%;
    }
    .long{
      width: 75%;
    }
    .normal{
      width: 31.8%;
    }


  }
}
</style>
