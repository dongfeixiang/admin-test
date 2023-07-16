import { ref } from "vue";
import { defineStore } from "pinia";

const useCollapseStore = defineStore("collapse", () => {
  const isCollapse = ref(false);
  function changeCollapse() {
    isCollapse.value = !isCollapse.value;
  }

  return { isCollapse, changeCollapse };
});

const useTokenStore = defineStore("token", () => {
  const token = ref(localStorage.getItem("token"));
  function setToken(value) {
    token.value = value;
  }
  function clearToken() {
    token.value = "";
  }
  function saveToken() {
    localStorage.setItem("token", token.value);
  }

  return { token, setToken, clearToken, saveToken };
});

export { useCollapseStore, useTokenStore };
