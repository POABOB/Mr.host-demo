import { createRouter, createWebHashHistory } from "vue-router"

export const constRoutes = [
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    meta: { title: "404" },
    hidden: true
  },

  {
    path: "/",
    component: () => import("@/views/index")
  },

  { path: "/:pathMatch(.*)*", redirect: "/404", hidden: true }
]

const router = createRouter({
  routes: constRoutes,
  history: createWebHashHistory()
})

export default router
