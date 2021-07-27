<template>
  <el-card>
    <!-- 搜索与添加区域 -->
    <el-row :gutter="30">
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='queryUser(queryInfo.query)'>
          <el-button slot="append" icon="el-icon-search" @click="queryUser()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="ChangeAddDialogVisible">添加用户</el-button>
      </el-col>

    </el-row>

    <!-- 用户信息表格 -->
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
        <template v-slot='scope'>
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size='mini' @click="changeUserInfo(scope.row.id)"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size='mini'></el-button>
          <!-- 分配权限按钮 -->
          <el-tooltip effect="dark" content="分配权限" placement="top" :enterable='false'>
            <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total='total'>
    </el-pagination>
  </el-card>
</template>

<script>
import { getUserList, changeUserState,checkUserInfo } from "network/home.js";
export default {
  name: "UsersContent",
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 查询参数
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      userList: [],
      total: 0,
    };
  },
  methods: {
    // 获取用户列表
    getUserList() {
      getUserList(this.queryInfo)
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

    // 改变页面显示多少条数据
    handleSizeChange(e) {
      console.log(e);
      this.queryInfo.pagesize = e;
      this.getUserList();
    },
    // 改变当前显示的页数
    handleCurrentChange(e) {
      console.log(e);
      this.queryInfo.pagenum = e;
      this.getUserList();
    },

    // 查询用户信息
    queryUser() {
      this.queryInfo.pagenum = 1;
      this.getUserList();
    },
    // 点击按钮显示添加用户对话框
    ChangeAddDialogVisible() {
      this.$emit("ChangeAddDialogVisible");
    },
    // 点击按钮显示修改用户对话框
    changeUserInfo(id) {
      checkUserInfo(id).then(res=>{
        console.log(res);
        if(res.meta.status===200){
         return this.$emit("changeUserInfo",res.data);
        }
        this.$message.error("获取用户信息失败")
      })
      
    },
  },

  created() {
    this.getUserList();
  },
};
</script>

<style scoped>
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