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
            filtered: store.suite,
            results: 0,
            room: 0,
            bed: 0,
        }
    },
    methods :{
        getApi() {
            console.log(this.store.country_range, 'coordinate per chiamata')
            delete axios.defaults.headers.common['X-Requested-With'];
            console.log(this.store, 'questo è lo store');
            axios.get('http://localhost:8000/api/suite/search', {
                params: {
                    lat: this.store.country_range.lat,
                    lng: this.store.country_range.lng
                }
            }).then(response => {
                console.log(response.data.results, 'questa è la nuoava api');
                this.store.suite = response.data.results 
            }).catch(function (error) {
                console.log(error);
            });
                
        },
        porcodio(){
            console.log(this.store.suite, 'store dopo api')
            console.log(this.store.country_range, 'loggata coordinate')
            console.log(this.store.suite[0].title)
        },
    
        filter(){
            this.filtered = this.store.suite.filter(suite => (suite.bed >= this.bed) && (suite.room >= this.room) );
            console.log(this.filtered, 'BELLAA');     
        }
    },
    
    mounted() {
        console.log(this.store)
        this.getApi()
        console.log(this.store, 'store ')

    }


}


</script>


<template>

    <div class="container">
        <button class="btn btn-primary search-btn my-filters-btn" type="button" data-bs-toggle="offcanvas"data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
            Filters
        </button>
        <button @click="porcodio">
        </button>
        <!-- ***************************************OFFCANVAS****************************************************** -->

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Search filters:</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column flex-wrap align-content-start">
                <!-- <div class="offcanvas-item mx-5">
                    <label for="customRange1" class="form-label">Km radius </label>
                    <input type="range" min="0" max="50" v-model=range class="form-range" id="customRange1">
                </div> -->
                <div class="offcanvas-item mx-5">
                    <label for="suite_room" class="form-label">Rooms:</label>
                    <input type="number" class="form-control" id="suite_room" placeholder="" name="room" min="0" max="20" v-model=room @input="filter()">
                </div>
                <div class="offcanvas-item mx-5">
                    <label for="suite_bed" class="form-label">Beds:</label>
                    <input type="number" class="form-control" id="suite_bed" placeholder="" name="bed" min="0" max="20" v-model=bed @input="filter()" >
                </div>
            </div>
        </div>
       <div v-for="item in store.suite">
        <h5>
         {{ item.img }}
        </h5>
       </div>
        
       
         <!-- ***************************************OFFCANVAS****************************************************** -->
        
        
         <!-- ***************************************SUITE CARDS****************************************************** -->
        
        <div class="row col-12 col-sm-6 col-md-4 col-xl-3 w-100">
                <h2>Results: {{ store.suite.length }}</h2>
                <div v-for="suite in store.suite" class="col-3 myBorder">
                
                <div class="card my-3 myBorder">
                    <img  :src="store.localHostUrl + '/storage/' + suite.img"
                        class="card-img-top h-100" alt="...">

                    <img  :src="suite.img" class="card-img-top h-100" alt="...">
                    <div class="card-body myBorder text-center">
                        <h5 class="card-title ellipse py-1">{{ suite.title }}</h5>
                        <p class="card-text ellipse">{{ suite.address }}</p>
                        <!-- <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                            class="btn btn-outline-primary mt-auto">more
                            details</router-link> -->
                    </div>
                </div>
            </div>
        </div>
      
<!-- 
        <div class="row col-12 col-sm-6 col-md-4 col-xl-3 w-100">
            <h2>Results: {{ filtered.length }}</h2>
            <div v-for="suite in filtered" class="col-3 myBorder">
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
        </div> -->
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
.offcanvas {
    background-color: rgba(255, 255, 255, 0.621);
    color: white;
    height: 50vh;
}

.offcanvas-item {
    width: 20%;
    margin-bottom: 1rem;
}
.my-filters-btn{
    position: fixed;
    right: 10rem;
}

</style>