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
let permissionButtons = JSON.parse(localStorage.getItem("qf2005-permission-buttons") ) || {};
userInfo = JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
      userInfo ,
      menuList:[],
      sideMenu:[],//定义用户侧边栏菜单
      permissionButtons,
      crumbs:[],
      dialogVisible:false,//控制dialog弹出康显示隐藏
      //dialog 数据源
      stuForm: {
        name: '',
        productUrl: '',
        headimgurl: '',
        class: '',
        age: '',
        city: '',
        degree: '',
        description: ''
      }
  },
  mutations: {
    //更改userinfo
    SET_USERINFO(state,payload){
      state.userInfo = payload;
    },
    SET_PERMISSION_BUTTONS(state,payload){
      state.permissionButtons = payload
    },
    //菜单列表
    SET_MENULIST(state,payload){
      state.menuList = payload
  
      //动态的将路由添加到routes中  核心方法router.addRoutes()
      //(复合路由配置规则的数据)
      //1.将menulist赋值给dunamicroutes
     let target =  dynamicRoutes.find(item=>item.path==="/")
     target.children = [...payload]
 
     //2 dont动态图添加配置到router？routes
     router.addRoutes(dynamicRoutes)
    },
    //面包屑
    SET_CRUMBS(state, payload) {
      state.crumbs = payload
    },
    //T添加信息框是否显示或隐藏
    CHANGE_DIALOG_VISIBLE(state){
      state.dialogVisible = !state.dialogVisible
    },
    SET_STUFORM(state, payload){
      state.stuForm = payload

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
