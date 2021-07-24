<template>
  <el-header>
    <div class="headerLeft">
      <span @click="toggleCollapse" class="iconfont icon-liebiao toggle_button"></span>
      <span>电商后台管理系统</span>
    </div>
    <el-button
      @click="loginOut"
      type='info'
    >退出</el-button>
  </el-header>
</template>

<script>
export default {
  name: "HomeHeader",
  data() {
    return {};
  },
  methods: {
    // 退出登录
    loginOut() {
      window.sessionStorage.clear("token");
      this.$router.push("/login");
    },
    // 切换菜单的折叠与展开
    toggleCollapse(){
      this.$emit('toggleCollapse')
    }
  },
};
</script>

<style lang='less' scoped>
.el-header {
  font-size: 16px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}
.toggle_button{
  font-size: 24px;
  margin-right: 20px;
}
.headerLeft {
  display: flex;
  align-items: center;
}
</style>