<script>
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'

// import store from './data/store.js';
import axios from "axios";
export default {

  name: 'App',


  components: {

    AppHeader,
    AppMain,
    AppFooter

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
  <AppMain />
  <AppFooter />

</template>

<style scoped></style>
