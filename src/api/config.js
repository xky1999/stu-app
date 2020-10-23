import axios from "axios";
import router from "../router"
import ElementUI from "element-ui";
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"
// console.log(axios.defaults.baseURL)
axios.defaults.withCredentials = true;//允许请求携带认证

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    if(config.url == "/users/login"){
        return config
    }else{
        let token = localStorage.getItem('qf2005-token')
        config.headers['Authorization'] = token
        return config

    }
  })
//响应拦截
axios.interceptors.response.use(config=>{
   let {data} = config;
//    console.log(ElementUI);
   if(data.code =='1004'||data.code =='10022'){
    //    console.log(ElementUI);
        ElementUI.Message.error("登录信息失效，请重新登录")
        localStorage.removeItem("qf2005-token")
       //登录状态失效  1004  在当前的后台api中1004代表token效验失败
        router.push('/login')
   }
    return config
}) 


axios.create({
    timeout: 4000
})

export default axios