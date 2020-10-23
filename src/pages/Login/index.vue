<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 登录页面用户名和密码 -->
      <h1>后台管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="UserName">
          <el-input
            type="text"
            v-model="loginForm.UserName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pass">
          <el-input
            type="password"
            v-model="loginForm.Pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 背景视频 -->
    <div class="login-bg">
      <!-- http://chst.vip:8081/stu2/media/bg_video.d2d602a9.mp4 -->
      <video
        muted="muted"
        src="http://chst.vip:8081/stu2/media/bg_video.d2d602a9.mp4"
        autoplay="autoplay"
        loop="loop"
        preload="auto"
        class="bg_video"
      ></video>
    </div>
  </div>
</template>

<style>
#app {
  overflow: hidden;
  height: 100%;
}

.login-page {
  height: 100%;
  width: 100%;
  /* overflow: hidden;
  position: relative;
  z-index: -99;
  left: 0;
  top: 0; */
}
.login-page .login-container {
  box-sizing: border-box;
  width: 400px;
  height: 480px;
  padding: 50px 0;
  position: relative;
  top: 15%;
  left: 60%;
  z-index: 99;
  text-align: center;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.2);
}
.login-page .login-container h1 {
  font: 32px/50px "";
  padding: 20px;
  color: #fff;
}

.login-page .login-container .demo-loginForm {
  color: #fff;
  margin-top: 20px;
  text-align: center;
  position: relative;
}
.login-page .login-container .demo-loginForm h1 {
  margin-bottom: 20px;
}
.login-page .login-container .demo-loginForm .el-input__inner {
  /* 输入框？ */
  width: 250px;

  background: none;
  color: #fff;
  float: left;
}
.login-page .login-container .demo-loginForm .el-form-item__label {
  /* 提示信息 */
  color: #fff;
  float: left;
}

.login-page .login-container .demo-loginForm .el-button {
  /* 按钮 提交按钮 */
  width: 250px;
  float: left;
}
.login-page .login-bg {
  position: absolute;
  z-index: -100;
  left: 0;
  top: 0;
  overflow: hidden;
}
</style>

<script>
import { login } from "@/api";
import {mapMutations} from "vuex"
export default {
  data() {
    var ruleUserName = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      // !uPattern.test(value)
      if (!value) {
        callback("用户名为4到16位（字母，数字，下划线，减号）");
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        UserName: "",
        Pass: ""
      },
      rules: {
        UserName: [{ validator: ruleUserName, trigger: "blur" }],
        Pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在登陆...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // //发送登入请求
          // console.log(this.loginForm.UserName);
          // console.log( this.loginForm.Pass);
          login(this.loginForm.UserName, this.loginForm.Pass)
            .then(res => {
            
              loading.close()
              if (res.data.state) {
                //用户名和密码正确
                this.$message.success("登陆成功")
                // console.log(res.data.userInfo);
                localStorage.setItem("qf2005-token", res.data.token);
                localStorage.setItem("qf2005-userInfo", JSON.stringify(res.data.userInfo));
                //更改vuex中state['userinfo']的值
                this.SET_USERINFO(res.data.userInfo)
                this.$router.push("/Welcome");
              } else {
                //用户名和密码错误
              loading.close()
               this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>