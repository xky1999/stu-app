<template>
  <div class="home">
    <el-container>
      <el-aside>
        <!-- 导航菜单栏  左边 -->

        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
          :collapse="isCollapse"
        >
          <h1 class="logo">logo</h1>
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部  顶部布局 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-radio-group
                  v-model="isCollapse"
                  style="margin-bottom: 20px;"
                >
                  <span
                    class="iconfont icon-zhankai"
                    @click="isCollapse = !isCollapse"
                  ></span>
                  <!-- <el-radio-button :label="false">展开</el-radio-button>
                  <el-radio-button :label="true">收起</el-radio-button> -->
                </el-radio-group>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                千锋管理系统
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-avatar :size="50" src="">
                  <img src="./../../assets/imgs/touxiang.png" alt="" />
                </el-avatar>
                <span>欢迎您：</span>
                <b class="nickname">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出</span>
              </div></el-col
            >
          </el-row>
        </el-header>
        <!-- 主体部分 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:crumb.path}" v-for="crumb in crumbs">{{crumb.meta.name}}</el-breadcrumb-item>
             
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<style>
.icon-zhankai {
  font-size: 24px !important;
  cursor: pointer;
  line-height: 26px;
}
.el-radio-group {
  margin-bottom: 0;
  text-align: center;
  float: left;
  margin-top: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px !important;
  min-height: 400px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 60px;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(76, 103, 255), rgb(86, 53, 223))
    rgb(65, 184, 131);
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width: auto !important;
  /* height: 100%; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 左边部分 导航 */
.el-aside {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.el-menu--collapse {
  width: 64px;
  height: 100%;
  font-size: 16px;
}

.el-submenu__title,
.el-menu-item {
  font-size: 18px !important;
  text-align: left;
}

/* .el-submenu .el-menu-item */
.el-menu-item-group__title {
  font-size: 16px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
  width: 300px;
}
.logo {
  width: 100%;
  height: 60px;
  color: white;
  background: url(./../../assets/imgs/logo.be8bbddf.png) 50% center / 80%
    no-repeat;
  background-color: rgb(76, 103, 255);
}
.el .el-menu-vertical-demo {
  flex: 1;
}
.el-radio-group + .el-menu--collapse {
  width: 64px;
}
/* 左边部分结束 */

/* 头部               */
.el-avatar--circle {
  vertical-align: middle;
  margin-right: 10px;
}
.el-avatar--square {
  /* 头像居中 */
  vertical-align: middle;
}

.quit {
  cursor: pointer;
  color: pink;
  margin-left: 10px;
}
.el-row {
  /* margin-bottom: 20px; */
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  /* background: #99a9bf; */
}
.bg-purple {
  /* background: #d3dce6; */
}
.bg-purple-light {
  /* background: #e5e9f2; */
}
.el-radio-group {
  background-color: none;
  box-sizing: border-box;
  padding: 10px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  box-sizing: border-box;
  height: 60px;

  line-height: 60px;
  /* padding: 10px 0; */
  height: 60px;
  background-color: linear-gradient(135deg, rgb(76, 103, 255), rgb(86, 53, 223))
    rgb(65, 184, 131);
}
/* 头部结束 */
</style>


<script>
import { getLoginLog } from "@/api/index.js";
import { mapState } from "vuex";
export default {
  // name:"home",
  computed: {
    ...mapState(["userInfo", "menuList","crumbs"])
  },
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    getLoginLog().then(res => {
      // console.log(res)
    });
  },
  methods: {
    quit() {
      // 退出登录
      // 清除token和userinfo
      // 跳转登录页
      localStorage.removeItem("qf2005-userInfo");
      localStorage.removeItem("qf2005-token");
      this.$router.push("/login");
      //刷新页面
      window.location.reload();
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>