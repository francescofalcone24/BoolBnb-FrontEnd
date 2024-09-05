<script>
import store from '../data/store';
import axios from "axios";
export default {

    name: 'AppSuites',


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

    <div class="container">
        <div class="row">
            <div v-for="suite in store.suite" class="col-12 col-sm-6 col-md-4 col-xl-3">
                <div class="card my-3">
                    <img v-if="!suite.img.startsWith('http')" :src="store.localHostUrl + '/storage/' + suite.img"
                        class="card-img-top" alt="...">

                    <img v-else="" :src="suite.img" class="card-img-top" alt="...">
                    <h3>{{ suite.title }}</h3>
                </div>
                <div>
                    <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                        class="btn btn-outline-primary mt-auto">more
                        details</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
* {
    background-color: #222;
    color: gray;
}
</style>