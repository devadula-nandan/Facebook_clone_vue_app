<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <input type="file" @change="onFileChange">
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Signup {{ isLoading ? '...' : '' }}</button>
      <p>Already have an account?</p>
      <router-link to="/login">Login</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      avatar: null
    };
  },
  computed: {
    ...mapState('user', ['isLoading', 'error'])

  },
  methods: {
    ...mapActions('user', ['signup']),
    ...mapMutations('user', ['SET_ERROR']),
    onFileChange(event) {
      this.avatar = event.target.files[0];
    },
    async register() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        avatar: this.avatar
      };

      const response = await this.signup(userData);

      if (response.success) {
        this.$router.push('/');
      } else {
        console.error(response.message);
      }
    }
  },
  watch: {
    username() {
      this.SET_ERROR(null); // Reset error when username changes
    },
    email() {
      this.SET_ERROR(null); // Reset error when email changes
    },
    password() {
      this.SET_ERROR(null); // Reset error when password changes
    }
  },
  mounted() {
    this.SET_ERROR(null); // Reset error when component is mounted
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
