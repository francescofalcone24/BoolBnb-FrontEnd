<script>
import AppHompage from '../pages/AppHompage.vue'
import store from '../data/store';
import axios from "axios";
import { RouterView } from 'vue-router';
export default {

    name: 'AppMain',


    components: {

        AppHompage

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

    <router-view></router-view>

</template>

<style scoped></style>