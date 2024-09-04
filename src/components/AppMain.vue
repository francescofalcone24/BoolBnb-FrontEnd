<script>
import AppHompage from '../pages/AppHompage.vue'
// import store from './data/store.js';
import axios from "axios";
// import { RouterView } from 'vue-router';
export default {

    name: 'AppMain',


    components: {

        AppHompage

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

    <AppHompage />

</template>

<style scoped></style>