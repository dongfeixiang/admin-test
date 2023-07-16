import { useTokenStore } from "@/store";
import useRoutesStore from "@/store/routes";
import router from ".";
import { getUserInfo } from "../api/user";

// 前置导航守卫
router.beforeEach(async (to, from) => {
  const tokenStore = useTokenStore();
  if (!tokenStore.token && to.name !== "login") {
    return { name: "login" };
  } else {
    const routesStore = useRoutesStore();
    if (!routesStore.added) {
      // 获取用户权限
      try {
        const response = await getUserInfo();
        routesStore.accessRoutes(response.data.permissions);
        routesStore.routes.forEach((route) => {
          router.addRoute("layout", route);
        });
        return to.fullPath;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
