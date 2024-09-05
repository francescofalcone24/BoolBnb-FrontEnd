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
        console.log(this.store)
    }


}


</script>


<template>

    <div class="container">
        <div class="row col-12 col-sm-6 col-md-4 col-xl-3 w-100">
            <div v-for="suite in store.suite" class="col-3 myBorder">
                <div class="card my-3 myBorder">
                    <img v-if="!suite.img.startsWith('http')" :src="store.localHostUrl + '/storage/' + suite.img"
                        class="card-img-top h-100" alt="...">

                    <img v-else="" :src="suite.img" class="card-img-top h-100" alt="...">
                    <div class="card-body myBorder text-center">
                        <h5 class="card-title ellipse py-1">{{ suite.title }}</h5>
                        <p class="card-text ellipse">{{ suite.address }}</p>
                        <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                            class="btn btn-outline-primary mt-auto">more
                            details</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.ellipse{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.myBorder{
    border: 0px;
}

</style>