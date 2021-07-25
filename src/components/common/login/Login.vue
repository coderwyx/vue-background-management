<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img
          src="@/assets/logo.png"
          alt="头像"
        >
      </div>
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="form"
        :rules="loginFormRules"
        class="login_form"
      >
        <el-form-item prop='username'>
          <el-input
            v-model="form.username"
            prefix-icon="iconfont icon-zhanghao"
          ></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input
            type='password'
            v-model="form.password"
            prefix-icon="iconfont icon-mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            @click="login"
            type="primary"
          >登录</el-button>
          <el-button
            @click="resetLoginForm"
            type="info"
          >重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import { getUser } from "network/login";

export default {
  name: "Login",
  data() {
    return {
      // 定义表单绑定对象
      form: {
        username: "admin",
        password: '123456',
      },
      // 定义表单规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "用户名长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          getUser(this.form).then(res=> {
            console.log(res);
            // 根据返回状态码，确定是否登录成功
            if (res.meta.status === 200) {
              this.$message.success("登录成功")
              // 保存服务器返回的token到浏览器的sessionStorage中
              window.sessionStorage.setItem('token',res.data.token);
              // 跳转到后台主页
              this.$router.push('/home')
            }else {
              this.$message.error(res.meta.msg)
            }
          })
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px #ccc solid;
      border-radius: 50%;
      padding: 5px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #ccc;
      }
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

</style>