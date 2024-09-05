<script>
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'
import store from './data/store.js';
import axios from "axios";
export default {

  name: 'App',


  components: {

    AppHeader,
    AppMain,
    AppFooter,

  },

  data() {
    return {
      store,

    }
  },
  methods: {


    getSuite() {
      axios.get('http://localhost:8000/api/suite?page=1').then(response => {

        this.store.suite = response.data.results.data;
        //console.log(this.store.suite);

      })
    },
  },

  mounted() {
    this.getSuite()


  }


}

</script>

<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<style scoped></style>
