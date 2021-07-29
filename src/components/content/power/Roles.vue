<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-button class="addRoles" type='primary'>添加角色</el-button>

      <el-table :data='rolesList' border stripe>
        <!-- 展开列 -->
        <el-table-column type='expand'></el-table-column>
        <!-- 索引列 -->
        <el-table-column type='index'></el-table-column>
        <el-table-column label='角色名称' prop='roleName'></el-table-column>
        <el-table-column label='角色描述' prop='roleDesc'></el-table-column>
        <el-table-column label='操作' width='300px'>
          <template v-slot='scpoe'>
            <el-button type='primary' size='mini' icon="el-icon-edit">编辑</el-button>
            <el-button type='danger' size='mini' icon="el-icon-delete">删除</el-button>
            <el-button type='warning' size='mini' icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <!-- 角色列表区域 -->
  </div>
</template>

<script>
import { getRolesList } from "network/home.js";
export default {
  name: "Roles",
  data() {
    return {
      rolesList:[],
    };
  },
  methods: {
    async getRolesList() {
      let res = await getRolesList();
      if(res.meta.status!=200){
        return console.log("角色列表数据获取失败");
      }
      console.log(res);
      this.rolesList = res.data;
    },
  },
  created() {
    this.getRolesList()
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.addRoles {
  margin-bottom: 15px;
}
</style>