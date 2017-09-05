<template>
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
</template>

<script>
import { string2Obj } from '../js/generalMethods.js'

export default {

}
</script>

<style lang='less'>

</style>
