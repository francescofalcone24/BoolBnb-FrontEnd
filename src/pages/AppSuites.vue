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
            <div v-for="suite in store.suite" class="col-3">
                <div class="card">
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

<style scoped></style>