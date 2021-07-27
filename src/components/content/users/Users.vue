<template>
  <div>
    <!-- 面包屑导航区 -->
    <UsersBreadcrumb></UsersBreadcrumb>

    <!-- 卡片视图区域 -->
    <UsersContent ref='usersContentRef' @changeUserInfo='changeUserInfo' @ChangeAddDialogVisible='ChangeAddDialogVisible'></UsersContent>

    <!-- 对话框区域 -->
    <UsersDialog ref="usersDialogRef" @getUserList='getUserList'></UsersDialog>
  </div>
</template>

<script>
import UsersBreadcrumb from "components/content/users/childComps/UsersBreadcrumb.vue";
import UsersContent from "components/content/users/childComps/UsersContent.vue";
import UsersDialog from "components/content/users/childComps/UsersDialog.vue";
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