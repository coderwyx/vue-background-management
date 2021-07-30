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
      <!-- 添加角色按钮区域 -->
      <el-button class="addRoles" @click="addRoles" type='primary'>添加角色</el-button>

      <!-- 角色列表区域 -->
      <el-table :data='rolesList' border stripe>
        <!-- 展开列 -->
        <el-table-column type='expand'></el-table-column>
        <!-- 索引列 -->
        <el-table-column type='index'></el-table-column>
        <el-table-column label='角色名称' prop='roleName'></el-table-column>
        <el-table-column label='角色描述' prop='roleDesc'></el-table-column>
        <el-table-column label='操作' width='300px'>
          <template v-slot='scope'>
            <el-button @click='changeRoles(scope.row.id)' type='primary' size='mini' icon="el-icon-edit">编辑</el-button>
            <el-button @click='delRoles(scope.row.id)' type='danger' size='mini' icon="el-icon-delete">删除</el-button>
            <el-button type='warning' size='mini' icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <RolesDialog @getRolesList='getRolesList' ref="rolesDialogRef"></RolesDialog>
  </div>
</template>

<script>
import { getRolesList, getRoles, delRoles } from "network/home.js";
import RolesDialog from "./childComps/RolesDialog";
export default {
  name: "Roles",
  data() {
    return {
      rolesList: [],
    };
  },
  methods: {
    // 获取角色列表数据
    async getRolesList() {
      let res = await getRolesList();
      if (res.meta.status != 200) {
        return console.log("角色列表数据获取失败");
      }
      console.log(res);
      this.rolesList = res.data;
    },
    // 点击按钮打开添加角色对话框
    addRoles() {
      this.$refs.rolesDialogRef.addDialogVisible = true;
    },
    // 点击按钮打开编辑角色对话框
    async changeRoles(id) {
      console.log(id);
      let res = await getRoles(id);
      console.log(res);
      if (res.meta.status === 200) {
        this.$refs.rolesDialogRef.rolesForm = res.data;
      }
      this.$refs.rolesDialogRef.rolesDialogVisible = true;
    },
    // 点击按钮打开删除角色确认按钮
    delRoles(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delRoles(id).then((res) => {
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              return this.getRolesList();
            }
            this.$message.error('删除失败')
          }); 
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {
    RolesDialog,
  },
  created() {
    this.getRolesList();
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