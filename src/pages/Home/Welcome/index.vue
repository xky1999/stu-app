<template>
  <div class="welcome">
    <el-table :data="welcomeData" stripe style="width: 100%">
      <el-table-column prop="username" label="登录账户" width="180">
      </el-table-column>

      <el-table-column prop="lastLogin.ip" label="上次登录IP" width="180">
      </el-table-column>

      <el-table-column prop="lastLogin.loginTime" label="上次登录时间">
      </el-table-column>
      <el-table-column prop="nowLogin.ip" label="本次登录IP"> </el-table-column>
      <el-table-column prop="nowLogin.loginTime" label="本次登录时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLoginLog } from "@/api";
export default {
  data() {
    return {
      welcomeData: [],
      
    };
  },
  mounted() {
    getLoginLog().then(res=>{
      if(res.data&&res.data.state){
        // console.log(res.data.data);
        this.welcomeData = res.data.data
      }
    })
  }
};
</script>