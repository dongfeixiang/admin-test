import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    name: "login",
  },
  {
    path: "/",
    component: () => import("@/views/Layout.vue"),
    name: "layout",
    redirect: {name: 'home'},
    children: [
      {
        path: "home",
        component: () => import("@/views/Home.vue"),
        name: "home",
      },
      {
        path: "/user",
        children: [
          {
            path: "",
            component: () => import("@/views/user/User.vue"),
            name: "user",
          },
          {
            path: "role",
            component: () => import("@/views/user/Role.vue"),
            name: "role",
          },
          {
            path: "menu",
            component: () => import("@/views/user/Menu.vue"),
            name: "menu",
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from)=>{
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && to.name!=='login'){
    return {name: 'login'}
  }
})

export default router;
