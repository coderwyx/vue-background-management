<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card></el-card>
  </div>
</template>

<script>
import {getRightsList}from "network/home.js";

export default {
  name: "Rights",
  data() {
    return {
      rightsList:[]
    };
  },
  methods: {
    getRightsList(){
      
      getRightsList('list').then(res=>{
        console.log(res);
      })
    }
  },
  created () {
    this.getRightsList()
  }

};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>