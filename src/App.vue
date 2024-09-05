<script>
import AppHeader from './components/AppHeader.vue'
// import AppMain from './components/AppMain.vue'
// import AppFooter from './components/AppFooter.vue'
// import AppHompage from './pages/AppHompage.vue';

// import store from './data/store.js';
import axios from "axios";
export default {

  name: 'App',


  components: {

    AppHeader,
    // AppMain,
    // AppFooter,
    // AppHompage

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
  <AppHeader />
  <!-- <AppMain />
  <AppFooter />
  <AppHompage/> -->
  <router-view></router-view>

</template>

<style scoped></style>
