<template>
  <div id="households">
    <span class="devHeader">开发商：{{developer}}</span>
    <div class="holdsTable">
      <el-table :data="holdsData" border height="100%" max-height="100%" style="width: 100%;height:100%;" empty-text="查询中，请稍等" :summary-method="getSummaries" show-summary>
        <el-table-column type="index" label="编号" width="65"></el-table-column>
        <el-table-column prop="buildingsName" label="楼盘名称" min-width="160"></el-table-column>
        <el-table-column prop="unitNo" label="楼栋号" min-width="80"></el-table-column>
        <el-table-column prop="holdsNo" label="户号" min-width="80"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="100" :filters="filterArr" :filter-method="filterTag" filter-placement="bottom-end">
        <template scope="scope">
          <el-tag :type="judge(scope.row.status)" close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'households',
  data () {
    return {
      developer: JSON.parse(sessionStorage.getItem("devName")),
      filterArr: [{ 
        text: '未审批', 
        value: '未审批' 
      },{ 
        text: '审批中', 
        value: '审批中' 
      },{ 
        text: '已审批',
        value: '已审批' 
      }, { 
        text: '未通过', 
        value: '未通过' 
      }],
      holdsData: [{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-1',
        status: '未审批',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-2',
        status: '未通过',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-3',
        status: '审批中',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-4',
        status: '已审批',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-5',
        status: '未通过',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-6',
        status: '审批中',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-1',
        status: '未审批',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-2',
        status: '未通过',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-3',
        status: '审批中',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-4',
        status: '已审批',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-2',
        status: '未通过',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-2',
        status: '未通过',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-3',
        status: '审批中',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-4',
        status: '已审批',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-2',
        status: '未通过',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-2',
        status: '未通过',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-3',
        status: '审批中',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-2-4',
        status: '已审批',
        remark: ''
      },{
        buildingsName: JSON.parse(sessionStorage.getItem("buildingsName")),
        unitNo: JSON.parse(sessionStorage.getItem("unitName")),
        holdsNo: '1-1-2',
        status: '未通过',
        remark: ''
      }]

      
          
    }
  }, 
  methods:{
    /**
     * [filterTag 为状态过滤的方法]
     * @AuthorHTL 陈新华
     * row为拿到的行数据的对象
     */
    filterTag(value, row) {
      return row.status === value;
    },
    /**
     * [judge 为根据4种不同状态添加不同tag标签样式的方法]
     * @AuthorHTL 陈新华
     * val为传过来的scope.row.status
     */
    judge: function(val){
      switch(val){
        case '未审批': return 'warning';break;
        case '未通过': return 'danger';break;
        case '审批中': return 'primary';break;
        case '已审批': return 'success';break;
        default: alert("other");
      }  
    },
    /**
     * [getSummaries 合计规则，统计合同的状态和对应数量]
     * @AuthorHTL 王叁
     * @DateTime  2017-09-15T10:49:09+0800
     * @param     {array}                 options.columns [表格中的列信息，一个成员是一列]
     * @param     {array}                 options.data    [表格中的数据]
     * @return    {array}                                 [合计行要展示的数据]
     */
    getSummaries({ columns, data }){
      const status = data.map((value) => value.status),//抽出当前表格中显示的所有状态数据存为数组
            sums = [];
       
      columns.forEach(( column, index ) => {
        
        switch ( index ){
          case 0 ://首列显示"合计"
            sums[index] = '合计';
            break;
          case 4 ://第五列统计不同状态的合同数量
            let finalMap = new Map(),//Map数据结构，保存状态和对应数量
                currentCount = 1;
            //遍历状态数组status
            for ( let val of status ){
              //判断finalMap中是否已存在val对应的状态，有则状态对应的数量+1；
              //否则新建状态，并将数量记为1
              if ( finalMap.has( val ) ){
                currentCount = finalMap.get(val) + 1;
              }

              finalMap.set( val, currentCount );
            }
            console.log(finalMap)
            //类型转换：Map->Array->String
            sums[index] = [...finalMap].join(' ').replace( /,/g, ':');
            break;
          default://其他列默认显示"/"
            sums[index] = '/';
        }
      })

      return sums;
    },
  },
}
</script>

<style lang='less'>
#households{
  position: relative;
  .devHeader{
    display: block;
    border-top: 65px solid transparent;
    font-weight: bold;
    text-decoration:underline;
  }
  .holdsTable{
    position: absolute;
    top: 120px;
    right: 0;
    left: 0;
    bottom: 46px; 
    padding: 10px; 
    th{
      text-align: center;
    } 
  }
} 
</style>
