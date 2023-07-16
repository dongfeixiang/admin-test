<script setup>
import { ref } from "vue";
import { dynamicRoutes } from "@/router";
import { getPermissions } from "@/api/permission";
import { convertMenu } from "@/utils/menu";

const treeRef = ref(null);
const data = ref([]);
getPermissions().then((res) => {
  data.value = convertMenu(dynamicRoutes, res);
});
const defaultProps = {
  children: "children",
  label: "label",
};

const select = () => {
  const nodes = treeRef.value.getCheckedNodes(true, false);
  console.log(
    nodes.map((node) => {
      return node.label;
    })
  );
};
</script>

<template>
  <el-tree :data="data" :props="defaultProps" show-checkbox ref="treeRef">
    <template #default="{ node, data }">
      <el-row class="tree-node">
        <el-col :span="2">{{ node.label }}</el-col>
      </el-row>
    </template>
  </el-tree>
  <el-button @click="select">选中</el-button>
</template>

<style scoped>
.el-row {
  width: 100%;
}
.permissions span {
  margin-right: 10px;
}
</style>
