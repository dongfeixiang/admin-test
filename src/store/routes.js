import { defineStore } from "pinia";
import { ref } from "vue";
import { constantRoutes, dynamicRoutes } from "@/router";
import { filterRoutes } from "@/utils/route";

const useRoutesStore = defineStore("routes", () => {
  const routes = ref(constantRoutes[1].children);
  const added = ref(false);
  // 根据权限动态获取路由
  function accessRoutes(permissions) {
    routes.value = routes.value.concat(
      filterRoutes(permissions, dynamicRoutes)
    );
    added.value = true;
  }

  return { routes, added, accessRoutes };
});

export default useRoutesStore;
