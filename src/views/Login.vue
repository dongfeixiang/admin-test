<script setup>
import { ref, reactive } from "vue";
import { login } from "@/api";

const formRef = ref();

// 表单数据
const formData = reactive({
  username: "",
  password: "",
});

// 表单验证规则
const rules = ref({
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

const submit = (formRef) => {
  if(!formRef) return
  formRef.validate((valid) => {
    if (valid) {
      login(formData);
    }
  });
};
</script>

<template>
  <div class="login-container">
    <el-card>
      <div class="title">
        <span>登 录</span>
      </div>
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="formData.username">
            <template #prepend>账号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input show-password v-model="formData.password">
            <template #prepend>密码</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit(formRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.el-card {
  width: 300px;
}
.title {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.title span {
  font-size: 20px;
  font-weight: bold;
  color: rgb(209, 32, 32);
}
.el-button {
  width: 100%;
}
</style>
