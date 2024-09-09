<script>
import store from '../data/store.js';
import axios from "axios";

export default {

    name: 'AppHompage',


    components: {



    },

    data() {
        return {
           store,
            suite: [],
            searchBar: [],
            room: 0,
            bed: 0,
            range: 20,
            search_input: null,
            result_suggest: [],
            aka:[],


            base_url: "https://api.tomtom.com/search/2/search/",
            pokemon: null,

            // lat_nap: 0,
            // lon_nap: 0,

            lat_rom: 0,
            lon_rom: 0,
            unita: "kilometers"



        }
    },
    methods: {
        getInputSearch(value) {
            this.search_input = value.target.value
            this.autocomplete(this.search_input)
        },

        getSuite() {
            this.getApi()
            // console.log(this.range, 'questo è il range')
            
            // axios.get('http://localhost:8000/api/suite').then(response => {
            //     // console.log(response, 'questa è la chiamata')
            //     this.store.suite = []
            //     for (let index = 0; index <= response.data.results.data.length - 1; index++) {
            //         // let suite_address = response.data.results.data[index].address

            //         // let country_filter = suite_address.toLowerCase().includes(this.search_input.toLowerCase())
            //         let suite_room = response.data.results.data[index].room
            //         let bed_room = response.data.results.data[index].bed

            //         let lat_input = response.data.results.data[index].latitude
            //         let lng_input = response.data.results.data[index].longitude

            //         let filter_coordinate = this.getDistanceBetweenPoints(lat_input, lng_input, this.lat_rom, this.lon_rom, this.unita)

            //         if (filter_coordinate <= this.range) {
            //             if ((this.room != 0 && this.bed != 0) || (this.room != 0 || this.bed != 0) || (this.room == 0 || this.bed == 0)) {
            //                 if (suite_room >= this.room && bed_room >= this.bed) {
            //                     console.log(response.data.results.data[index])
            //                     this.store.suite.push(response.data.results.data[index])
            //                 }
            //             }
            //         }
            //     }
            // })
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

        //**************************************** */
        autocomplete(value) {

            const base_url = "https://api.tomtom.com/search/2/geocode/"
            this.aka = []
           
            let mid_url = value.replace(/ /g, '%20');
            const apiKey = `.json?key=jmRHcyl09MwwWAWkpuc1wvI3C3miUjkN&limit=5&countrySet={IT}`

            delete axios.defaults.headers.common['X-Requested-With'];

            axios.get(base_url + mid_url + apiKey).then(response => {
                this.result_suggest = response.data.results;
                console.log(this.result_suggest[0].position.lat)
                this.lat_rom = this.result_suggest[0].position.lat

                console.log(this.result_suggest[0].position.lon)
                this.lon_rom = this.result_suggest[0].position.lon
                this.store.country_range = [];
                this.store.country_range.push(this.lat_rom, this.lon_rom)
                for (let index = 0; index < this.result_suggest.length; index++) {
                    
                    console.log(this.result_suggest[index].address.freeformAddress)
                    this.aka[index] = this.result_suggest[index].address.freeformAddress
                    console.log(this.aka, 'questo è l array')
                    // console.log(this.aka , 'questo è l array')

                }
            });
        },
        getChoose(x) {
            this.pokemon = this.aka[x]
            console.log(this.searchBar, 'cliccato')
            this.aka = []
        },

         // da spostare
      
    },



    mounted() {
        // this.getDistanceBetweenPoints(this.lat_nap, this.lon_nap, this.lat_rom, this.lon_rom, this.unita)
        this.getApi()
    }


}

</script>

<template>
    <div class="jumbotron">
        <div class="img-container">
            <div class="d-flex flex-column justify-content-end align-items-center h-100">
                <h1 class="display-5 fw-bold text-light">
                    Welcome to BoolBnB
                </h1>
                <div class="searchbar-container">
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
                            <!-- <button class="btn btn-success search-btn me-3" type="button"
                                @click="getSuite">Search</button> -->
                            <button  class="btn btn-success search-btn me-3" type="button" @click="getSuite">
                            <router-link :to="{ name: 'suites' }" class="nav-link text-light">
                                    Search
                                    </router-link>
                                    
                                    </button>


                                 

                            <button class="btn btn-primary search-btn" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Filters
                            </button>

                            
                        </div>

                       

                        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop"
                            aria-labelledby="offcanvasTopLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasTopLabel">Search filters:</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body d-flex flex-column flex-wrap align-content-start">
                                <div class="offcanvas-item mx-5">
                                    <label for="customRange1" class="form-label">Km radius {{ this.range }}</label>
                                    <input type="range" min="0" max="50" v-model=range class="form-range"
                                        id="customRange1">
                                </div>
                                <div class="offcanvas-item mx-5">
                                    <label for="suite_room" class="form-label">Rooms:</label>
                                    <input type="number" class="form-control" id="suite_room" placeholder="" name="room"
                                        min="1" max="20" v-model=room>
                                </div>
                                <div class="offcanvas-item mx-5">
                                    <label for="suite_bed" class="form-label">Beds:</label>
                                    <input type="number" class="form-control" id="suite_bed" placeholder="" name="bed"
                                        min="1" max="20" v-model=bed>
                                </div>

                                <!-- <div>
                                    <div class="form-check mx-5">
                                        <label for="services">Services:</label>
                                        <div class="d-flex flex-column flex-wrap ">
                                            <div>
                                                <input class="form-check-input offcanvas-item" type="checkbox" value=""
                                                    id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Service 1
                                                </label>
                                            </div>
                                            <div>
                                                <input class="form-check-input offcanvas-item" type="checkbox" value=""
                                                    id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Service 2
                                                </label>
                                            </div>
                                            <div>
                                                <input class="form-check-input offcanvas-item" type="checkbox" value=""
                                                    id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Service 3
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </div> -->
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--************************************* SEZIONE PER LE CARD **********************************************************-->
    <!-- <div class="container">
        <ul v-for="element in aka " class="d-flex">
            <li class="col-4"> -->
                <!-- {{ element.address }} --> 
                <!-- ciao -->
            <!-- </li>
        </ul>
    </div> -->
</template>

<style scoped>
.jumbo-img {
    width: 100%
}

.img-container {
    height: calc(100vh - 10rem);
    width: 100%;
    background-size: 100%;
    background-position-y: center;
    background-repeat: no-repeat;
    background-image: url(../assets/img/lago.jpg);
}

.searchbar-container {
    background-color: rgba(134, 134, 134, 0.815);
    width: 50%;
    border-radius: 80px;
    margin-top: 2rem;
    margin-bottom: 10rem;
    padding: 1rem;
}

.searchbar {
    border-radius: 80px;
    height: 3rem;
    background-color: rgba(240, 248, 255, 0);
    border: white 2px solid;
    /* width: 70%; */
    padding: 1rem;
    outline: none;
    color: white;
}

.searchbar:focus {
    background-color: white;
    transition: 0.5s;
    color: black
}


.searchbar::placeholder {
    color: rgba(255, 255, 255, 0.927);
}

.search-btn {
    height: 3rem;
    border-radius: 20px;
    background-color: rgba(240, 248, 255, 0);
    border: white 2px solid;
}

.search-btn:hover {
    background-color: white;
    color: rgb(0, 89, 255);
}

.offcanvas {
    background-color: #222;
    color: white;
    height: 50vh;
}

.offcanvas-item {
    width: 20%;
    margin-bottom: 1rem;
}
</style>
