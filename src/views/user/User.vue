<script setup>
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "@/api/user";
import { getRoles } from "@/api/role";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

/**
 * 表格展示
 */
const tableData = ref();
getUsers().then((data) => {
  tableData.value = data;
});
const roles = ref();
getRoles().then((data) => {
  roles.value = data;
});

/**
 * 增加/修改表单
 */
let type = ref(""); // "Add"增加用户，"Edit"编辑用户
const isVisiable = ref(false); // 对话框显示
const formRef = ref(null); // 表单实例引用
// 表单数据
const user = ref({
  id: 0,
  username: "",
  password: "",
  email: "",
  groups: [],
});
// 校验规则
const rules = ref({
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});
// 重置密码事件
const resetPwd = () => {
  user.value.password = "cloudlab123456";
};
// 增加按钮事件
const handleAdd = () => {
  type.value = "Add";
  isVisiable.value = true;
};
// 编辑按钮事件
const handleEdit = (index, row) => {
  type.value = "Edit";
  user.value = { ...row };
  isVisiable.value = true;
};
// 删除按钮事件
const handleDelete = async (index, row) => {
  try {
    await ElMessageBox.confirm(`确定删除用户："${row.username}"?`, "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    });
    await deleteUser(row.id);
    ElMessage({ type: "success", message: "删除成功" });
    // 重新获取数据
    tableData.value = await getUsers();
  } catch (error) {
    console.log(error);
  }
};
// 表单提交事件
const submit = (formRef) => {
  if (!formRef) return;
  formRef.validate(async (valid) => {
    if (valid) {
      if (type.value === "Add") {
        // 调用增加接口
        const user_added = await addUser(user.value);
        // console.log(user_added);
        // 重新获取数据
        tableData.value = await getUsers();
      } else if (type.value === "Edit") {
        // 调用更新接口
        const user_update = await updateUser(user.value.id, user.value);
        // console.log(user_update);
        // 重新获取数据
        tableData.value = await getUsers();
      }
      isVisiable.value = false;
    }
  });
};
// 表单关闭事件
const close = (formRef) => {
  user.value = {};
  formRef.resetFields();
};
</script>

<template>
  <!-- 功能栏 -->
  <el-row class="tab-row">
    <el-tag effect="plain">首页</el-tag>
    <el-tag effect="plain" closable>用户权限</el-tag>
  </el-row>
  <el-row class="tool-row">
    <el-col :span="2">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </el-col>
    <el-col :span="10">
      <el-form :inline="true">
        <el-input placeholder="Search" class="search-input">
          <template #append>
            <el-button icon="Search" />
          </template>
        </el-input>
      </el-form>
    </el-col>
  </el-row>

  <!-- 用户表格 -->
  <el-table :data="tableData">
    <el-table-column prop="id" label="ID" width="50" />
    <el-table-column prop="username" label="账号" width="100" />
    <el-table-column prop="email" label="邮箱" width="200" />
    <el-table-column prop="groups" label="角色">
      <template #default="scope">
        <el-tag class="role-tag" v-for="g in scope.row.groups" :key="g">{{
          g
        }}</el-tag>
        <el-tooltip
          v-if="scope.row.groups.length > 0"
          content="Other"
          placement="bottom"
          effect="light"
        >
          <el-tag>+</el-tag>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 用户表单Dialog -->
  <el-dialog
    v-model="isVisiable"
    :title="type === 'Add' ? '新增用户' : '编辑用户'"
    @close="close(formRef)"
    width="30%"
  >
    <el-form :model="user" :rules="rules" ref="formRef" label-width="60px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          show-password
          v-model="user.password"
          :disabled="type === 'Add' ? false : true"
        >
          <template #append>
            <el-button @click="resetPwd">默认</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item label="角色" prop="groups">
        <el-select v-model="user.groups" multiple>
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit(formRef)">确定</el-button>
        <el-button @click="isVisiable = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.tab-row .el-tag {
  margin-right: 10px;
}
.el-table {
  width: 100%;
  height: 500px;
}
.role-tag {
  margin-right: 5px;
}
.el-input,
.el-select {
  width: 300px;
}
</style>
