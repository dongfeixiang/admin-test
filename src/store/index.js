import { ref } from "vue";
import { defineStore } from "pinia";

const useCollapseStore = defineStore("collapse", () => {
  const isCollapse = ref(false);
  function changeCollapse() {
    isCollapse.value = !isCollapse.value;
  }

  return { isCollapse, changeCollapse };
});

const useAuthStore = defineStore("authenticate", () => {
  const isAuthenticated = ref(false);
  if (localStorage.getItem('token')){
    isAuthenticated.value = true
  }
  function login() {
    isAuthenticated.value = true;
  }
  function logout() {
    isAuthenticated.value = false;
  }

  return { isAuthenticated, login, logout };
});

export { useCollapseStore, useAuthStore };
