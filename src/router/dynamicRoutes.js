
// import Home from 
const dynamicRoutes = [
    {
        path: "/",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "../pages/Home"),
        children:[]
      },{ 
        path: '*',
         component: () =>
         import(/* webpackChunkName: "Page404" */ "../pages/Page404"), 
        },
] 

export default dynamicRoutes