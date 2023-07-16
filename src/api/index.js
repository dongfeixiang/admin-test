import { ElMessage } from "element-plus";
import http from "@/utils/http";
import router from "@/router";
import { useTokenStore } from "../store";

// 登录请求
const login = (data) => {
  http.post("/api/login/", data).then((response) => {
    if (response.message === "authenticate-success") {
      // 登录验证成功
      const token = response.data.token;
      // 保存登录状态
      const tokenStore = useTokenStore();
      tokenStore.setToken(token)
      tokenStore.saveToken()
      // 跳转首页
      router.push({ name: "home" });
    } else {
      ElMessage.error("账号或密码错误");
    }
  });
};

export { login };
