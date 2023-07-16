const convertMenu = (routeList, permissions) => {
  return routeList.map((route) => {
    let menuItem = {
      id: route.meta.label,
      label: route.meta.label,
      children: [],
    };
    if (route.children && route.children.length) {
      menuItem.children = convertMenu(route.children, permissions);
    } else {
      permissions.forEach((p) => {
        if (p.content_type === route.meta.model) {
          menuItem.children.push({ id: p.codename, label: p.codename });
        }
      });
    }
    return menuItem;
  });
};

export { convertMenu };
