<script setup>
import { useCollapseStore } from "@/store";
import useRoutesStore from "@/store/routes";

const routesStore = useRoutesStore();
const menus = routesStore.routes;

const collapseStore = useCollapseStore();
</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    default-active="/"
    :collapse="collapseStore.isCollapse"
    :unique-opened="true"
  >
    <h3>Logo</h3>
    <template v-for="menu in menus" :key="menu.path">
      <!-- 没有子菜单 -->
      <el-menu-item v-if="!menu.children" :index="menu.path" :route="menu">
        <el-icon><component :is="menu.meta.icon"></component></el-icon>
        <span>{{ menu.meta.label }}</span>
      </el-menu-item>
      <!-- 有子菜单 -->
      <el-sub-menu v-else :index="menu.path">
        <template #title>
          <el-icon><component :is="menu.meta.icon"></component></el-icon>
          <span>{{ menu.meta.label }}</span>
        </template>
        <el-menu-item
          v-for="submenu in menu.children"
          :index="submenu.path"
          :route="submenu"
        >
          <el-icon><component :is="submenu.meta.icon"></component></el-icon>
          <span> {{ submenu.meta.label }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu {
  height: 100%;
  border: none;
}
/* 菜单展开样式 */
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu h3 {
  color: #fff;
  text-align: center;
  font-weight: 700;
  line-height: 70px;
}
</style>
