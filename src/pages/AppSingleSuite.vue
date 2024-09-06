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

    <!-- <div class="container text-center p-0" v-if="store.singleSuite">


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

    </div> -->
    <div class="container d-flex py-2 justify-content-between col-12" v-if="store.singleSuite">

        <img v-if="!store.singleSuite.img.startsWith('http')" style="height: 50rem;"
            :src="store.localHostUrl + '/storage/' + store.singleSuite.img" class=" w-50" alt="...">

        <img v-else="" :src="store.singleSuite.img" class=" w-50" alt="..." style="height: 50rem;">
        <div class="d-flex flex-column justify-content-center">
            <h5 class="card-title">{{ store.singleSuite.title }}</h5>
            <p class="card-text">{{ store.singleSuite.address }}</p>
            <router-link :to="{ name: 'suites' }" class="btn btn-outline-danger">back to the list</router-link>

            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-person-shelter col-6"></i>


                        <strong class="col-6">
                            Rooms :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.room }}
                    </span>
                </li>

                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-toilet col-6"></i>


                        <strong class="col-6">
                            Bathrooms :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.bathroom }}
                    </span>
                </li>

                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-bed col-6"></i>


                        <strong class="col-6">
                            Beds :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.bed }}
                    </span>
                </li>

                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-maximize col-6"></i>


                        <strong class="col-6">
                            Square-Meters :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.squareM }}
                    </span>
                </li>

            </ul>

        </div>
    </div>
</template>

<style scoped>
li {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
}

strong {
    font-size: 15px;
    white-space: nowrap;
    margin-right: 2rem;
}

i {
    width: 10px;
}
</style>