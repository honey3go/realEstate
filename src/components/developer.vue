<template>
  <div id="developer">
    <span class="devHeader">开发商：{{developer}}</span>
    <div class="devTable">
      <el-table :data="devData" height="100%" max-height="100%" border style="width: 100%;height:100%;" empty-text="查询中，请稍等">
        <el-table-column type="expand" width="65">
          <template scope="props">
            <table>
              <tr>
                <th class="expand">楼栋数</th>
                <td class="expand unit" v-for="(item,index) in props.row.blockList" @click="showHolds(item,props.row)">{{ item }}</td>
                <!-- props.row为单击行的对象 -->
              </tr> 
            </table>
          </template>
        </el-table-column>
        <el-table-column prop="buildingsName" label="预售楼盘名称" min-width="200"></el-table-column>
        <el-table-column prop="buildingsNum" label="预售楼盘数量" sortable min-width="150"></el-table-column>
        <el-table-column prop="registered" label="已备案" sortable min-width="100">
        </el-table-column>
        <el-table-column prop="unregistered" label="待备案" sortable min-width="100">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="nocontract" label="未通过" sortable min-width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'developer',
  data () {
    return {
      //子路由通过 this.$route.params.参数名 来接收父路由传递过来的值，刷新会消失
      //通过JSON.parse将sessionStorage存储的数据解析为js值
      developer: JSON.parse(sessionStorage.getItem("devName")),
      devData: [{
        blockList: ['2号楼','3号楼','4号楼'],
        buildingsName: '中国国际社区',
        buildingsNum: 60,
        registered: 35,
        unregistered: 20,
        nocontract:5,
        remark: ''
      },{
        blockList: ['3号楼','4号楼','5号楼','6号楼'],
        buildingsName: '中海龙湾',
        buildingsNum: 60,
        registered: 35,
        unregistered: 20,
        nocontract:5,
        remark: ''
      },{
        blockList: ['2号楼','3号楼','4号楼','5号楼','6号楼','7号楼'],
        buildingsName: '中海御河',
        buildingsNum: 60,
        registered: 35,
        unregistered: 20,
        nocontract:5,
        remark: ''
      }],  
    }
  }, 
 
  methods:{
    /**
     * [showHolds 为展开行的每个td绑定的单击事件]
     * @AuthorHTL 陈新华
     */ 
    showHolds: function(item,row){ 
      this.$confirm(`此操作将为您跳转至【${row.buildingsName}${item}】的统计列表, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        sessionStorage.setItem("buildingsName",JSON.stringify(row.buildingsName));
        sessionStorage.setItem("unitName",JSON.stringify(item));
        this.$router.push({name: "households",params:{unitName:item,update:1,readonly:0}});
      }).catch(() => {});
      
    }
  },
}
</script>

<style lang='less'>
#developer{
  position: relative;
  .devHeader{
    display: block;
    border-top: 65px solid transparent;
    font-weight: bold;
    text-decoration:underline;
  }
  .devTable{
    position: absolute;
    top: 120px;
    right: 0;
    left: 0;
    bottom: 46px; 
    padding: 10px; 
    th{
      text-align: center;
    } 
    .expand{
      color:#fff;
      font-weight: normal;
      background: #99A9BF;
      padding: 0 10px;
    }
    .unit{
      background-color: #13CE66;
      padding: 0 25px;
    }
  }

}

    
</style>
