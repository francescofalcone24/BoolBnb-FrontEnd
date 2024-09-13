<script>
import store from '../data/store';
import axios from "axios";
export default {

    name: 'NotFound',


    components: {



    },

    data() {
        return {
            store,

        }
    },

    mounted() {




    }


}


</script>


<!-- 404.vue -->
<template>
    <div class="container">
      <h1 class="title">404: Page Not Found</h1>
      <p class="description">Sorry, the page you're looking for doesn't exist.</p>
      <!-- <img src="@/assets/404-image.png" alt="404 Image" class="image"> -->
      <button class="button" @click="$router.push('/')">Return to Home</button>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .description {
    font-size: 18px;
    margin-bottom: 40px;
  }
  
  .image {
    width: 200px;
    height: 200px;
    margin-bottom: 40px;
  }
  
  .button {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .button:hover {
    background-color: #3e8e41;
  }
  </style>