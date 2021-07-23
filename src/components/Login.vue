<template>
  <div class="login"> 
    <div class="login-box">

    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
   return {}
  },
   methods:{}
}
</script>

<style lang='less' scoped>
  .login {
    height: 100%;
    background-color: #2b4b6b;
    .login-box {
      height: 300px;
      width: 450px;
      background-color: #fff;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>