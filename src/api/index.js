import axios from './config'

export const login = (username,password)=> axios({
    url:'/users/login',
    method: 'post',
    data:{
        username,
        password
    },
   
})
//huoqu登陆日志
export const getLoginLog = () =>axios.get("/getloginlog")

//获取用户菜单
export const getMenuList = () =>axios.get("/permission/getMenuList")