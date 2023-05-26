<template>
  <div class="layout">
    <Navbar />
    <div class="content">
      <!-- Place your main content here -->
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'LayoutWrapper',
  components: {
    Navbar
  }
};
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
