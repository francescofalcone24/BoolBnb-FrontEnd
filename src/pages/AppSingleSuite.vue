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

        //console.log(this.$route.params.slug);

        axios
            .get(`http://127.0.0.1:8000/api/suite/${this.$route.params.slug}`)
            .then(response => {
                console.log(response.data.suite);


                if (response.data.status) {
                    store.singleSuite = response.data.suite;
                    console.log('questo è ', store.singleSuite);
                } else {
                    this.$router.push({ name: 'not-found' })
                }


            })
    }


}


</script>


<template>

    <div class="container text-center p-0" v-if="store.singleSuite">


        <div class="card mb-3 p-5">

            <img v-if="!store.singleSuite.img.startsWith('http')" style="height: 50rem;"
                :src="store.localHostUrl + '/storage/' + store.singleSuite.img" class="card-img-top" alt="...">

            <img v-else="" :src="store.singleSuite.img" class="card-img-top" alt="..." style="height: 50rem;">


            <div class=" card-body">

                <h5 class="card-title">{{ store.singleSuite.title }}</h5>
                <p class="card-text">{{ store.singleSuite.address }}</p>
                <router-link :to="{ name: 'suites' }" class="btn btn-outline-danger">
                    back to the list</router-link>

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