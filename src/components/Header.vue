<script setup>
import { useCollapseStore, useAuthStore } from "@/store";
import router from "../router";

const collapseStore = useCollapseStore();
const handleCommand = (command) => {
  if (command === "personalInfo") {
    // 个人信息
  } else if (command === "changePassword") {
    // 修改密码
  } else {
    // 退出
    localStorage.removeItem("token");
    const authStore = useAuthStore();
    authStore.logout();
    router.push({ name: "login" });
  }
};
</script>

<template>
  <el-row>
    <el-col :span="2">
      <el-button size="small" @click="collapseStore.changeCollapse">
        <el-icon>
          <Expand v-if="collapseStore.isCollapse" />
          <Fold v-else />
        </el-icon>
      </el-button>
    </el-col>
    <el-col :span="20">
      <!-- 面包屑 -->
      <span>导航</span>
    </el-col>
    <el-col :span="2">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-avatar icon="UserFilled" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  height: 100%;
  color: #fff;
  background-color: #0d1228;
  align-items: center;
}
.el-col:first-child {
  display: flex;
  justify-content: center;
}
.el-col:last-child {
  display: flex;
  justify-content: center;
}
</style>
