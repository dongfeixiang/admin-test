<script setup>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-aside {
  width: auto;
  height: 100vh;
}
.el-header {
  height: 70px;
  padding: 0;
}
</style>
