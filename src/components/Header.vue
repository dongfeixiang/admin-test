<script setup>
import { ref } from "vue";
import { useCollapseStore, useTokenStore } from "@/store";
import router from "@/router";
import { getUserInfo } from "@/api/user";

const collapseStore = useCollapseStore();
const userInfo = ref({
  username: "用户",
});
getUserInfo().then((res) => {
  userInfo.value = res.data;
});

const handleCommand = (command) => {
  if (command === "personalInfo") {
    // 个人信息
    console.log(userInfo.value);
  } else if (command === "changePassword") {
    // 修改密码
  } else {
    // 退出
    const tokenStore = useTokenStore();
    tokenStore.clearToken();
    localStorage.removeItem("token");
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
      <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
        <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户权限</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="2">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-avatar>{{ userInfo.username }}</el-avatar>
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
