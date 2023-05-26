<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>
      <button class="back-button" @click="goBack">Go Back</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.back(); // Go back to the previous page without refreshing
      },
    },
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
  }
  
  .back-button {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .back-button:hover {
    background-color: #0056b3;
  }
  </style>
  