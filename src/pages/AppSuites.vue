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
            filtered: [],
            range:20,
            results: 0,
            room: 0,
            bed: 0,
            search_input: null,
            lat_rom: 0,
            lon_rom: 0,
            aka:[],
            result_suggest: [],
            searchBar: [],
            pokemon: null,
        }
    },
    methods :{
        getInputSearch(value) {
            this.search_input = value.target.value
            this.autocomplete(this.search_input)
        },
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
                this.store.suite = response.data.results;
                this.filtered = this.store.suite;
                this.filter()
            }).catch(function (error) {
                console.log(error);
            });       
        },

        getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2, unit = 'kilometers') {
            let theta = longitude1 - longitude2;
            let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(
                Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
                Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180))
            );
            if (unit == 'miles') {
                return Math.round(distance, 2);
                
            } else if (unit == 'kilometers') {
                return Math.round(distance * 1.609344, 2);
                
            }
        },

        filter(){ 
            this.filtered = [];
            for (let index = 0; index < this.store.suite.length; index++) {
                
                let filter_coordinate = this.getDistanceBetweenPoints(this.store.country_range.lat, this.store.country_range.lng, this.store.suite[index].latitude, this.store.suite[index].longitude);
                
                if (filter_coordinate <= this.range) {
                    if ((this.store.suite[index].room >= this.room) && (this.store.suite[index].bed >= this.bed )) {
                        this.filtered.push(this.store.suite[index])
                    }
                }
            }
        },
        autocomplete(value) {

            const base_url = "https://api.tomtom.com/search/2/geocode/"
            this.aka = []

            let mid_url = value.replace(/ /g, '%20');
            const apiKey = `.json?key=jmRHcyl09MwwWAWkpuc1wvI3C3miUjkN&limit=5&countrySet={IT}`

            delete axios.defaults.headers.common['X-Requested-With'];

            axios.get(base_url + mid_url + apiKey).then(response => {
                this.result_suggest = response.data.results;
                this.lat_rom = this.result_suggest[0].position.lat
                this.lon_rom = this.result_suggest[0].position.lon
                for (let index = 0; index < this.result_suggest.length; index++) { 
                    this.aka[index] = this.result_suggest[index].address.freeformAddress
                }
            });
        },
        getSuite() {
            this.store.country_range.lat = this.result_suggest[0].position.lat
            this.store.country_range.lng = this.result_suggest[0].position.lon
            
            console.log(this.store.country_range , 'coordinate')
        },
        getChoose(x) {
            this.pokemon = this.aka[x]
            console.log(this.searchBar, 'cliccato')
            this.aka = []
        },

    },
    
    mounted() {
        console.log(this.store);
        this.getApi();        
    }


}


</script>


<template>

    <div class="container">
        <button class="btn btn-primary my-filters-btn" type="button" data-bs-toggle="offcanvas"data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
            Filters
        </button>
        <!-- ***************************************OFFCANVAS****************************************************** -->

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Search filters:</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column flex-wrap align-content-start">
                <div class="offcanvas-item mx-5">
                    <label for="customRange1" class="form-label" >Km radius {{ this.range }} </label>
                    <input @input="filter()" type="range" min="0" max="20" v-model=range class="form-range" id="customRange1">
                </div>
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
        
       
         <!-- ***************************************OFFCANVAS****************************************************** -->
        
        
         <!-- ***************************************SUITE CARDS****************************************************** -->
      
        <div class="row col-12 col-sm-6 col-md-4 col-xl-3 w-100">
            <h2>Results: {{ filtered.length }}</h2>



            <form class="d-flex justify-content-center" role="search">
                        <div class="col-8 me-3">
                            <input class="searchbar w-100" type="search" placeholder="Search" aria-label="Search"
                                v-model="pokemon" @input="getInputSearch" name="search_bar" required>
                            <ul id="result" class="list-group position-absolute">
                                <li class="list-group-item" v-for="item, index in this.aka"
                                    @click="this.getChoose(index)">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <!-- <router-link :to="{ name: 'suites' }" class="nav-link text-light"> -->
                                <button  class="btn btn-success search-btn me-3" type="button" @click="getSuite">
                                    Search     
                                </button>
                            <!-- </router-link> -->
                        </div>
            </form>




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
right: 6rem;
z-index: 1;
}
#result{
    z-index: 1;
}

</style>