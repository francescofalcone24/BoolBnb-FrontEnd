<script>
import store from '../data/store';
import axios from "axios";
import { RouterLink, RouterView } from 'vue-router';

export default {

    name: 'AppHeader',


    components: {



    },

    data() {
        return {
            // store,

        }
    },

    mounted() {

    }


}


</script>

<template>


<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
        </li>
        <li class="nav-item">
          <!-- <a class="nav-link" href="#">Link</a> -->
          <RouterLink to="/suites" class="nav-link">Suites</RouterLink>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dev Team
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Antonio Dattolo</a></li>
            <li><a class="dropdown-item" href="#">Francesco Falcone</a></li>
            <!-- <li><hr class="dropdown-divider"></li> -->
            <li><a class="dropdown-item" href="#">Luca Mariselli</a></li>
            <li><a class="dropdown-item" href="#">Davide Di Giacomo</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>





</template>

<style scoped></style>
