<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-table :data="rightsList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称" ></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot='scope'>
            <el-tag v-if="scope.row.level==='0'" type='success'>一级</el-tag>
            <el-tag v-else-if="scope.row.level==='1'">二级</el-tag>
            <el-tag v-else-if="scope.row.level==='2'" type='danger'>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightsList } from "network/home.js";

export default {
  name: "Rights",
  data() {
    return {
      rightsList: [],
    };
  },
  methods: {
    getRightsList() {
      getRightsList("list").then((res) => {
        console.log(res);
        this.rightsList = res.data
      });
    },
  },
  created() {
    this.getRightsList();
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>