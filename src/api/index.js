import { ElMessage } from "element-plus";
import http from "@/utils/http";
import router from "../router";
import { useAuthStore } from "../store";

// 登录请求
const login = (data) => {
  http.post("/api/login/", data).then((response) => {
    if (response.message === "authenticate-success") {
      // 登录验证成功
      // 保存token
      const token = response.data.token;
      localStorage.setItem("token", `Token ${token}`);
      // 保存登录状态
      const authStore = useAuthStore();
      authStore.login();
      // 跳转首页
      router.push({ name: "home" });
    } else {
      ElMessage.error("账号或密码错误");
    }
  });
};

export { login };
