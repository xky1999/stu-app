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
//获取验证码
export const getCaptcha = () =>axios.get("/users/getCaptcha")
//刷新验证码
export const refreshCaptcha = () =>axios.get("/users/refreshCaptcha")
//校验验证码
export const verifyCaptcha = (captcha) =>axios.get(`/users/verifyCaptcha?captcha=${captcha}`)

//获取学员信息
export const getStuList = (params={}) =>axios({
    params,
    url:'/students/getstulist'
})
//增加学员信息
export const addStuDetail = (stuDetail)=> axios({
    url:'/students/addstu',
    method: 'post',
    data:stuDetail,
   
})

//删除学员信息
export const delStu = sId =>axios.get(`/students/delstu?sId=${sId}`)
// 编辑学宣信息
export const updateStu = (updated={})=> axios({
    url:'/students/updatestu',
    method: 'post',
    data:updated,
   
})
//搜索学员信息  /students/searchstu
export const searchStu = (key) =>axios.get(`/students/searchstu?key=${key}`)
//获取班级
export const getClasses = () =>axios.get('/students/getclasses')
