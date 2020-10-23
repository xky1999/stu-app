import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import  "@/assets/styles/base.css"
import  "@/assets/styles/el-reset.css"


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入iconfont
import './assets/iconfont/iconfont.css'
// Vue.config.productionTip = false;
import "./utils/recursionRoutes"

import qfSubMenu from "qf-sub-menu" //引入我们的组件
//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(qfSubMenu)


//路由前置钩子（导航守卫）
router.beforeEach((to,from,next)=>{
  NProgress.start()
  let token = localStorage.getItem('qf2005-token')||null
    
  if(token){
    //如果是注册户或者登录页面直接放行
    if(store.state.menuList.length == 0 ){
      //说明没有用户路由 触发action获取用户路由
      store.dispatch("FETCH_MENULIST")
      .then(()=>{
        next({path:to.path})//为了确保addRoutes生效了
      })
    }else{
      next()
    }

  }else{
    //没有token
    if(to.path==='/login'){
      next()
    }else{
      next({path:'/login'})
    }
  }
})


//LUYOU后置钩子处理面包屑
router.afterEach((to, from) => {
  NProgress.done()
  let crumblist = to.matched.slice(1)
  store.commit('SET_CRUMBS', crumblist)
}) 
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
