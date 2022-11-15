import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    redirect: "/login",
    meta: {},
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {},
        component: () => import("@/views/home/index.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {},
    component: () => import("@/views/login/index.vue"),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/views/404.vue") },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router