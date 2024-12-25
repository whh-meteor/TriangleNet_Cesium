import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
const whiteList = ['/login']

let routes = [
  {
    path: '/',
    // name: "HomePage",
    // redirect: '/basin',
    component: () => import('@/views/home'),
  },
  {
    path: '/welcome',
    // name: "HomePage",
    // redirect: '/basin',
    component: () => import('@/views/home/welcome'),
  }
  // {
  //   path: '/login',
  //   // redirect: "/map",
  //   name: 'Login',
  //   component: () => import('@/views/login')
  // },
]
const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next)=>{
  
//   if(!whiteList.includes(to.fullPath)&&!store.state?.userInfo?.token ){
//       // next('/login')
//       next()
//   }else{
//     next();
//   }

// })

export default router
