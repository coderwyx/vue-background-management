import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("components/common/login/Login");
const Home = () => import("views/home/Home");
const Welcome = () => import("components/content/welcome/Welcome");
const Users = () => import("components/content/users/Users");
const Rights = () => import("components/content/power/rights/Rights");
const Roles = () => import("components/content/power/roles/Roles");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/welcome",  component: Welcome, },
      { path: "/users",  component: Users,},
      { path: "/rights",  component: Rights,},
      { path: "/roles",  component: Roles,},
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  //  获取token
  const tokenStr = window.sessionStorage.getItem("token");
  //  如果没有token 强制跳转到登录页面
  if (!tokenStr) return next("/login");
  next();
});

export default router;
