<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="isLoading">Login {{ isLoading ? '...' : '' }}</button>
      <p>Don't have an account?</p>
      <router-link to="/signup">Signup</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapState('user', ['isLoading', 'error']),
  },
  methods: {
    ...mapActions('user', ['login']),
    ...mapMutations('user', ['SET_ERROR']),
    async handleLogin() {
      const credentials = {
        email: this.email,
        password: this.password
      };

      const response = await this.login(credentials);

      if (response.success) {
        this.$router.push('/');
      } else {
        this.SET_ERROR(response.message);
        console.error(response.message);
      }
    }
  },
  watch: {
    email() {
      this.SET_ERROR(null); // Reset error when email changes
    },
    password() {
      this.SET_ERROR(null); // Reset error when password changes
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
