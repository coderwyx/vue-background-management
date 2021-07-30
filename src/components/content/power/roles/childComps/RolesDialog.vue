<template>

  <div>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" @close='AddDialogVisibleClose'>
      <!-- 内容主体区域 -->
      <el-form :model="addRolesForm" :rules="addRolesRules" ref="addRolesRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部区域 -->
      <span slot="footer">
        <el-button type="primary" @click="addRoles">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="rolesDialogVisible" @close='rolesDialogVisibleClose'>
      <!-- 内容主体区域 -->
      <el-form :model="rolesForm" :rules="addRolesRules" ref="rolesRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部区域 -->
      <span slot="footer">
        <el-button type="primary" @click="changeRoles">确 定</el-button>
        <el-button @click="rolesDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRoles,changeRolesList } from "network/home.js";

export default {
  name: "RolesDialog",
  data() {
    return {
      // 控制添加角色对话框
      addDialogVisible: false,
      // 控制编辑角色对话框
      rolesDialogVisible: false,
      // 添加角色对话框表单
      addRolesForm: {
        roleName: "",
        roleDesc: "",
      },
      // 修改角色对话框表单
      rolesForm: {
        roleName: "",
        roleDesc: "",
      },
      addRolesRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 添加角色
    addRoles() {
      this.$refs.addRolesRef.validate((vaild) => {
        if (vaild) {
          addRoles(this.addRolesForm).then((res) => {
            if (res.meta.status === 201) {
              this.$message.success("添加角色成功");
              this.$emit("getRolesList");
              return (this.addDialogVisible = false);
            }
            return this.$message.error(res.meta.msg);
          });
        }
      });
    },
    // 当对话框关闭时清除验证
    AddDialogVisibleClose() {
      this.$refs.addRolesRef.resetFields();
    },
    rolesDialogVisibleClose() {
      this.$refs.rolesRef.resetFields();
    },
    changeRoles(){
      changeRolesList(this.rolesForm).then(res=> {
        if(res.meta.status === 200){
          this.$message.success('修改成功');
          this.rolesDialogVisible = false;
          return this.$emit('getRolesList')
        }
      })
    }
  },
};
</script>

<style scoped>
</style>