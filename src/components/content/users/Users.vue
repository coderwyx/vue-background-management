<template>
  <div>
    <!-- 面包屑导航区 -->
    <UsersBreadcrumb></UsersBreadcrumb>

    <!-- 卡片视图区域 -->
    <UsersContent ref='usersContentRef' @setRolesDialogVisible='setRolesDialogVisible' @changeUserInfo='changeUserInfo' @ChangeAddDialogVisible='ChangeAddDialogVisible'></UsersContent>

    <!-- 对话框区域 -->
    <UsersDialog ref="usersDialogRef" @getUserList='getUserList'></UsersDialog>
  </div>
</template>

<script>
import UsersBreadcrumb from "components/content/users/childComps/UsersBreadcrumb.vue";
import UsersContent from "components/content/users/childComps/UsersContent.vue";
import UsersDialog from "components/content/users/childComps/UsersDialog.vue";
import { getRolesList } from "network/home.js";
export default {
  name: "Users",
  data() {
    return {};
  },
  methods: {
    // 显示添加用户对话框
    ChangeAddDialogVisible() {
      this.$refs.usersDialogRef.addDialogVisible = true;
    },
    // 获取用户列表
    getUserList() {
      this.$refs.usersContentRef.getUserList();
    },
    // 显示修改用户信息对话框
    changeUserInfo(userInfo) {
      console.log(userInfo);
      this.$refs.usersDialogRef.changeUserForm = userInfo;
      this.$refs.usersDialogRef.changeDialogVisible = true;
    },
    //显示分配权限对话框
    setRolesDialogVisible(userInfo){
      console.log(userInfo);
      getRolesList().then(res=> {
        if(res.meta.status===200){
          return this.$refs.usersDialogRef.rolesList = res.data
        }
        this.$message.error('获取角色列表失败')
      })
      this.$refs.usersDialogRef.userInfo = userInfo;
      this.$refs.usersDialogRef.setRolesDialogVisible = true;
    }
  },
  components: {
    UsersBreadcrumb,
    UsersContent,
    UsersDialog,
  },
};
</script>

<style scoped>
.el-form {
  padding: 0 30px;
}
</style>