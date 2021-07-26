<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="30">
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='queryUser(queryInfo.query)'>
            <el-button slot="append" icon="el-icon-search" @click="queryUser()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>

      </el-row>

      <el-table :data='userList' border stripe>
        <el-table-column type='index'></el-table-column>
        <el-table-column label='姓名' prop='username'></el-table-column>
        <el-table-column label='邮箱' prop='email'></el-table-column>
        <el-table-column label='电话' prop='mobile'></el-table-column>
        <el-table-column label='角色' prop='role_name'></el-table-column>
        <el-table-column label='状态' prop='mg_state'>
          <template v-slot='{row}'>
            <!-- {{row}} -->
            <el-switch v-model="row.mg_state" @change="userStateChanged(row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label='操作' width="180px">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size='mini'></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size='mini'></el-button>
          <!-- 分配权限按钮 -->
          <el-tooltip effect="dark" content="分配权限" placement="top" :enterable='false'>
            <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
          </el-tooltip>

        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total='total'>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUserList, changeUserState } from "network/home.js";

export default {
  name: "Users",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
    };
  },
  methods: {
    // 获取用户列表
    getUserList(queryInfo) {
      getUserList(queryInfo)
        .then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg);
          }
          this.userList = res.data.users;
          this.total = res.data.total;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 改变页面显示多少条数据
    handleSizeChange(e) {
      console.log(e);
      this.queryInfo.pagesize = e;
      this.getUserList(this.queryInfo);
    },
    // 改变当前显示的页数
    handleCurrentChange(e) {
      console.log(e);
      this.queryInfo.pagenum = e;
      this.getUserList(this.queryInfo);
    },
    // 监听switch开关状态的改变
    userStateChanged(userInfo) {
      console.log(userInfo);
      changeUserState({
        id: userInfo.id,
        state: userInfo.mg_state,
      }).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state;
          return this.$message.error("更新用户状态失败");
        }
        return this.$message.success("更新用户状态成功");
      });
    },
    // 查询用户信息
    queryUser(){
      this.queryInfo.pagenum = 1
      getUserList(this.queryInfo).then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg);
          }
          this.userList = res.data.users;
          this.total = res.data.total;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUserList(this.queryInfo);
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-card {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
  font-size: 12px;
}
</style>