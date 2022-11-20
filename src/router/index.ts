import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"


const asyncRouter: RouteRecordRaw[] = [{
  path: "/home",
  name: "home",
  meta: { title:"控制台", icon:"dashboard"},
  component: () => import("@/views/home/index.vue"),
},
{
  path: "/user",
  name: "user",
  meta: { title:"用户管理", icon:"manage_accounts"},
  component: () => import("@/views/user/index.vue"),
},
{
  path: "/role",
  name: "role",
  meta: { title:"角色管理", icon:"settings_suggest"},
  component: () => import("@/views/role/index.vue"),
}]


const commonRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    redirect: "/home",
    meta: {},
    component: () => import("@/views/layout/index.vue"),
    children: asyncRouter
  },
  {
    path: "/login",
    name: "login",
    meta: {},
    component: () => import("@/views/login/index.vue"),
  },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import("@/views/404.vue") },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: commonRoutes,
})

export {
  asyncRouter
}
export default router