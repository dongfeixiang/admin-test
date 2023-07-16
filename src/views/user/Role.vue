<script setup>
import { getRoles, deleteRole, addRole, updateRole } from "@/api/role";
import { getPermissions } from "@/api/permission";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { convertMenu } from "@/utils/menu";
import { dynamicRoutes } from "@/router";

/**
 * 表格展示
 */
const tableData = ref();
getRoles().then((data) => {
  tableData.value = data;
});
const permissions = ref();
getPermissions().then((data) => {
  permissions.value = data;
});

/**
 * 增加/修改表单
 */
let type = ref(""); // "Add"增加角色，"Edit"编辑角色
const isVisiable = ref(false); // 对话框显示
const formRef = ref(null); // 表单实例引用
// 表单数据
const role = ref({
  name: "",
  permissions: [],
});
// 校验规则
const rules = ref({
  name: [{ required: true, message: "账号不能为空", trigger: "blur" }],
});
// 增加按钮事件
const handleAdd = () => {
  type.value = "Add";
  isVisiable.value = true;
};
// 编辑按钮事件
const handleEdit = (index, row) => {
  type.value = "Edit";
  role.value = { ...row };
  isVisiable.value = true;
};
// 删除按钮事件
const handleDelete = async (index, row) => {
  try {
    await ElMessageBox.confirm(`确定删除角色："${row.name}"?`, "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    });
    await deleteRole(row.id);
    ElMessage({ type: "success", message: "删除成功" });
    // 重新获取数据
    tableData.value = await getRoles();
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
        const nodes = treeRef.value.getCheckedNodes(true, false);
        role.value.permissions = nodes.map((node) => {
          return node.label;
        });
        const role_added = await addRole(role.value);
        // console.log(role_added);
        // 重新获取数据
        tableData.value = await getRoles();
      } else if (type.value === "Edit") {
        // 调用更新接口
        const nodes = treeRef.value.getCheckedNodes(true, false);
        role.value.permissions = nodes.map((node) => {
          return node.label;
        });
        const role_update = await updateRole(role.value.id, role.value);
        // console.log(role_update);
        // 重新获取数据
        tableData.value = await getRoles();
      }
      isVisiable.value = false;
    }
  });
};
// 表单关闭事件
const close = (formRef) => {
  role.value = {};
  treeRef.value.setCheckedKeys([], false);
  formRef.resetFields();
};

// 权限树数据
const treeRef = ref(null);
const perms = ref([]);
getPermissions().then((res) => {
  perms.value = convertMenu(dynamicRoutes, res);
});
const defaultProps = {
  label: "label",
  children: "children",
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

  <!-- 角色表格 -->
  <el-table :data="tableData">
    <el-table-column prop="id" label="ID" width="50" />
    <el-table-column prop="name" label="角色" width="100" />
    <el-table-column prop="permission" label="权限">
      <template #default="scope">
        <el-tag
          class="permission-tag"
          v-for="g in scope.row.permissions"
          :key="g"
          >{{ g }}</el-tag
        >
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

  <!-- 角色表单Dialog -->
  <el-dialog
    v-model="isVisiable"
    :title="type === 'Add' ? '新增角色' : '编辑角色'"
    @close="close(formRef)"
    width="30%"
  >
    <el-form :model="role" :rules="rules" ref="formRef" label-width="60px">
      <el-form-item label="角色" prop="name">
        <el-input v-model="role.name" />
      </el-form-item>
      <el-form-item label="权限" prop="permissions">
        <el-tree
          ref="treeRef"
          :data="perms"
          :props="defaultProps"
          node-key="id"
          :default-checked-keys="role.permissions"
          accordion
          show-checkbox
        />
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
.permission-tag {
  margin-right: 5px;
}
.el-input,
.el-select {
  width: 300px;
}
</style>
