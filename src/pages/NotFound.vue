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


<template>

    <div class="container text-center">
        <h1>404 NOT FOUND</h1>
    </div>
</template>

<style scoped>
* {
    background-color: #222;
    color: red;
}
</style>