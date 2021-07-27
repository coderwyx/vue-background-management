<template>
  <div>
    <!------------------------------------添加用户对话框----------------------------------------->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close='addDialogClose'>

      <!-- 内容主体区域 -->
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type='password' v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部区域 -->
      <span slot="footer">
        <el-button type="primary" @click="addUser">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!------------------------------------------------------------------------------------------>

    <!----------------------------------修改用户信息对话框---------------------------------------->
    <el-dialog title="修改用户信息" :visible.sync="changeDialogVisible" width="50%" @colse='changeDialogVisibleClose'>

      <!-- 内容主体区域 -->
      <el-form :model="changeUserForm" :rules="addUserRules" ref="changeUserInfoRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="changeUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="changeUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="changeUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部区域 -->
      <span slot="footer">
        <el-button type="primary" @click="changeUserInfo">确 定</el-button>
        <el-button @click="changeDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!------------------------------------------------------------------------------------------->
  </div>
</template>

<script>
import { addUser,changeUserInfo } from "network/home.js";

export default {
  name: "UsersDialog",
  data() {
    // 验证邮箱规则
    let checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail =
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;

      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法邮箱"));
    };
    // 验证手机号规则
    let checkPhone = (rule, value, cb) => {
      const regPhone = /^1[34578]\d{9}$/;
      if (regPhone.test(value)) {
        return cb();
      }
      cb(new Error("手机号格式有误"));
    };
    return {
      // 控制对话框显示
      addDialogVisible: false,
      changeDialogVisible: false,

      //  添加用户规则
      addUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "用户名长度为3~10位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "密码长度为6~15位", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      changeUserForm: {
        username: "",
        email: "",
        mobile: "",
      },
    };
  },
  methods: {
    // 监听添加用户对话框的关闭事件
    addDialogClose() {
      this.$refs.addUserRef.resetFields();
    },
    // 点击按钮，添加用户
    addUser() {
      this.$refs.addUserRef.validate((vaild) => {
        console.log(vaild);
        if (vaild) {
          console.log(this.addUserForm);
          // 发起添加用户的网络请求
          addUser(this.addUserForm).then((res) => {
            console.log(res);
            if (res.meta.status === 201) {
              this.$message.success("添加用户成功");
              this.$emit("getUserList");
              this.addDialogVisible = false;
              return;
            }
            return this.$message.error("添加用户失败");
          });
        }
      });
    },
    // 点击按钮更改用户信息
    changeUserInfo() {
      this.$refs.changeUserInfoRef.validate(valid=>{
        if(valid){
          
          // 验证通过可以发起修改请求
          console.log(this.changeUserForm);
          changeUserInfo(this.changeUserForm).then(res=> {
            console.log(res);
          })
         return console.log(valid);
        }
        console.log(valid);
      })
    }, 
    // 监听修改用户信息对话框关闭事件
    changeDialogVisibleClose() {
      this.$refs.changeUserInfoRef.resetFields()
    },
  },
};
</script>

<style scoped>
</style>