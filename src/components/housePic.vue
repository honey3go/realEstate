<template>
  <table class="housePic" @click="showCon" v-if="houseData"> 
    <tr v-for="(item,index) in houseData">
      <td class="floor" disabled>{{`${houseData.length - index}楼`}}</td>
      <td v-for="(house,num) in item" :class="{'unbook':house.ygbz==1}" :data-tag="index+'-'+num">{{house.change.doorNum}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'housePic',
  props:['houseId'],
  data () {
    return {
      houseData:null
    }
  },
  methods:{

  }
  beforeCreate:function(){
    console.log(this.houseId)
  }
}
</script>

<style scoped>

</style>
