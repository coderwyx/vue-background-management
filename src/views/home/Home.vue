<template>
  <div> 
    <el-button @click="loginOut" type='info'>退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data () {
   return {}
  },
   methods:{
     loginOut(){
       window.sessionStorage.clear('token');
       this.$router.push('/login')
     }
   }
}
</script>

<style scoped>

</style>