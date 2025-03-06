<template>
  <div class="app">
    <div v-if="authStore.isAuthenticated && (route.path === '/contacts' || route.path === '/analytics')">
      <Sidebar />
    </div>
    <router-view />
  </div>
</template>
<script setup>
import Sidebar from "./components/Sidebar.vue";
import { useAuthStore } from "./stores/auth.js";
import { useRoute } from "vue-router";
const route = useRoute();
console.log("ROUTE PATH: ", route.path);

const authStore = useAuthStore();
</script>
<style lang="scss">
:root {
  --primary: #4ade80;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1200px) {
      padding-left: 6rem;
    }
  }
}
</style>
