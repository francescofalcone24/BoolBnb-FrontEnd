<script>
import store from '../data/store.js';
import axios from "axios";
import { RouterLink } from 'vue-router';

export default {

  name: 'AppHeader',


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

<template>


  <nav class="navbar my-navbar p-0 m-0 align-items-center">
    <div class="d-flex justify-content-between align-items-center container">
      <div class="w-50">
        <img src="../assets/img/BoolBnB.png" class="my-navbar p-0 m-0" alt="">
      </div>
      <div class="w-50">
        <ul class="d-flex justify-content-end align-items-center text-decoration-none">
          <li class="nav-item list-group col-3 text-center list-style-none justify-self-center">
            <router-link :to="{ name: 'home' }" class="nav-link text-dark"> Home </router-link>
          </li>
          <li class="nav-item list-group col-3 text-center list-style-none justify-self-center">
            <a class="text-decoration-none text-dark" href="http://localhost:8000/login">Login</a>
          </li>
        </ul>
      </div>

    </div>
  </nav>





</template>

<style scoped>
.my-navbar {
  height: 5rem;
}
</style>
