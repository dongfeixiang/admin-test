import { createRouter, createWebHistory } from "vue-router";

// 静态路由
const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout.vue"),
    redirect: { name: "home" },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: {
          label: "首页",
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/404.vue"),
  },
];

// 动态路由
const dynamicRoutes = [
  {
    path: "/auth",
    meta: {
      label: "用户权限",
      icon: "Lock",
    },
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("@/views/user/User.vue"),
        meta: {
          label: "用户管理",
          icon: "UserFilled",
          model: "user",
          permission: "view_user",
        },
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/user/Role.vue"),
        meta: {
          label: "角色管理",
          icon: "User",
          model: "group",
          permission: "view_group",
        },
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("@/views/user/Menu.vue"),
        meta: {
          label: "权限管理",
          icon: "Menu",
          model: "permission",
          permission: "view_permisson",
        },
      },
    ],
  },
  {
    path: "/sample",
    meta: {
      label: "样品管理",
      icon: "Star",
    },
    children: [
      {
        path: "plasmid",
        name: "plasmid",
        meta: {
          label: "质粒库",
          icon: "Star",
        },
      },
      {
        path: "protein",
        name: "protein",
        meta: {
          label: "蛋白库",
          icon: "Star",
        },
      },
      {
        path: "cell",
        name: "cell",
        meta: {
          label: "细胞库",
          icon: "Star",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export { constantRoutes, dynamicRoutes };
export default router;
