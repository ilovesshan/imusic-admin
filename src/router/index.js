import { createRouter, createWebHistory } from "vue-router"

const routes = [
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
  history: createWebHistory(),
  routes,
})

export default router