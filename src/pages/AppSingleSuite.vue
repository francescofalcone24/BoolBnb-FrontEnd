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

    <div class="container" v-if="store.singleSuite">
        <div class="row">
            <div class="col-3">
                <div class="card">
                    <h3>{{ store.singleSuite['title'] }}</h3>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>