<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 登录页面用户名和密码 -->
      <h1>后台管理系统</h1>
      <el-form
        :model="loginForm"

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
        <el-form-item label="验证码" prop="captcha">
          <el-input
            type="text"
             class="captcha"
            v-model="loginForm.captcha"
            autocomplete="off"
          ></el-input>
          <span class="captcha-img" @click="set_captcha()" v-html="captchaSvg"></span>
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
        src="../../assets/imgs/bg_video.d2d602a9.mp4"
        autoplay="autoplay"
        loop="loop"
        preload="auto"
        class="bg_video"
      ></video>
    </div>
  </div>
</template>

<style>
.captcha-img{
  background-color: #fff;
  height: 44px;
  width: 135px;
  cursor: pointer;
}
.captcha .el-input__inner{
  width: 100px!important;
  position: absolute;
  left: 0;
  top: -22px;
  z-index: 12;
}
.captcha{
  width: 100px;
  float: left;
  margin-top: 22px;
}
.captcha-img{
  position: absolute;
  right: 50px;
  top: 0;
}
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
//登录逻辑的实现：
// 1 手机用户输入的 username和password传递给后端
// 2 登录通过后 将后端返回的token存到本地 跳转到主页
// 3 每次请求后 携带token到authorization
// 4 展示token正确的效验数据
// 5 校验不通过 跳转到登录页
import { login,getCaptcha,refreshCaptcha,verifyCaptcha } from "@/api";
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
    // 校验验证码
    var validateCaptcha = (rule, value, callback) => {
      if (!value||value.length!==5) {
        callback("请输入验证码");
      } else {
        callback();
      }
    };
    return {
      captchaSvg:"",//从服务器获取下来的svg结构
      loginForm: {
        UserName: "",
        Pass: "",
        captcha:"11111"
      },
      rules: {
        UserName: [{ validator: ruleUserName, trigger: "blur" }],
        Pass: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted () {
    this.set_captcha()
  },
  methods: {
    //封装一个方法用来获取二维码
    set_captcha(){
      getCaptcha()
      .then(res=>{
        // console.log(res);
        this.captchaSvg=res.data.img; 
      })
    },
    ...mapMutations(['SET_USERINFO']),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证验证码正确在发送请求
        //  let verifyRes= await verifyCaptcha(this.loginForm.captcha)
        //  console.log(verifyRes);

        //  if(!verifyRes.data.state){
        //    //验证码不正确
           
        //        this.$message.error("验证码输入错误");
             
        //       return
        //  }
      
          const loading = this.$loading({
            lock: true,
            text: "正在登陆...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // //发送登入请求
    
          login(this.loginForm.UserName, this.loginForm.Pass)
            .then(res => {
            
              loading.close()
              if (res.data&&res.data.state) {
                //用户名和密码正确
                //权限按钮 保存在vuex中
                this.$message.success("登陆成功")
                this.$store.commit("SET_PERMISSION_BUTTONS",res.data.permission.buttons)
                localStorage.setItem("qf2005-token", res.data.token);
                localStorage.setItem("qf2005-permission-buttons",JSON.stringify(res.data.permission.buttons));
                localStorage.setItem("qf2005-userInfo", JSON.stringify(res.data.userInfo));
                //更改vuex中state['userinfo']的值
                this.SET_USERINFO(res.data.userInfo)
                this.$router.push("/Welcome");
                console.log(111);
              } else {
                //用户名和密码错误
              loading.close()
               this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              // console.log(err);
            });
          
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>