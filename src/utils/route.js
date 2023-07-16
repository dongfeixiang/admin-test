// 判断是否拥有路由权限
const hasPermission = (permissions, route) => {
  if (route.meta && route.meta.permission) {
    return true
    return permissions.includes(route.meta.permission);
  } else {
    return true;
  }
};

// 根据权限过滤动态路由
const filterRoutes = (permissions, routeList) => {
  return routeList.filter((route) => {
    if (hasPermission(permissions, route)) {
      if (route.children) {
        route.children = filterRoutes(permissions, route.children);
        return route.children.length > 0;
      } else {
        return true;
      }
    } else {
      return false;
    }
  });
};

export { hasPermission, filterRoutes };
