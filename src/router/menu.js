const menus = [
  {
    path: "/",
    label: "首页",
    icon: "HomeFilled",
  },
  {
    path: "/user",
    label: "用户权限",
    icon: "Lock",
    children: [
      {
        path: "/user",
        label: "用户管理",
        icon: "UserFilled",
      },
      {
        path: "/user/role",
        label: "角色管理",
        icon: "User",
      },
      {
        path: "/user/menu",
        label: "菜单管理",
        icon: "Menu",
      },
    ],
  },
  {
    path: "/sample",
    label: "样品管理",
    icon: "Star",
    children: [
      {
        path: "/plasmid",
        label: "质粒库",
        icon: "Star",
      },
      {
        path: "/protein",
        label: "蛋白库",
        icon: "Star",
      },
      {
        path: "/cell",
        label: "细胞库",
        icon: "Star",
      },
    ],
  },
];

export default menus