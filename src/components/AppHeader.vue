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
      <div class="">
        <img src="../assets/img/BoolBnB.png" class="my-navbar p-0 m-0" alt="">
      </div>
      <div class="">
        <ul class="navbar-nav ms-3">
          <li class="nav-item">

            <router-link :to="{ name: 'home' }" class="nav-link text-dark"> Home </router-link>
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
