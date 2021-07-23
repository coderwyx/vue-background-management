import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = ()=> import('components/Login')
const Home = ()=> import('views/home/Home')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
 if(to.path==='/login') return next();
//  获取token
 const tokenStr = window.sessionStorage.getItem('token');
//  如果没有token 强制跳转到登录页面
 if(!tokenStr) return next('/login')
 next()
})

export default router
