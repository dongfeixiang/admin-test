<script setup>
import { reactive, ref } from "vue";

const props = defineProps(["visiable", "type", "user"]);
const emit = defineEmits(["update:visiable", "submit", "cancel"]);
</script>

<template>
  <!-- 用户表单Dialog -->
  <el-dialog
    :model-value="visiable"
    @update:model-value="(newValue) => (visiable = newValue)"
    :title="type === 'Add' ? '新增用户' : '编辑用户'"
  >
    <el-form :model="user">
      <el-form-item label="账号">
        <el-input v-model="user.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password="" v-model="user.password" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="user.groups" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="emit('submit')">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
