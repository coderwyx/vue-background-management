<template>
  <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: "UsersBreadcrumb",
  data () {
   return {}
  },
   methods:{}
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>