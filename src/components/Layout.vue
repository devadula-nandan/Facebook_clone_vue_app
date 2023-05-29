<template>
  <Navbar />
  <router-view />
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