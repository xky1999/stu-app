import Vue from "vue";

import Vuex from "vuex";

import {getMenuList} from "@/api"
//引入allroutes
import allRoutes from "../router/allRoutes"
//引入递归函数
import recursionRoutes from "../utils/recursionRoutes"
//引入动态路由
import dynamicRoutes from "../router/dynamicRoutes"
import router from "../router"
Vue.use(Vuex);
//刷新页面会丢失用户信息
let userInfo = localStorage.getItem("qf2005-userInfo")  || '{}';
userInfo = JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
  userInfo ,
  menuList:[],
  sideMenu:[],//定义用户侧边栏菜单
    crumbs:[]
  },
  mutations: {
    //更改userinfo
    SET_USERINFO(state,payload){
      state.userInfo = payload;
    },
    SET_MENULIST(state,payload){
      state.menuList = payload
      console.log(state.menuList);
      //动态的将路由添加到routes中  核心方法router.addRoutes()
      //(复合路由配置规则的数据)
      //1.将menulist赋值给dunamicroutes
     let target =  dynamicRoutes.find(item=>item.path==="/")
     target.children = [...payload]
     console.log(target);
    //  console.log(dynamicRoutes);
     //2 dont动态图添加配置到router？routes
     router.addRoutes(dynamicRoutes)
    },
    SET_CRUMBS(state, payload) {
      state.crumbs = payload
  }
  },
  actions: {
    //1.发送请求 获取用户菜单数据
    async FETCH_MENULIST({commit}){
      //2.通过allroutes和请求回来的用户菜单数据对比 将结果提交给mutation
      let userMenu = await getMenuList()
      //  console.log(123);
      //  console.log(userMenu);
      let sideMenu= recursionRoutes(allRoutes,userMenu.data.menuList)
     //将结果给mutation
     commit("SET_MENULIST",sideMenu)
    }
  },
  modules: {}
});
